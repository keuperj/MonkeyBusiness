# Monkey Buisness — Act V Room, Dialogue and Puzzle Plan

> **Draft 0.1 · 6 November 2026 · Editable design proposal**
>
> **Planning only.** This document designs the fifth and final act. It does not implement gameplay, change saves, generate assets, or make the current “Act V is not yet available” message obsolete. Dialogue, readings, documents and mechanisms introduced below are proposed original content.
>
> Continuity sources: `/home/keuper/Projekte/MonkeyBusiness/docs/STORY_PLAN.md`, `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_3_ROOM_PLAN.md`, `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_4_ROOM_PLAN.md`, `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_4_IMPLEMENTATION.md`, and the implemented `/home/keuper/Projekte/MonkeyBusiness/src/act4-state.ts`, `/home/keuper/Projekte/MonkeyBusiness/src/act4-data.ts`, `/home/keuper/Projekte/MonkeyBusiness/src/act4-dialogue.json`.
>
> **Continuity priority:** implemented facts outrank older proposals. In particular, emergency signalling is not proof of wrongdoing, a charter petition does not transfer gate control, and speaking a winning reply cannot move a gate.

## 1. The final-act contract

**Title:** The Right of Way.

**Practical goal:** Replace exclusive central dispatch with a witnessed, safe local service; preserve evidence; publish a usable public chart.

**Emotional goal:** Nell gives up the fantasy that independence means being the only person who knows the route. She accepts credit and fair payment without accepting ownership of other people's passage.

**Opening image:** Three station lights holding steady across dark water. Their attendants are waiting for a person, not a hero to pull an enormous lever.

**Closing image:** The same lights guide an ordinary supply boat through. Later, Nell's modest survey boat leaves a harbour where everyone can read the chart.

**Length target:** roughly 75–100 minutes of first-time exploration and puzzle play, plus a 10–15-minute playable epilogue; a design target to test, not a production estimate.

**Scope:** nine returning harbour rooms plus the returning dry station chamber, four returning shoal rooms, two new walkable shoal interiors, three substantial puzzle close-ups, and a final boat-departure illustration. Nine established speakers; no new named speaking characters. Nell remains the only playable character.

### Required outcomes

1. Embark at Blind Inlet with Orin, after a fresh navigation check.
2. Inspect the bypass's physical boundaries and renew the local stations' current readiness.
3. Confront Vane with bounded claims, including Nell's own responsibility.
4. Separate central command transmission from the gates' power and local pilot circuits.
5. Execute a recoverable local handover, with every physical result acknowledged.
6. Answer Vane's emergency assertion without suppressing a genuine safety channel.
7. Demonstrate monitored public passage and preserve the whole event record.
8. Resolve the charter through a visible later review, not an instant magical verdict.
9. Publish a usable, revisable chart and close each principal character's arc.
10. End the complete adventure; do not replace the ending with an Act VI advertisement.

### Non-negotiable boundaries

- No countdown, drowning, death, combat reflex test, unwinnable inventory state or permanent loss from a wrong reply.
- No implication that people can stop the tide. The Tide Ledger routes local water and coordinates passage; the sea remains the sea.
- Vane is capable, controlling and accountable, not secretly possessed or revealed to be a puppet.
- Her emergency channel remains available. The solution refuses her automatic monopoly, not emergency assistance.
- Local control is coordinated work with maintenance, records and limits, not “everyone pulls whatever they like.”
- Nell does not take Orin's boat, receive Vane's offered vessel by another name, or acquire a private toll franchise.
- Pocket lint is never required, never consumed and never used to defeat a safety interlock.

## 2. Entry, ownership and the Act IV handoff

### Canonical imported facts

| Element | Act V entry |
| --- | --- |
| Nell | Completed Act IV at Repair Quay; may have explored afterward |
| Vane | At Bellweather, following the announced company-launch voyage |
| Second Opinion / Orin | Boat and captain at Blind Inlet |
| Mara | Repair Quay dry station attendant |
| Rook | Outer Landing station attendant |
| Quibble | Service Inlet attendant, physically at Blind Inlet |
| Fine Print | Public witness at Repair Quay |
| Pip | At the Quay Quill; published evidence, company response and Nell's disclosure remain available |
| Bram | At Bellweather maintenance access; available through the tested telephone |
| Live authority | CENTRAL; local drives disengaged; exclusive dispatch announced, not executed |
| Prepared settings | Watch D / revision 1: Outer HIGH → B; Quay LOW → A; Inlet LOW → C |
| Documents | Original chart, tracing, witnessed operating copy, procedure, drawing and commission receipt retained |
| Service equipment | Messenger link remains installed ashore; reusable test handle remains a tool, not a live control key |
| Optional inventory | Preserve pocket-lint presence **or absence** exactly |

On normal entry, show a short explicit walking transition from the imported harbour location to Blind Inlet, using the existing route network. Start the first controllable scene there. Do not silently move the boat to Nell, or replay Mara's confession and recruitment.

Validate a completed Act IV save through its existing parser before importing. Copy the source roster and observations into a separate Act V record; never rewrite the predecessor's completed state. New live readbacks belong to Act V, not to retroactive edits of Act IV.

If no predecessor exists, offer a clearly labelled canonical start: **Start Act V with the harbour prepared**. An incomplete or corrupt predecessor instead offers recovery, continuation of Act IV, or explicit canonical start; never silently substitute completion.

### Initial dialogue — `A5-OPEN`

> **Orin:** “Second Opinion is ready. I have not mistaken that for a weather report.”
>
> **Nell:** “The stations are prepared. I have not mistaken that for today's permission.”
>
> **Quibble:** “Excellent. We are becoming extremely difficult to flatter into an accident.”
>
> **Orin:** “Check the approach with me. Then we go.”

## 3. Story in detail

### Movement I — A promise is not a reading

Nell finds Quibble at his real post and Orin beside his real boat. A new pilot card distinguishes voyage observations from the earlier station watch. The old Outer Landing board is explicitly dated; its ebb reading cannot authorise this voyage.

The current approach is the west service route on a slack-turn observation, with the fixed transit aligned and sufficient marked clearance for Second Opinion. Nell compares the sources; Orin agrees to captain. Quibble remains ashore. Fine Print records departure remotely. During the crossing the three harbour lights answer, then the shoal's larger central display fills the horizon.

Bram welcomes Nell at the service landing before returning to the gallery. He has preserved a dry maintenance route to the inspection bypass, not found a secret tunnel that conveniently bypasses every rule. The player can inspect the recorder and overlook before approaching Vane.

At the gallery, the new observation capture advances the whole harbour to Watch D / revision 2. The quay level has risen to MIDDLE, so Mara's old A setting is stale and the correct new detent is B. The other two detents remain valid but their acknowledgements still need the new revision. This is the act's first answer to complacency: yesterday's work matters, and must be checked.

### Movement II — The person behind the display

Vane is on the central command floor, visibly recording the next dispatch instruction. She admits Nell and Bram for a witnessed operational challenge because inspection, public signalling and the disputed charter are already established. No stolen key or seduction of a guard is needed.

