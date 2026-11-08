// The picture source prevents animated GIF loading for reduced-motion visitors.
// Swapping to the poster stops animation; resume intentionally restarts the GIF.
const image = document.querySelector('#trailer-image');
const toggle = document.querySelector('#trailer-toggle');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = motion.matches;
function render() {
  image.src = paused ? 'assets/trailer-poster.jpg' : 'assets/trailer.gif';
  toggle.textContent = paused ? 'Replay trailer' : 'Pause trailer';
  toggle.hidden = motion.matches;
}
toggle.addEventListener('click', () => { paused = !paused; render(); });
motion.addEventListener('change', () => { paused = motion.matches; render(); });
render();