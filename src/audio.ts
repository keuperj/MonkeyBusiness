import originalManifest from './audio-manifest.json';
import act2Manifest from './act2-audio-manifest.json';
const manifest={speech:{...originalManifest.speech,...act2Manifest.speech},effects:{...originalManifest.effects,...act2Manifest.effects}};

type Line = { who: string; text: string };
const speechFiles: Record<string, string> = manifest.speech;
type Effect = string;
const url = (file: string) => `${import.meta.env.BASE_URL}audio/${file}`;

/** Static audio only: API credentials and generation code never enter the browser. */
class TavernAudio {
  enabled = false;
  private ambience = new Audio(url(manifest.effects['tavern-ambience']));
  private steps = new Audio(url(manifest.effects.footsteps));
  private effect: HTMLAudioElement | null = null;
  private voice: HTMLAudioElement | null = null;
  private generation = 0;
  private finishLine?: () => void;
  private walking = false;
  private report = () => document.dispatchEvent(new CustomEvent('audio-unavailable'));

  constructor() {
    this.ambience.loop = this.steps.loop = true;
    this.ambience.preload = this.steps.preload = 'none';
    this.ambience.volume = .28;
    this.steps.volume = .22;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.pauseAll();
      else if (this.enabled) this.resumeBeds();
    });
    window.addEventListener('pagehide', () => this.pauseAll());
  }
  private play(audio: HTMLAudioElement) {
    void audio.play().catch(() => this.report());
  }
  private resumeBeds() {
    if (!this.enabled || document.hidden) return;
    this.play(this.ambience);
    if (this.walking) this.play(this.steps);
  }
  setAmbience(name: Effect) {
    this.ambience.pause();
    this.ambience.src = url((manifest.effects as Record<string,string>)[name]||originalManifest.effects['bridge-ambience']);
    this.resumeBeds();
  }
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) this.resumeBeds();
    else this.pauseAll();
  }
  private pauseAll() {
    this.ambience.pause();
    this.steps.pause();
    this.effect?.pause();
    this.stopSpeech();
  }
  stopSpeech() {
    this.generation++;
    this.voice?.pause();
    this.finishLine?.();
    this.finishLine = undefined;
    this.voice = null;
    this.ambience.volume = .28;
  }
  walk(active: boolean) {
    this.walking = active;
    if (active && this.enabled && !document.hidden) this.play(this.steps);
    else { this.steps.pause(); this.steps.currentTime = 0; }
  }
  effectSound(name: Effect) {
    if (!this.enabled || document.hidden) return;
    this.effect?.pause();
    this.effect = new Audio(url((manifest.effects as Record<string,string>)[name]||originalManifest.effects['bridge-ambience']));
    this.effect.volume = .42;
    this.play(this.effect);
  }
  speak(text: string, who = 'NELL') { void this.sequence([{text, who}]); }
  async sequence(lines: Line[], onLine?: (line: Line) => void) {
    this.stopSpeech();
    if (!this.enabled || document.hidden) return;
    const generation = this.generation;
    this.ambience.volume = .09;
    for (const {who, text} of lines) {
      if (generation !== this.generation) return;
      onLine?.({who, text});
      const file = speechFiles[`${who}:${text}`];
      if (!file) continue; // New ungenerated lines still have their written subtitles.
      await new Promise<void>(resolve => {
        const voice = new Audio(url(file));
        this.voice = voice;
        voice.volume = .85;
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          voice.removeEventListener('ended', finish);
          voice.removeEventListener('error', failed);
          if (this.finishLine === finish) this.finishLine = undefined;
          resolve();
        };
        const failed = () => { this.report(); finish(); };
        this.finishLine = finish;
        voice.addEventListener('ended', finish);
        voice.addEventListener('error', failed);
        void voice.play().catch(failed);
      });
    }
    if (generation === this.generation) { this.voice = null; this.ambience.volume = .28; }
  }
}
export const tavernAudio = new TavernAudio();