The confrontation is five exchanges, each combining a statement with its supporting record. Vane is permitted to make her strongest case: central coordination does reduce uncertainty, Nell supplied useful calibration, and an uncoordinated shutdown would be reckless. Nell wins by agreeing with true premises and rejecting the exclusive conclusion.

During the exchanges Vane points out the command transmission, public signal return and local-ready panel to defend her argument. Those pointers make the spectacle legible; they do not secretly unlock a machine. Bram's labelled schematic remains the independent source for the practical puzzle.

At the end, Nell has placed a precise alternative on the public record. Vane refuses to surrender operational authority voluntarily, but the existing witnessed maintenance procedure permits a restricted bypass changeover when the local-ready interlocks are satisfied. This maintenance provision is introduced and read **before** the argument, not invented afterward.

### Movement III — Three voices, one changeover

The spectacle becomes a quiet task. Nell walks into the dry bypass room, verifies the latest three replies, and distinguishes central command transmission from drive power and public signals. She opens the command coupling, not the power feed. Mechanical holds retain gate positions while central commands are isolated.

Quibble accepts the relief route first; Rook establishes the checked outer return; Mara balances the quay against the acknowledged paths. Each step has a named readback and an independent indicator. The order is given by the service diagram and visible in the hydraulic model; it is not guessed from character preference.

When the first local pilot engages, Vane asserts emergency central authority. The double-circle public signal repeats her declaration across the same witness network she sought to control. She has not accidentally confessed to a crime; she has made a specific, recorded claim that the local system has no verified cover.

The player pauses, checks that claim against current readbacks and an independent passage observation, and keeps emergency assistance available. Vane's demand for an automatic exclusive reset is refused. The outstanding local steps proceed only after the check; the emergency signal is logged and remains audible/visible, not disabled.

### Movement IV — The harbour answers

The three local readbacks agree. A queued public supply lighter has a posted inspection clearance and matching draft class. Nell authorises one monitored passage under the current limits; no blind fleet-wide release occurs. At the command display, the enormous central pointer fails to move the isolated local controls. On the water, three smaller station lights answer one another and the boat clears the transit.

Vane's final attempt to make Nell choose between absolute control and chaos is answered by people doing their jobs. Nell asks Vane for the central return measurement. Vane supplies it, begrudgingly. That action prevents her from becoming a cartoon obstruction and establishes useful work without forgiving misconduct.

The next scene does not award the charter by applause. Pip receives the witnessed event copy and publishes a dated account. An explicit **Several days later — charter review concluded** transition leads to Repair Quay, where a readable review finding removes the exclusive dispatch condition and places the company's operations under supervised public-service terms. It cites policy records, the emergency assertion and the observed safe alternative; it does not misattribute the historical relief incident to Vane.

### Movement V — A chart is an invitation

Nell assembles the public working edition: fixed landmarks, dated depth limits, station contacts, signal meanings, maintenance boundaries and unresolved uncertainties. She chooses the public reproducible edition instead of an exclusive sale. This is the authored ending, not a hidden moral score: tempting alternatives can be discussed and cancelled, but do not create a bad ending.

Only after publication does the harbour's practical offer appear. Paid survey work and itemised contributions fit out an existing small repair-yard hull. An explicit **Weeks later** transition permits the work and station relief arrangements to happen without a new fleet of named characters.

The player walks the harbour, collects conversations rather than compulsory gifts, inspects the boat's work agreement, and chooses departure. Mara gives provisions, Orin marks an uncertainty honestly, Rook labels a component's limitations, Quibble relinquishes his pretended bridge ownership, and Fine Print negotiates representation with Nell rather than over her.

Nell names the boat **Still Deciding**. The title is fixed for the closing joke, with an optional preceding “try a name” conversation that has no save or voice explosion. The camera follows her out past the now-public signals. End on possibility, not another emergency.

## 4. Rooms, geography and world phases

### Complete room roster

| ID / key | Room | Phase and dramatic purpose | Physical exits |
| --- | --- | --- | --- |
| A5-01 / `inlet` | Blind Inlet — Service Inlet station | Opening, navigation check, Quibble's duty, Orin's embarkation | Existing harbour lanes; confirmed voyage to `service` |
| A5-02 / `service` | Bellweather Service Landing | Arrival, boat ownership, independent passage observation | `gallery`; voyage back to `inlet` when safe |
| A5-03 / `gallery` | Caretaker's Gallery | Bram, current revision, maintenance limits, remote roster | `service`, `recorder`, `overlook` |
| A5-04 / `recorder` | Recorder Room | Event copy, no repeat repair, optional lint exhibit | `gallery` |
| A5-05 / `overlook` | Chart-Drum Overlook | Public signal inspection, admission to confrontation | `gallery`, authorised dry stair to `command` |
| A5-06 / `command` | Tide Ledger — Central Command Floor | New room; Vane's word duel, live display, public outcome | `overlook`, signed dry inspection door to `bypass` |
| A5-07 / `bypass` | Inspection Bypass Gallery | New room; isolated command coupling and local handover desk | `command`; no wet-culvert shortcut |
| A5-08 / `quay` | Repair Quay | Fine Print's witness station; later review and boat unveiling | Existing harbour lanes; `station` |
| A5-09 / `station` | Repair Quay — Dry Station Chamber | Mara's attended station; source review before voyage or after return | `quay` only |
| A5-10 / `landing` | Outer Landing | Rook's station and fixed transit; later public chart copy | Existing harbour lanes |
| A5-11 / `press` | The Quay Quill | Pip's witness publication and final chart puzzle | `quay` |
| A5-12 / `office` | Fair Passage Survey Office | Archived offer; later review finding and supervised work order | `quay` |
| A5-13 / `bridge` | Quibble's Crossing | Open throughout; final public-passage declaration | `landing`, `tavern` |
| A5-14 / `tavern` | The Crooked Compass | Quiet resolution with Mara after relief, provisions | `bridge` |
| A5-15 / `hall` | Rook House — Breakfast Hall | Solved-state comic return; no new compulsory breakfast puzzle | Existing harbour connection, `workshop` |
| A5-16 / `workshop` | Rook's Workshop | Existing records; epilogue tool with honest limits | `hall` |

The existing harbour graph remains authoritative; “existing lanes” never means adding direct edges. Reuse the generated shoal map and add a clearly illustrated central cutaway with the two new rooms. Walking to the bypass must trace `gallery → overlook → command → bypass`. The map must not put the bypass on a second island or connect harbour and shoal with a walking line.

### Access and return policy

- Before live changeover, allow a checked return voyage and re-embarkation without resetting puzzles. Returning to the harbour does not relocate its attendants.
- A return voyage requires a new, explicit Orin check; the current voyage record is not a perpetual pass. Observation revisions change only at authored events, not because the player waited or reopened the map.
- During a partially engaged handover, the boat action explains **Finish the handover or restore central hold first**. It offers the reversible recovery procedure; it does not silently trap the player.
- After stable local service, the return route remains available with Orin. Local stations retain named attendants until the time-jump relief roster explicitly replaces them.
- Post-review exploration is not a time machine. Controls become supervised-service/read-only views, and Vane's old confrontation cannot restart live events.
- All exits, map markers, keyboard destination buttons and loaded room states enforce identical prerequisites.

### New room A5-06: Central Command Floor

**Composition:** a broad dry stone balcony around the vast brass drum; deep indigo water visible only beyond guarded arches. A lit miniature harbour dominates the back wall. Vane stands left of the command lectern, never over the inspection door. Foreground floor has an unbroken walkable strip. No jumping across gears.

| Object | Look / interaction | Function |
| --- | --- | --- |
| Central harbour display | Three local pointers, one central command pointer; labelled authority state | Readable counterpart to spectacle; confirms isolation is not power loss |
| Pending dispatch docket | R19 remains pending; subscription condition distinguished from safety hold | Evidence, not another copy of the trial record |
| Witness transmission desk | Shows named shore witnesses and transcript state | Starts five-round challenge; cancels safely between rounds |
| Command coupling legend | COMMAND / POWER / SIGNAL are separate | Clue for bypass puzzle |
| Emergency declaration lever | Vane's control, inaccessible to Nell; legend publicly readable | Visible setup for the reversal, no surprise remote magic |
| Dry inspection door | Opens after Bram's procedure briefing and witnessed admission | Leads to bypass, not a secret victory switch |
| Maintenance responsibility board | Named inspector, witness and hold state | Links operational authority to an auditable procedure |

**Changed state:** after local takeover the central pointer remains lit but disconnected; local indicators move independently. After review the room displays supervised maintenance tasks, not wreckage or a trophy throne.

### New room A5-07: Inspection Bypass Gallery

**Composition:** narrow dry inspection room behind glass, three clearly separated conduits and a captive coupling handle. The glass provides a view of the enormous moving drum; Nell never enters its drive space. A small desk and three reply lamps provide a human-scale contrast.

| Object | Interaction | Failure/recovery |
| --- | --- | --- |
| Inspection permit and dry telltale | Read procedural scope; inspect physical dry route | Wet-route suggestion refused with named dry exit |
| Coupling panel | Select central command transmission; guarded hold/isolate sequence | Wrong circuit selection previews its function and blocks actuation |
| Gate-position holds | Confirm each hold seated before isolation | Missing hold identifies the station; no reset of unrelated work |
| Three-channel readback desk | Address named stations, stage changeover, verify results | Stale identity/revision is shown inline and cannot be accepted |
| Public signal repeater | Announces emergency and displays claim verbatim | No disable action; “A warning is not an enemy.” |
| Recovery plate | Print the hold/disengage/reconnect procedure | Always accessible, including during interruption |
| Observation window | Independent gate-position telltales | Required verification, not decorative lights |

### Returning-room interaction changes

| Room | Required or optional objects in Act V |
| --- | --- |
| Inlet | Current pilot notice, fixed-transit report, boat-clearance card, Quibble's local cabinet, Orin; old obstacle remains solved |
| Service | Arrival plate, dry stair, moored boat, passage telescope, current signal mast; Orin remains here while Nell explores |
| Gallery | Revision-2 capture register, station-specific routing cards, maintenance procedure, telephone, Bram's desk; kettle optional |
| Recorder | Repaired duplicate tray, event-copy selector, witness seal, unused exhibit recess with new “EXHIBIT ZERO” placard; no respawning collar |
| Overlook | Live/pending status plate, public emergency legend, dry command stair; old training model read-only and labelled NOT LIVE |
| Quay | Witness table, public signal board, later finding and boat ledger; boat remains absent until the weeks-later reveal |
| Station | Mara, installed messenger link, current gauge and readback; no collectible replacement link |
| Landing | Rook, current gauge, fixed transit and properly aligned text-bearing board; old voyage notice dated as historical |
| Press | Previously published proof, new event transcript, response slot, public-chart compositor, print rack |
| Office | Chartered duties, pending tariff archive, later review finding and supervised work order; no Vane duplicate |
| Bridge | Open passage notice, empty duty slate while partners work; epilogue Quibble and Fine Print after explicit relief |
| Tavern | Open chest, Mara's private account retained by consent, later provisions and farewell; no second confession puzzle |
| Hall | Working breakfast mechanism, ordinary owner conversation after relief; previous optional jokes may replay |
| Workshop | Routing supplement remains readable, epilogue sounding-kit specification; no new repair gate |

Every critical text is also selectable panel/notebook text. Artwork labels and hotspot rectangles must be checked against the finished illustration, not inherited from approximate room coordinates.

## 5. Characters, location and conversation plan

### Cast and physical continuity

| Speaker | During expedition / changeover | Resolution and voice |
| --- | --- | --- |
| Nell | Moves through rooms; only playable character | Owns her mistake without claiming sole credit; confident, not omniscient |
| Orin | Captains each voyage; stays with Second Opinion at the destination | Admits the unsurveyed patch; gives advice, not his boat |
| Bram | Gallery; visibly accompanies admission, then works in bypass | Precise, patient; earns paid maintenance authority and a readable nameplate |
| Vane | Command floor; emergency action there | Supplies measurement; later supervised repair beside Bram, not magically arrested |
| Rook | Outer Landing; telephone portrait labelled REMOTE | Shares current readings; later returns home only after relief |
| Mara | Dry station chamber; REMOTE during shoal scenes | Executes balance step; later quiet tavern farewell after relief |
| Quibble | Blind Inlet station; REMOTE during shoal scenes | Waits for actual readback; later opens the bridge without charging for it |
| Fine Print | Repair Quay witness table; REMOTE during confrontation | Records claims and limitations; later becomes a negotiating equal |
| Pip | Quay Quill, receiving public transcript | Publishes corrections and review result; pays Nell for reproducible work |

Relocation is atomic and visible. Bram has a single location even when he accompanies Nell; if he is in bypass, the gallery offers a call point, not a second Bram. Remote portraits never masquerade as room sprites. End-of-story time jumps introduce an explicit non-speaking relief roster before moving attendants to farewells.

### Topic inventory

Each topic gets a stable `A5-{SPEAKER}-{NN}` ID when extracted into dialogue JSON. Required actions remain visible room actions, not buried in optional topics. The mandatory blocks below supply complete anchor exchanges; this topic table defines the remaining writing scope, not already-recorded voice lines.

| Speaker | Topics and intended answers |
| --- | --- |
| Orin | “Why check again?” → chart age versus current water; “Who owns Second Opinion?” → Orin, emphatically; “Can we turn back?” → safe return/hold rules; “The blank patch?” → honest uncertainty; “My own boat?” → contract and seamanship, not destiny |
| Bram | “What does the bypass bypass?” → commands, not power; “Who can authorise inspection?” → displayed maintenance provision; “Why this order?” → relief before balance; “Can I undo it?” → explicit recovery; “Your name on the plate?” → paid maintenance credit; “Exhibit Zero?” → lint egg clue |
| Vane | “Do you deny the trial?” → no, defends selection; “What about my calibration?” → Nell contributed; “Why not shared schedules?” → distrust of distributed accountability; “What counts as an emergency?” → stated hazard and public claim; “What work remains?” → begrudging technical cooperation; “Do you forgive us?” → not the story's reward |
| Mara | “Revision two?” → current quay rise; “Are you ready to hold?” → yes, independent consent; “The old relief run?” → no historical rewrite; “What changes now?” → responsibility without secrecy; “Provisions?” → practical care, no sentimental prophecy |
| Rook | “Why B at the quay?” → station-specific routing; “Does local mean simple?” → no; “Family credit?” → designs and failures both named; “The sounding kit?” → useful limits, no infallible invention |
| Quibble | “Why do you go first?” → relief route, not rank; “Can you wait?” → proud restraint; “The bridge?” → passage, not possession; “One last duel?” → optional verbal flourish, no gate |
| Fine Print | “Witness or judge?” → explicitly witness; “Why repeat Vane's claim?” → preserve the whole record; “Who pays for work?” → itemised maintenance still lawful in-world; “Represent me?” → separate agreement; “Boat name?” → final exchange |
| Pip | “Another headline?” → sources before scale; “Print Vane's answer?” → yes, next to the records; “What did review decide?” → scope and remedies; “Free chart, unpaid chartmaker?” → reproduction rights versus labour; “Corrections?” → dated editions and contact point |

## 6. Puzzle graph and exact solutions

```text
Completed Act IV → P1 checked voyage → shoal inspection
                                    ├→ P2 current cover + P3 bypass inspection
                                    └→ P4 witnessed word duel
P2 + P3 + P4 → P5 isolate command / begin local sequence
                       → P6 emergency claim check → finish P5
                       → P7 monitored passage + witnessed event copy
                       → return / public review → P8 public chart
                       → weeks-later boat / farewells / final departure

Pocket-lint exhibit: optional from first recorder visit; never an edge above.
```

### P1 — The chart is not today's water

**Location:** Blind Inlet navigation table. **Sources:** new pilot notice, Orin's clearance card, current fixed-transit report. All three have direct **Inspect** actions that select Look and clear an inventory-use selection.

Proposed current voyage record **V5-1**:

- Route: WEST SERVICE APPROACH; east company arm remains restricted.
- Observation: SLACK TURN; no inference from the old EBB board.
- Position: WAREHOUSE CORNER / LIGHTHOUSE NOTCH aligned.
- Clearance: class S vessel permitted on the marked service route; Second Opinion is class S.

**Solution:** choose those three navigation values, verify the vessel card, then ask Orin to confirm. This records a voyage decision, not new station settings. Orin's consent is an explicit final button.

**Feedback:** “That ebb observation belongs to the previous voyage. Inspect pilot notice V5-1.” Wrong route or missing source names the source in a focusable live-status message beside the controls. Correct guesses without inspections do not pass. Cancelling voyage leaves Nell and boat at the same berth.

### P2 — The answer has a date and a name

**Location:** gallery telephone and capture register; physical stations remain ashore. **Goal:** produce a fresh readiness fingerprint, not repeat Act IV recruitment or hardware repairs.

The explicit **Capture current watch** action latches Watch D / revision 2 across all three remote records. This authored event occurs once. It invalidates old technical test/readback/rehearsal tokens, not attendance or consent.

| Station | Named attendant | Revision-2 level | Correct local pilot detent | Difference from imported revision 1 |
| --- | --- | --- | --- | --- |
| Outer Landing | ROOK | HIGH | B / return | Detent unchanged; new observation/readback required |
| Repair Quay | MARA | MIDDLE | B / balance | Changed from LOW / A |
| Service Inlet | QUIBBLE | LOW | C / relief | Detent unchanged; new observation/readback required |

Use the existing station-specific routing cards: Outer LOW→A, MIDDLE→C, HIGH→B; Quay LOW→A, MIDDLE→B, HIGH→C; Inlet LOW→C, MIDDLE→A, HIGH→B. Do not generalise one card to all stations.

**Player action:** call each named attendant, read their current observation, propose the appropriate detent, ask for a disengaged test, then repeat identity/watch/revision/level/detent. The attendant physically stages and tests it. Nell does not remotely teleport a test handle from the shoal.

**Solution token:** all three fresh records, correct local settings, attendants present, test passed, named acknowledgement, public witness receipt. Fine Print acknowledges the combined roster once.

**Edit behaviour:** change one station's choice → invalidate that station's test and acknowledgement plus the combined witness token; leave unrelated tests intact. Calling again never silently advances the revision.

### P3 — Bypass does not mean break

**Locations:** gallery procedure, overlook legend, bypass close-up after admission. **Goal:** understand the safety envelope and inspect it before operation.

The proposed maintenance supplement explicitly permits a witnessed dry changeover by the named inspector and caretaker when central transmission can be isolated, mechanical position holds are seated, and all named local stations have current cover. It grants neither charter adjudication nor arbitrary operation of the gates.

**Required inspections:** dry access telltale; three seated gate-position holds; diagram distinguishing COMMAND / DRIVE POWER / PUBLIC SIGNAL; emergency return interlock.

**Close-up task:** match the three labelled paths to their functions. Solution: isolate **CENTRAL COMMAND TRANSMISSION**; retain **GATE DRIVE POWER** and **PUBLIC SIGNAL / READBACK**. Shapes, words and line patterns distinguish them; colour alone is insufficient.

**Wrong choices:** select power → “That would remove the local stations' power too”; select signal → “Then we would lose the answers that make this safe.” Nothing physically changes until a complete reviewed action is confirmed. Tools, lint and boathook cannot shortcut the panel.

### P4 — The final word duel: five claims, not five insults

**Location:** command witness desk. **Mechanic:** choose a reply **and** a supporting source card. Three replies per round; unlimited retries. Successful rounds persist. The transcript shows Vane's claim, Nell's answer, supporting source and the exact limit of what was established.

| Round | Vane's claim | Correct reply | Required support | Rejected shortcuts |
| --- | --- | --- | --- | --- |
| 1 | “The water, not the account, decided who waited.” | “Those two inspected boats met the same route conditions. Your slips give the missing contract as the hold reason.” | T17-A/B dispatch slips + R17 trial acknowledgement | All fees illegal; claim the pending R19 already ran |
| 2 | “Your own work made the system accurate.” | “Yes. I supplied the calibration. That does not turn it into consent to exclusive dispatch.” | R18 source annotation + Nell's published disclosure | Deny authorship; blame the historic incident on Vane |
| 3 | “Without central command you have three strangers pulling levers.” | “Three named attendants, one current revision, a tested sequence, and a right to hold.” | Revision-2 roster + bypass procedure | Old Watch C model; Act IV revision-1 rehearsal |
| 4 | “Safety is a service. Service has a price.” | “Itemised maintenance can be charged. An exclusive account cannot be the condition of ordinary passage.” | Charter clauses 4/7 + FP-D/1 tariff | All work must be free; all restrictions unlawful |
| 5 | “Choose. My authority, or nobody responsible.” | “Shared responsibility is still responsibility. Put your instruction beside our answers, where the harbour can read both.” | Public-signalling clause 9 + witness transmission receipt | Nell takes sole control; smash the drum |

Each round reveals or highlights a physical part of Vane's display, but winning only sets `challengeRecorded`. It does not set isolation, local-active or charter-result flags. A stale roster at round 3 links back to the telephone; previous factual rounds survive the correction.

**Example failure:**

> **Nell:** “You caused the old relief grounding.”
>
> **Vane:** “Before I held this office? Your chronology is more ambitious than your accusation.”
>
> **Fine Print, remote:** “Historical record. Different operator. Keep the present case intact.”

**Final exchange — `A5-CHALLENGE-END`:**

> **Vane:** “You have made a very eloquent collection of dependencies.”
>
> **Nell:** “Yes. I finally wrote down their names.”
>
> **Bram:** “The dry changeover procedure is available. No part of that sentence says it is complete.”

### P5 — The coordinated changeover

**Location:** bypass. **Prerequisites:** P2, P3, P4, witness line live, current roster match. Display the complete operation and cancellation behaviour before commitment.

1. **Request hold:** each named station confirms its present position hold; central remains responsible.
2. **Isolate command transmission:** captive coupling opens only after the three holds and current tokens match. Power and public signals stay on; Vane's display visibly changes to COMMAND ISOLATED.
3. **Inlet relief:** address Quibble; select C / relief; request LOCAL READY → accept physical LOCAL ACTIVE and indicator return. This step triggers Vane's emergency claim once.
4. **Pause for P6:** no next control action accepted until the emergency check resolves.
5. **Outer return:** address Rook; select B / return; verify current-level and pilot acknowledgement.
6. **Quay balance:** address Mara; select B / balance only after inlet and outer readbacks match.
7. **Verify common service:** compare all three independent telltales with their named replies; Fine Print records LOCAL SERVICE ACTIVE, revision 2.

Why this order: the inlet relief path must be available before outer return is established; the quay balances against both confirmed paths. Bram's diagram states this in words and illustrates it. Never require guessing from the order of UI buttons.

Wrong-order attempts do not move machinery. Feedback names the missing physical readback. A repeated confirmation is idempotent, not another gate movement.

**Safe recovery:** at every stage offer **Hold and review**. Before isolation it simply cancels. After isolation, a displayed assisted procedure holds all positions, disengages any active local pilots in reverse order with acknowledgements, verifies all pilots disengaged, then reconnects central command under public witness. No reconnect while any local drive is active. This retains the challenged evidence and current readings, but invalidates the live handover tokens. Vane's already-recorded emergency event is not erased or replayed as a fresh surprise.

### P6 — A warning is a claim, not a crown

**Trigger:** after inlet relief acknowledges. Vane pulls the EMERGENCY CENTRAL lever; double-circle signals appear in command, bypass and the harbour cutaway. Caption and transcript are available muted; there is no flashing-only clue.

> **Vane:** “Emergency central authority. Local cover is unverified. Restore the central return.”
>
> **Fine Print, remote:** “Public declaration received. Claim recorded exactly.”
>
> **Quibble, remote:** “Inlet relief is engaged and confirmed. I shall not improve that fact by shouting.”
>
> **Nell:** “Keep the warning open. Check what it says.”

**Puzzle:** classify four cards and select the response:

| Card | Classification |
| --- | --- |
| Director's double-circle signal | Emergency authority asserted; not independent evidence of a hazard |
| Named inlet physical return + seated outer/quay holds | Current local cover exists for the paused stage |
| Orin's independent sighting: marked approach clear, no vessel inside changeover zone | Current external observation, not a guarantee about every future boat |
| Charter/public emergency return plate | Assistance stays available; reconnection requires verified safe disengagement |

**Correct response:** **Maintain witnessed hold; verify present cover; retain emergency assistance; continue the checked local sequence.** The player requests the three reports and selects it. Neither “ignore all emergencies” nor “reconnect immediately” passes.

Vane's emergency return is a request channel with the already-inspected interlock, not a secret actuator that overrides every safety mechanism. If a source is missing or stale, the only valid action is hold and reacquire it. A later reported real hazard would require hold/assistance, not denial merely because Vane spoke first.

### P7 — Let one boat through, and write down what happened

**Locations:** command/bypass verification, service-landing telescope, recorder. This is the visible proof after the argument, not a victory button that skips the water.

The queued lighter's posted dispatch card states class S, inspection passed, route clearance current and no exclusive account. Match it to the west service limits and live local-status sheet. Authorise **one monitored transit**, not OPEN ALL ROUTES.

Orin supplies the independent exit observation from the service landing. All attendants remain at their posts. Vane supplies the central return reading under witness; it agrees with the independent indicators. The lighter clears the fixed transit. No new speaking captain is required.

**Event-copy task:** in the already-repaired recorder, select EVENT COPY, the current watch/revision and **FULL SEQUENCE WITH DECLARATION AND READBACKS**. Preserve both Vane's emergency statement and the observations used to answer it. Do not print only favourable extracts. Bram countersigns equipment identity; Fine Print supplies the received shore transcript. The original remains in the recorder archive; Nell carries a witnessed copy.

### P8 — Publish a chart somebody else can use

**Location:** Quay Quill after review. **Goal:** a usable edition, not merely the announcement that Nell is generous.

The compositor has six labelled sections. For each, choose the accurate source and qualification:

1. **Fixed position:** warehouse corner / lighthouse notch and surveyed service entrance; do not use a drifting float as a fixed landmark.
2. **Depth and watch:** dated survey limits and current-source reference; no “safe at all tides.”
3. **Signals:** TEST / announcement / emergency assertion / local handover distinguished; no “double circle proves danger.”
4. **Responsibility:** named station contacts and relief-record procedure; not “ask Nell for every movement.”
5. **Maintenance boundary:** public instructions for inspection and requesting trained assistance; no unqualified live gate-operation recipe.
6. **Uncertainty and corrections:** mark the unsurveyed reach and give a correction contact and edition number; do not fill it with decorative certainty.

**Publication terms:** reproducible public working edition; paid surveying and itemised maintenance remain possible. Select **Publish the working chart and its limitations**. Print copies for all stations and the public rack; preserve original sources. This is the required final puzzle, and no private monopoly route becomes a second ending.

> **Pip:** “If everyone can copy it, what are we paying you for?”
>
> **Nell:** “Making it worth copying. And coming back when the water proves me wrong.”
>
> **Pip:** “Good. I can print those terms without making them smaller.”

## 7. Grand finale: staging, dialogue and earned resolution

### Playable set-piece beats

| Beat | Player action | Picture / sound / consequence |
| --- | --- | --- |
| The large claim | Finish witnessed duel | Vane framed against the enormous harbour display; no victory fanfare yet |
| The small check | Read three names at bypass desk | Machinery quietens beneath each spoken reply; lamps labelled, not just coloured |
| Central lets go | Confirm command isolation | Brass coupling withdraws; drum still turns; gate holds stay lit |
| First answer | Verify Quibble's inlet relief | Cutaway of inlet mechanism and one steady local signal |
| Emergency reversal | Read and test Vane's claim | Double-circle pattern repeats across sea; witnesses answer rather than panic |
| Three stations | Verify Rook, then Mara | Three familiar rooms answer in sequence; Nell remains the only controlled character |
| Public passage | Approve the inspected lighter | Wide shoal panorama; boat crosses fixed transit; music resolves gradually |
| Account, not humiliation | Obtain full event copy | Recorder prints both sides; Vane's useful measurement stays in the record |

All cutaways have Continue, caption replay and reduced-motion stills. Skipping presentation cannot skip required checks or execute a physical operation twice.

### `A5-LOCAL-ANSWERS`

> **Quibble, remote:** “Service Inlet. Relief open. Quibble, present and answering.”
>
> **Rook, remote:** “Outer Landing. Return established. Tamsin Rook. The numbers are agreeing without a family motto.”
>
> **Mara, remote:** “Repair Quay. Balance confirmed. Mara. I am staying until someone properly relieves me.”
>
> **Fine Print, remote:** “Three stations. Three names. One recorded watch.”
>
> **Nell:** “Now check the boat. Being right about the gates is not the whole job.”

### `A5-PASSAGE`

> **Orin, remote:** “Lighter clear of the western transit. No account presented. No scrape heard.”
>
> **Vane:** “One passage does not maintain a harbour.”
>
> **Nell:** “No. Neither does one director.”
>
> **Nell:** “Your return gauge. What does it show?”
>
> **Vane:** “Within the marked range.”
>
> **Bram:** “Please put your name beside it.”

Let the measurement land before the joke. Vane signs because the measurement is true and the job remains real. Do not have the crowd laugh her into the sea.

### Review finding and charter consequence

The finding is a **proposed fictional in-world document**, introduced as the result of the charter-review process already reserved by clause 9. Fine Print witnesses and reads it; he is not suddenly the judge. A non-speaking harbour review panel appears in an illustration. No real-world legal rules are implied.

**Finding HC-5, readable in full:**

> The reviewed dispatch records establish an exclusive-account condition on ordinary passage, contrary to the public-service undertaking. The documented emergency assertion does not remove the obligation to state and verify the hazard. Itemised maintenance charges and evidenced safety restrictions remain permissible. Exclusive dispatch privileges are withdrawn. Fair Passage shall provide operating records and supervised remedial work under the harbour's published service arrangements. The historic relief incident is recorded separately and is not attributed to Director Vane by this finding. Review and correction records shall remain open.

The finding removes **exclusive privileges**, not the existence of paid maintenance or the company's every activity. Local service had already become operational through a bounded maintenance handover; this later decision settles its governance and remedies. Do not confuse those two events.

### `A5-REVIEW`

> **Fine Print:** “Exclusive dispatch withdrawn. Maintenance obligations retained.”
>
> **Vane:** “You have removed the convenient part.”
>
> **Bram:** “The convenient part for whom?”
>
> **Pip:** “That question is going above the fold.”
>
> **Nell:** “Put the finding above it. People should be able to check the joke.”

## 8. The pocket-lint Easter egg — Exhibit Zero

**Purpose:** pay off the humble item that has survived the adventure without making it a miraculous repair material. Original museum-bureaucracy humour; no copied franchise quote or licensed character.

**Location:** Recorder Room's unused display recess, returning from Act III. It now has a small readable placard: **EXHIBIT ZERO — CLAIMS AWAITING EVIDENCE. CLEAN DISPLAY TRAY. NO MACHINE CONNECTION.** Bram mentions that visitors keep asking where the treasure is.

**Discoverability:** looking at the placard says, “An empty display for something with a more impressive story than specification.” Notebook optional observation: **The recorder has room for a small exhibit, not another part.** This is a clue, not a required checklist row.

**Trigger:** inspect the placard, then Use pocket lint on the display tray. Works from the first recorder visit and during safe post-finale exploration. If Bram is elsewhere, he answers through the labelled maintenance telephone; do not duplicate his sprite.

### `A5-EGG-EXHIBIT-ZERO`

> **Nell:** “At last. A place for the accumulated substance of my adventures.”
>
> **Bram:** “Is that a specimen?”
>
> **Nell:** “Pocket lint. Provenance: pocket. Further provenance: uncertain.”
>
> **Bram:** “I can catalogue that.”
>
> **Nell:** “You can catalogue uncertainty?”
>
> **Bram:** “Certainly. The trouble starts when people catalogue it as a crown.”
>
> **Nell:** “Any special powers?”
>
> **Bram:** “It has kept you from throwing away an empty pocket for five chapters.”
>
> **Nell:** “Remarkable conservation work.”

The “five chapters” line is a deliberate optional fourth-wall wink, not part of mandatory story dialogue. If a strict no-metafiction tone is preferred during script review, use “for an entire voyage's worth of trouble” instead; choose one before recording, not at runtime.

**Visual reward:** a brief mock museum spotlight and an absurdly ornate catalogue border around a tiny lint silhouette. A facsimile card remains: **EXHIBIT ZERO: POCKET LINT. CLAIMED POWERS: NONE VERIFIED. OWNER RETAINS SPECIMEN.** Nell retrieves the real lint within the same atomic interaction; inventory never loses it.

**Durable state:** `eggExhibitZero=true`; catalogue card added to optional notebook discoveries, not carried inventory. Replay uses “Read Exhibit Zero's catalogue.” No live-control flag, evidence rank, charter outcome or ending payment changes.

**Optional epilogue callback:** the boat's inventory sheet lists “One historical specimen, privately carried.” Without the egg, that line is omitted without an empty slot or completion penalty.

**Wrong-use responses:** lint → command coupling: “This is a control boundary, not a dusting opportunity.” Lint → emergency repeater: “A warning should not have to fight through my pocket.” Lint → public chart: “We have agreed to mark uncertainties, not glue them down.” All retain the item.

## 9. Epilogue: people, payment and the horizon

### Boat agreement, not a coronation

After P8, present an itemised repair-yard agreement: completed survey work is paid; the community buys a defined set of future survey visits; an existing small hull and documented fitting work form part of that payment. Nell owns the finished vessel, retains the right to refuse unsafe work, and grants reproduction rights to the agreed public survey editions. No exclusive navigation rights transfer. No surprise debt or mandatory forever-service clause.

Orin keeps Second Opinion. Nell's boat is visibly smaller, a single-masted working survey craft with a compact cabin, sounding gear and patchwork contributions. Name **Still Deciding**. It is not the company vessel she declined.

The **Weeks later** transition lists the relief arrangements: trained relief crews now cover published watches, with the previous named attendants' handover records. Only then may Mara, Rook and Quibble appear away from stations. Their successors need no new speaking cast or portrait dialogue.

### Farewell conversations

These are available in any order; the final departure panel lists them as optional visits, not required fetch quests. The publishing agreement and boat inspection are the only remaining mandatory checks.

**Mara — `A5-FAREWELL-MARA`, tavern:**

> **Mara:** “Bread. Tea. Something in a jar that will remain useful longer than either of us expects.”
>
> **Nell:** “Advice?”
>
> **Mara:** “Ask before you decide what someone else needs protecting from.”
>
> **Nell:** “You could come for the first stretch.”
>
> **Mara:** “Ask me tomorrow. I would like to answer without a crisis helping.”

**Orin — `A5-FAREWELL-ORIN`, quay:**

> **Orin:** “Here. Beyond this point I don't know the bottom.”
>
> **Nell:** “You've left it blank.”
>
> **Orin:** “A considerable improvement on what I used to do.”

**Rook — `A5-FAREWELL-ROOK`, workshop:**

> **Rook:** “A sounding reel. It measures depth, not worthiness.”
>
> **Nell:** “A narrow field for one of your family inventions.”
>
> **Rook:** “I have removed three unnecessary ambitions from the handle.”

**Quibble — `A5-FAREWELL-QUIBBLE`, bridge:**

> **Quibble:** “I declare this crossing open.”
>
> **Nell:** “It was open.”
>
> **Quibble:** “Yes. I am practising declarations that describe something.”

**Pip — `A5-FAREWELL-PIP`, press:**

> **Pip:** “A hundred copies. One correction address. No miraculous guarantees.”
>
> **Nell:** “Put my name on it.”
>
> **Pip:** “As owner of the water?”
>
> **Nell:** “As the person to tell when the chart is wrong.”

**Bram and Vane — `A5-FAREWELL-MAINTENANCE`, optional shoal visit:**

> **Vane:** “Your maintenance list has an unreasonable number of listeners.”
>
> **Bram:** “Those are the people affected by the work.”
>
> **Vane:** “I had inferred that.”
>
> **Bram:** “Good. Read the first name back.”

Their scene requires an explicit optional voyage with Orin and return; it is also available as a consented telephone conversation at the quay, so a farewell completionist need not perform two loading sequences. Neither character teleports into the harbour party.

### Final departure — `A5-END`

At Repair Quay, **Inspect Still Deciding** checks boat readiness and the work agreement. **Leave on the first survey** opens an explicit ending confirmation; **Keep visiting** cancels. Do not unexpectedly end the game by clicking the boat sprite.

Fine Print is aboard temporarily by invitation for the naming and agreed representation discussion; the departure scene makes his destination clear: he disembarks before the boat leaves. Do not abduct Quibble's partner as an inventory reward.

> **Fine Print:** “I could represent your interests.”
>
> **Nell:** “Provided I get to tell you what they are.”
>
> **Fine Print:** “An unusually demanding client. What will you call the boat?”
>
> **Nell:** “Still Deciding.”
>
> **Fine Print:** “Terrible name. Impossible to invoice.”
>
> **Nell:** “You will find a way.”

Fine Print steps onto the quay. Nell casts off only after clearance. Close on the public chart rack, a small monkey emblem releasing a mooring rope, and Nell's boat taking the marked route toward an honestly blank stretch of coast.

**Final written line:** “A good chart leaves room for the next person.”

**End card:** **Monkey Buisness — The End.** Credits, **Continue exploring the epilogue**, **Replay the ending**, **Main menu**. Continue exploring restores the pre-departure epilogue checkpoint without pretending Nell instantly sailed back; label it as such. Completed-game state remains recorded separately.

## 10. Inventory, documents and interaction rules

| Item / document | Treatment |
| --- | --- |
| Original survey / service tracing | Retained; historical geometry, not current readings |
| Drawing / commission receipt / operating copy | Retained evidence with separate source badges |
| Procedure booklet | Extended by the read-only maintenance supplement; preserve training/live distinction |
| Pencil / boathook | Ordinary inspection and wrong-item responses; no live-actuator shortcut |
| Test handle | Retained tool; never portrayed as fitting the command coupling |
| Installed messenger link | Remains ashore; cannot respawn in inventory |
| Pocket lint | Optional import, optional exhibit, always retained |
| Current observations / witness roster | Notebook records, not a stack of interchangeable paper inventory items |
| Event copy | One new carried document, idempotent grant; original retained in recorder |
| Review finding / public chart / boat agreement | Readable notebook/public documents; final chart may get one clearly distinct inventory badge |
| Provisions / sounding reel | Illustrated boat fittings in epilogue, not new required inventory puzzles |

Preserve existing verbs, object lists, inventory selection and notebook conventions. Essential close-ups expose named buttons. “Inspect source” always performs Look explicitly, clears selected inventory, and shows the resulting observation beside the puzzle. No validation result appears only in an off-screen footer.

## 11. Proposed state model and recovery contract

This section is a design contract, not implemented TypeScript.

### Durable groups

| Group | Proposed fields |
| --- | --- |
| Import | version 5; validated source summary; inherited items and evidence; original revision-1 snapshot |
| World | phase; room; actor locations; boat berth; voyage direction and committed arrival |
| Navigation | inspected pilot sources; current voyage ID; route/transit/observation/clearance; Orin consent |
| Current cover | watch D; revision 2; three observations; named attendants; settings; test/readback tokens; witness token |
| Inspection | dry route, hold indicators, circuit diagram, maintenance provision, emergency interlock inspected |
| Challenge | completed round/source pairs; full transcript; current roster binding for the operational claim |
| Live control | central command connected/isolated; gate power retained; public signal live; three local pilot states; held positions |
| Emergency | assertion recorded; exact claim; source observations; response; resolved or pending |
| Proof | monitored transit clearance; independent exit observation; complete event copy and witness seal |
| Resolution | review finding read; public chart validated/published; work agreement; boat inspected; ending committed |
| Optional | eggExhibitZero; farewell visits; catalogue replay; credits/ending replay preference |

### Authority states

Use a discriminated state, not loosely related booleans:

`CENTRAL → HELD_CENTRAL → ISOLATED_HOLD → INLET_LOCAL_HOLD → LOCAL_SEQUENCE → LOCAL_SERVICE`.

Emergency-check status is orthogonal and blocks progression until resolved. Recovery transitions explicitly reverse engaged pilots under hold before `HELD_CENTRAL → CENTRAL`. Never permit CENTRAL command and an engaged local pilot to issue competing commands simultaneously.

Physical gates retain their held positions during bounded transition phases. These are authored, safe puzzle states, not a simulation that becomes lethal if the player reads slowly.

### Fingerprints and invalidation

- Station fingerprint: attendant + station + watch + revision + observed level + pilot detent + equipment-test generation.
- Combined witness token: all three station fingerprints plus communication-test identity.
- Live step token: combined token + central-isolation identity + required prior physical readbacks.
- Selector edits are allowed only with local pilots disengaged. During live steps offer hold/recovery, not editable fields that silently desynchronise machinery.
- Stale inspection or technical evidence blocks the next affected action with a specific recovery link. Historical evidence, consent and factual duel rounds are not erased.
- Review finding cannot exist before safe passage and the complete event record; public-chart publication cannot silently set live-control success.

### Saves and interruption

Proposed keys: `monkey-buisness-act5-auto` and `monkey-buisness-act5-save`. Preserve all earlier-act slots. Invalid data is backed up only through explicit recovery flow; no invented “repair” that gives the player unearned proof.

Commit each physical step once, before its presentation; save its durable result and pending caption block. Reload resumes the block or its stable result without moving the gate twice. Voyage saves distinguish departure, pending presentation and committed arrival. Ending confirmation writes one completed-game event plus a separate epilogue exploration checkpoint.

Reject saves with duplicated actors, boat on the wrong shore for an active voyage, local pilot active while central commands are connected, muted public signals during changeover, future-step acknowledgements, revision-1 tokens marked current, review without evidence, consumed lint from the egg, or completion without chart/boat agreement.

Debug scope: fresh opening; one coherent fixture for each of the 16 rooms; duel round 3 stale roster; isolated hold; emergency pause; safe local service; review; chart compositor; epilogue departure. Room fixtures must include only their stated prerequisites, not universal completion. Debug runs remain labelled and never count as normal-control walkthroughs.

## 12. Art, animation, audio and accessibility

### Asset brief

| Deliverable | Direction |
| --- | --- |
| Central command background | Grand brass/stone interior, indigo depth, amber display; reachable dry floor and identifiable small controls |
| Bypass background | Human-scale maintenance gallery; glass separation from drive; three differentiated conduits |
| Updated shoal map | Match generated mainland/shoal artwork; central cutaway and actual dry paths; labels separate from clickable UI |
| Current-watch close-up | Station-specific source cards, date/revision and named replies; use live HTML for text |
| Bypass close-up | Command/power/signal separation, holds and return interlock; no deceptive decorative lever |
| Emergency/passage panorama | Three shore lights, shoal and lighter; reusable animated overlays rather than mandatory flashing |
| Review illustration | Public panel and documents; established cast, non-speaking silhouettes |
| Public-chart compositor | Practical chart with uncertainties, not treasure-map ornament |
| Survey boat / end illustration | Modest repaired hull, soundings and provisions; distinct from Second Opinion and Vane's offer |
| Lint exhibit overlay | Tiny silhouette, ornate empty-display border, catalogue card; no fake live machine connection |
| Room badges / loading art | Two new room badges; final-act heading and restrained loading composition |

At art approval, specify walkable polygons/strips per room and align every object rectangle to the actual object. Retain the shared bridge deck clamp on returning rooms. NPC feet, clickable boxes and painted notices require desktop and mobile screenshot review, particularly the landing board and narrow bypass controls.

### Voice and sound scope

Keep all nine established voices. Extract the final approved script into stable `A5-*` block/topic IDs using the same dialogue/audio-manifest conventions as previous acts; do not claim this plan already supplies generated recordings. Budget roughly 250–330 short spoken lines, subject to the complete script extraction, plus readable non-voiced documents.

Sound layers: quiet command-room motor; distinct captive-coupling clunk; three readable station acknowledgements; public double-circle signal; lighter passage/water; restrained resolution music and warm departure reprise. No strobing emergency sequence or rising real-time timer sound. Mute must preserve every clue and sequence boundary.

### Accessibility and feedback

- Keyboard and touch completion; logical close-up focus order and station-qualified select labels.
- Inline focusable `role=status`/live feedback names missing source, wrong revision or physical prerequisite.
- Readable transcript for radio/telephone cutaways, marked REMOTE and naming the location.
- No colour-only wires or lamp states; icon shape, text and pattern always agree.
- Reduced-motion stills retain explicit Continue; dialogue/audio can replay without resetting operations.
- Small screens can scroll evidence without hiding the commit result; no canvas-only document text.
- “Grand finale” means composition, musical payoff and consequence, not a demand for rapid clicking.

## 13. Implementation order and acceptance tests

### Suggested implementation milestones

1. State/import parser, phase graph, separate save/recovery and validated debug fixtures.
2. Returning rooms, checked voyage, generated-map extension and two new room blockouts.
3. Revision-2 readbacks and inspection puzzle with complete invalidation tests.
4. Five-round evidence duel and accessible source cards.
5. Live transition/recovery state machine, emergency interruption and physical indicators.
6. Passage proof, event copy, review time jump and public-chart puzzle.
7. Epilogue, lint exhibit, final departure and credits/checkpoint behaviour.
8. Approved art/voice/sound integration, visual alignment, normal-controls illustrated playbook.

### State and puzzle tests

- Completed Act IV imports exactly, including no-lint saves and installed equipment; incomplete imports cannot masquerade as finished.
- Fresh revision-2 capture invalidates revision-1 technical tokens; same detent does not imply fresh acknowledgement.
- Quay MIDDLE requires B; copying Outer MIDDLE→C is rejected with its own routing source.
- Correct guesses without inspected source records fail visibly; direct Inspect recovers from Take and inventory-use modes.
- Duel accepts only supported reply/source pairs; rejects historical misattribution, blanket fee claims and stale roster.
- Winning the duel changes no live authority by itself.
- Isolation blocks missing holds, wrong circuit and silent signal loss; gate power remains available.
- Local ordering, named physical readbacks and emergency check enforced after reload as well as clicks.
- Every recovery prefix returns to witnessed central hold without dual authority or lost evidence.
- Repeated clicks, presentation skips and reloads cannot duplicate a gate action, voyage, document or charter finding.
- Emergency assertion is retained in the event copy; classification never equates assertion with proved danger or proved deceit.
- Public transit requires current clearance, all local checks and exit observation; no universal OPEN ALL shortcut.
- Chart rejects drifting landmarks, timeless safety promises and omitted uncertainty.
- Charter decision follows an explicit review transition and does not rewrite Act IV or the historic incident.
- Lint egg sets only optional state, preserves inventory, works remotely with one Bram, and is absent without lint without blocking completion.
- Epilogue attendants move only after relief; Orin retains his boat; Fine Print disembarks before Nell leaves.

### Browser, media and continuity tests

- Complete normal-controls run, no injected progression, using both map and object-list controls; repeat key paths keyboard-only and muted/reduced-motion.
- Save/reload during voyage, each duel round, partial readbacks, isolation, emergency hold, recovery, event copy, chart review and ending confirmation.
- Cancel every explicit commit; verify room, actors, boat and authority remain coherent.
- Verify all 16 rooms, locked destinations, real map route segments and absence of walking across the sea.
- Desktop/mobile screenshots for command, bypass, board text, all clickable boxes, local-service panorama and epilogue.
- Complete without any Easter egg or farewell; separately discover and replay lint before and after the finale.
- Test continuing the epilogue and replaying credits without clearing completed-game status or fabricating a return voyage.
- Check all dialogue IDs, voice-manifest coverage, audio decoding, asset paths and cache revisions; production build and whitespace checks.
- Run earlier-act regressions serially; report failures honestly rather than treating a successful Act V run as full-suite success.

### Future playbook

After implementation, capture a fresh normal-controls walkthrough at `/home/keuper/Projekte/MonkeyBusiness/playbook/Act-V/PLAYBOOK.md`. Include the changed revision, every handover stage, emergency classification, a safe recovery example, full event-copy choice, actual review transition, public chart and final boat departure. Document the optional lint discovery separately in `/home/keuper/Projekte/MonkeyBusiness/playbook/EasterEggs.md`.

This plan is not a walkthrough, and its proposed illustrations are not evidence that the final act exists.

## 14. Decisions this draft makes

- The final confrontation is an evidence duel with a physical aftermath, not insults that magically disable machinery.
- A single changed observation at the quay tests understanding without discarding Act IV's preparation.
- Emergency authority is publicly accountable; warnings are kept open rather than sabotaged.
- Governance changes through an explicit later review; immediate safety comes from the already-inspected maintenance procedure.
- Nell publishes useful limits as well as routes, earns her boat through work, and leaves without becoming the harbour's indispensable new ruler.
- All nine existing speakers receive a payoff; no late antagonist, hidden treasure crown or new voiced magistrate resolves the story.
- Pocket lint earns an absurd catalogue entry, not control of the sea.
- The fifth act completes the story: the harbour remains imperfect, but its people have the information and responsibility to argue on fairer terms.