# Monkey Buisness — Act II Room, Dialogue and Puzzle Plan

> **Draft 0.1 · 20 October 2026 · Editable design proposal**
>
> Companion to [STORY_PLAN.md](STORY_PLAN.md), [ACT_1_ROOM_PLAN.md](ACT_1_ROOM_PLAN.md), and the [concept map](../public/assets/story-map.png).
>
> This is a proposed script and playable design, not an implemented chapter. New room names, objects and dialogue are editable. Dialogue below is original. Quoted text is proposed in-game text, not a quotation from another game.
>
> **Continuity priority:** This plan follows the current game where it differs from the older Act I document: the chest stays open with its key in the lock; Nell separately collects the survey; she takes the boathook from above the tavern fireplace and keeps it; the current indicator remains attached to a knob on the landing post; the company launch starts in the water and sails away.

## 1. Act contract

**Title:** Respectable Nonsense.

**Nell's practical goal:** Explain the coordinated channel changes and secure a vessel capable of reaching Bellweather Shoal.

**Emotional movement:** An unknown observer becomes a paid surveyor, then discovers that recognition is not the same thing as trust.

**Opening question:** “Who knew the water would turn?”

**Closing fact:** Vane uses Nell's measurements to complete a local routing system and announces compulsory passage contracts. Nell decides to tell Mara exactly what she handed over.

**Scope proposal:** Six new backgrounds, three reused rooms, four new puzzle close-ups, and a reusable notebook evidence board. Three new speaking characters: Pip, Rook and Vane. Existing voices return. Aim for 60–90 minutes of exploratory play; validate this target in playtests.

**Required outcomes:**

- Separate reported observations from sensational explanations.
- Trace the signal equipment to the Rook workshop.
- Understand one small example of independent controls working better than a single overloaded controller.
- Locate and recover Orin's ship through a safe inspection procedure.
- Measure the previously overlooked service channel.
- Explicitly authorise handing Vane an annotated copy, while retaining the original survey.
- See physical evidence that the company used Nell's work.

**Do not reveal yet:** Mara's former role, the relief-boat incident, Bram, the central station's full operating record, or the exact emergency override procedure. Rook can explain local hardware and family authorship without supplying the finale's solution.

### Starting inventory and world

| Carried forward | Act II use |
| --- | --- |
| Notebook, pencil | Record reports, trace a maker's plate, annotate a working copy |
| Pocket lint | Optional household joke; never a required filter or consumable |
| Old survey | Compare the service inlet and identify fixed survey marks; never surrendered |
| Boathook | Retrieve the inlet's messenger line and berth Orin's ship |
| Act I observation log | Baseline for the newspaper evidence puzzle and Vane's commission |
| Permanent bridge passage | All return trips remain free; no mandatory rematch |

The tankard is with Mara. The chest key stays in its lock. The practice sword remains at the crossing. The float stays in the water. Nell has no unexplained money, boat or official authority.

Older saves with a freed indicator but no hook inventory should migrate to `hookTaken=true`, as the current game does. Do not place a second boathook at the landing.

## 2. Room graph and investigation order

| ID | Room | Entry and purpose | Exits |
| --- | --- | --- | --- |
| A2-01 | Repair Quay | Opens from the landing after Act I; common investigation hub and supply point | Landing, newspaper, Rook house, inlet, company office |
| A2-02 | The Quay Quill | Public newspaper office; optional guided evidence analysis | Repair Quay |
| A2-03 | Rook House — Breakfast Hall | Accessible immediately; malfunction reveals a control problem | Repair Quay, workshop after household fix |
| A2-04 | Rook House — Workshop | Rook's hardware explanation, inspection tools and service drawing | Breakfast Hall |
| A2-05 | Blind Inlet | Old quay path is always walkable; barrier hides vessel until inspection | Repair Quay; recovered vessel is an inspection close-up |
| A2-06 | Fair Passage Survey Office | Public enquiry room; Vane meeting after invitation | Repair Quay |
| A1-01 | The Crooked Compass | Mara's grounding advice; Orin's ownership details and later departure | Crossing, existing map connections |
| A1-02 | Quibble's Crossing | Optional contract interpretation; passage remains open | Tavern, landing |
| A1-03 | Outer Landing | Original evidence remains replayable; entrance to wider harbour | Crossing, Repair Quay |

All destinations occupy the existing harbour's newspaper, repair-yard and town areas. Rook House is a proposed town interior, not a new island. The inlet runs behind the yards. Place the office at the quay's public end. Adjust labels on the concept map during implementation; do not imply these precise buildings were already specified by the illustration.

**Travel presentation:** Red routes follow the quay, town lane and yard walkway. House-to-workshop is a doorway transition, not an island-map journey. Stop both speech and captions before leaving a room. Unlock destination badges through discovery; never show an inaccessible destination as a working travel button.

### Dependency graph

```text
Act I complete → Repair Quay and all public approaches

Act I timeline + public witness reports → verified local timeline
                   └── Pip helps, or Nell uses the public report board

Repair Quay maker's plate → Rook attribution
Breakfast Hall local-control puzzle → workshop access
Rook attribution + workshop access → service drawing + inspection crank

Orin's vessel description + inlet inspection → ship identified
service drawing + crank → safe inspection → barrier opened
boat identification + open barrier + messenger line + borrowed mooring rope
    → Orin moves vessel to safe berth → boat recovered

service drawing + old survey + inlet's fixed marks + still-water reading
    → service channel measured

any two of [verified timeline, Rook attribution, ship identified]
    → Vane introduces herself at next Repair Quay arrival

verified timeline + service measurement + boat recovered + invitation
    → prepare annotated COPY → explicit Vane handover
    → company announcement → compare published route to retained copy
    → choose to tell Mara → ACT II COMPLETE
```

The leads can be started in any order, but they converge through useful knowledge. They are not three unrelated entrance tests. Recovering the ship requires Rook's safe operating instructions; investigating it does not. Pip's room is optional: the same raw reports and evidence board exist at the Repair Quay. Visiting Pip changes dialogue and the later ally relationship, not whether the story can finish.

## 3. Interaction and script conventions

- Each numbered dialogue block has a stable production ID. Table IDs such as `PIP-02` use the implicit prefix `A2-` (thus `A2-PIP-02`). Hotspot lines export as `A2-[room ID]-[hotspot]-[verb]`, and shared fallbacks as `A2-FALLBACK-[situation]`. Each speaker turn receives a suffix in reading order during export, e.g. `A2-PIP-01a`. These IDs also identify caption, voice and localisation entries.
- A menu topic is the exact clickable Nell line. Play its response, then return to the topic menu. Essential topics remain available until their information is recorded; afterwards their short repeat is used.
- First-entry conversations run once. They are skippable into a readable transcript; skipping records the same facts, never unperformed physical actions.
- Mechanical labels and printed documents are on-screen text. Silent machines do not add cast members.
- Every object below has a Look line and an interaction result. Unlisted combinations use the contextual fallbacks in §12; there is no requirement to script every item × object pair separately.
- Wrong answers preserve progress. There are no deaths, timed clicks, hidden monetary fees or consumable softlocks.
- Topic order is free unless a condition is explicitly stated. “Later” always leaves a story decision pending.

## 4. A2-01 — Repair Quay

### Layout and occupants

Warm workshop lamps on the left, open water behind the yard, a communal repair bench in the foreground. A decommissioned company signal housing sits on the bench with its manufacturer's plate visible at normal zoom. A public report board and free stationery drawer share a sheltered wall. A rope locker stands beside the inlet path.

Nell is initially alone; background workers are silent silhouettes. Vane appears here for her introduction only. Orin can pass through during the recovery cutscene, but is not duplicated in multiple rooms.

### Hotspots and objects

| Object | Look line, spoken by Nell | Interaction and state |
| --- | --- | --- |
| Signal housing | “Three lamp shutters, one bell striker. The haunting has screws.” | Open its already-unlatched inspection flap; reveals maker's plate. No tool required |
| Maker's plate | “T. ROOK & FAMILY. LOCAL CHANNEL RELAY 7. TOWN LANE WORKSHOP. Not ‘Lord of All Oceans.’” | Inspect records attribution and Rook address; pencil + notebook makes a retained tracing |
| Public report board | “Witness statements. The useful bits have survived the handwriting.” | Opens the same evidence board as Pip's puzzle |
| Stationery drawer | “Courtesy paper. A rare form of paper that doesn't want something.” | Take one tracing sheet; unlimited replacement before committed handover, no duplicate inventory stacks |
| Rope locker | “Public mooring line. Return it attached to something that ought to stay put.” | Take a coil; later becomes the recovered vessel's berth line |
| Inspection notice | “Public inspection access must remain operable during trials.” | Records a maintenance right; does not grant authority over every company installation |
| Inlet sign | “OLD SERVICE INLET. CLOSED TO THROUGH TRAFFIC. It says nothing about looking.” | Walk to A2-05 |
| Office sign | “FAIR PASSAGE: CERTAINTY, BY ARRANGEMENT.” | Walk to A2-06 public enquiry room |

**Pickup lines:**

- `A2-YARD-01` — Nell: “One sheet. I intend to make a small, precise mess.”
- `A2-YARD-02` — Nell: “A rope with a purpose. This puts it ahead of several committees.”
- `A2-YARD-03` — Nell, after tracing plate: “Rook's name, the relay number, and an address. A clue with excellent manners.”
- `A2-YARD-04` — Nell, opening flap: “Inspection flap. The thrilling alternative to breaking it.”

The plate tracing is knowledge in the notebook, not a destructively removed metal plate. A player who only reads it has the same essential clue.

### Public reports: exact text

These are duplicates of Pip's source cards, supplied by named but non-speaking witnesses. No off-screen investigation is assumed.

| Card | Printed statement | Stable ordering clue |
| --- | --- | --- |
| Net-mender | “I had just put down the ebb marker when the buoy flashed three times.” | Establishes tide-board context and first event |
| Lantern tender | “The lamp flashed. The far bell answered. Then I heard the same bell through the return pipe.” | Separates original signal from a delayed echo |
| Ferry clerk | “My loose line swung east after the first bell, before the blue company launch left its waiting place.” | Orders current change before departure |
| Fish seller | “I saw the blue launch moving east. I did not see who rang the bell.” | Confirms vessel movement, not operator identity |
| Anonymous margin | “The lighthouse predicted yesterday. My cousin has the receipt.” | Unsupported interpretation; not a usable observation |

### Puzzle P2-01 — An event, not a headline

**Input:** Act I observation log plus report cards. **Interface:** Three labelled timeline slots and one claim selection. No dragging required.

**Correct ordering:** Signal → local current changes → company launch departs.

**Supported claim:** “The company launch was ready for a signalled local change.”

**Alternatives and exact responses:**

- “The bell caused the tide everywhere.” → Nell: “We have one channel and a sequence. Neither is an entire ocean.”
- “The lighthouse saw the future.” → Nell: “A returning sound is late, not prophetic.”
- “Every witness saw the operator.” → Nell: “They saw effects. Nobody here identifies the person at the controls.”
- Wrong order → Nell: “The ferry clerk puts the line's movement between the bell and the boat. Let's keep that order.”

**Success, `A2-YARD-05`:** Nell: “Different witnesses. The same order. Enough to investigate; not enough to accuse everyone with a bell.”

Sets `timeline_verified`. All cards stay readable. If solved with Pip, his dialogue replaces the success line, but the result is identical.

**Hint ladder:** Highlight the clerk's words → mark “after” and “before” → offer the correct three-step sequence for confirmation.

### Vane's midpoint introduction

Trigger at the next arrival after any two investigation facts, not in the middle of a puzzle. If Nell stays in another room, a notebook invitation appears; the meeting remains at the quay. Do not strand her away from Vane.

`A2-VANE-01`, automatic:

> **Vane:** “Nell? Your drawing distinguishes a current from a rumour. That is rarer than you might think.”
>
> **Nell:** “You read my notes?”
>
> **Vane:** “The public account. I would like to pay for a more complete survey.”
>
> **Nell:** “Of the channel, or of how much I know?”
>
> **Vane:** “The first. The second appears to be increasing without my assistance.”

| Nell's topic | Vane's complete response |
| --- | --- |
| “Are you changing the currents?” | “We are testing restored local routing equipment. The shoal is dangerous. Leaving old machinery unexplained does not make it harmless.” |
| “Why does your boat know first?” | “Because I will not send a crew into a trial without a signal. That is a safety practice, not an apology for the trial.” |
| “Who authorised the tests?” | “The harbour's provisional works licence. Public inspection remains permitted. You may examine the posted conditions.” |
| “What would you actually pay me to do?” | “Check the old service channel against present fixed marks. Supply an annotated working copy. Your name and fee will be written into the commission.” |
| “I need to finish investigating.” | “Then finish. I prefer an accurate answer to an eager one. My survey office is at the quay.” |

`A2-VANE-02`, departure:

> **Vane:** “Bring measurements, Miss Nell. I have cupboards full of assurances.”
>
> **Nell:** “For once, a qualification I possess.”

Sets `vane_invited`; adds the written offer. No chart is transferred here. Vane leaves for the office. If three facts are already complete, the same scene plays without pretending the offer was earlier.

## 5. A2-02 — The Quay Quill

### Layout and character

A tiny print shop: press at rear, proof table in the centre, delivery hatch left, overflowing report pigeonholes right. The public door stays open. Pip Quill wears ink on one cuff and keeps trying to wipe it with the other.

**Pip's voice:** Fast and delighted by a story, but willing to correct one. His private need is to be believed. Do not make him knowingly fabricate the essential evidence.

### First entry — `A2-PIP-01`

> **Pip:** “Welcome to the Quay Quill. Are you news, a correction, or here about the roof?”
>
> **Nell:** “The water changed direction after a company signal.”
>
> **Pip:** “News. Possibly a correction to several things I printed about the water.”
>
> **Nell:** “Can I see the original reports?”
>
> **Pip:** “Certainly. The facts are underneath the adjectives.”

### Conversation menu

| ID | Nell's exact topic | Response and effect |
| --- | --- | --- |
| PIP-02 | “Who actually saw the current change?” | **Pip:** “The ferry clerk saw her loose line turn. The fish seller saw the launch. The lantern tender heard two bells. None saw a ghost, which has inconvenienced my layout.” Opens source cards |
| PIP-03 | “Two bells?” | **Pip:** “One outside, one from the old return pipe. I called it an answer.” **Nell:** “To what question?” **Pip:** “That was going to be tomorrow's edition.” |
| PIP-04 | “Your headline says the lighthouse predicts yesterday.” | **Pip:** “An exclusive.” **Nell:** “Yesterday is unusually well covered.” **Pip:** “Yes. Competition has been brutal.” Optional homage |
| PIP-05 | “Do you know the name Rook?” | **Pip:** “Town lane, house with the weather vane that argues with the wind. Dr. Rook builds mechanisms. Her family built reasons not to discuss them.” Marks house location, not maker attribution |
| PIP-06 | “Orin's ship is missing.” | **Pip:** “Then I owe him a correction. I printed that it had retired.” **Nell:** “Did anyone see it?” **Pip:** “A striped cabin behind the old yard screen. The witness could not see a name.” Adds inlet lead, not identification |
| PIP-07 | “Will you print what I find?” | **Pip:** “If I can show readers how you know it.” **Nell:** “Even if it's less exciting?” **Pip:** “I have a very large typeface. I can make accuracy look alarming.” Sets optional `pip_partner` |
| PIP-08 | “I need tracing paper.” | **Pip:** “The clean tray. Same public supply as the quay. Please don't take a headline; they're still wet.” Offers sheet if absent |
| PIP-09 | “Back to the harbour.” | **Pip:** “Bring facts. I can provide the exclamation marks.” Ends conversation |

**Repeat after timeline verification, `A2-PIP-10`:**

> **Pip:** “Signal, current, launch. Three facts in order. I've had shorter careers in journalism.”

If Nell solved it elsewhere, first show:

> **Nell:** “I compared the reports at the quay.”
>
> **Pip:** “Excellent. I shall describe this as our distributed newsroom.”

### Objects and optional interaction

| Hotspot | Look | Use / Take |
| --- | --- | --- |
| Source pigeonholes | Nell: “Each pigeonhole contains evidence. The pigeons appear to have escaped questioning.” | Opens source cards |
| Proof table | Nell: “A place to check a sentence before it becomes everybody's problem.” | Opens P2-01; after success, displays corrected proof |
| Paper tray | Nell: “One clean sheet amid a forest of accusations.” | Same shared sheet pickup as quay; no duplication |
| Press | Nell: “A machine for making a small error very widely available.” | Pip: “Let me operate that. It took years to acquire this particular distribution of fingers.” |
| Front page | Nell: “LIGHTHOUSE PREDICTS YESTERDAY. At least it can check its work.” | Optional joke below |
| Return pipe diagram | Nell: “The bell goes out. The sound comes back. Nobody consulted tomorrow.” | Adds nonessential explanation of echo |

**Optional situational Zak McKracken homage, `A2-PIP-EGG`:** Use pencil on the front-page proof.

> **Nell:** “I'll change ‘predicts’ to ‘repeats.’”
>
> **Pip:** “You have reduced a supernatural exclusive to a plumbing complaint.”
>
> **Nell:** “Now people can fix it.”
>
> **Pip:** “A dangerous precedent for a newspaper.”

The corrected proof reads **LIGHTHOUSE REPEATS YESTERDAY'S SIGNAL**. No franchise knowledge, item reward or progression depends on this. Repeat: Pip says, “The pipe has declined an interview.”

### Puzzle success with Pip — `A2-PIP-11`

> **Nell:** “The signal comes first. The clerk's line turns. Then the waiting launch moves.”
>
> **Pip:** “So our reliable claim is that somebody was prepared.”
>
> **Nell:** “Yes. Not that the sea joined the company.”
>
> **Pip:** “I will reluctantly withdraw its employee portrait.”

## 6. A2-03 — Rook House: Breakfast Hall

### Layout and state

An elaborate dining hall with a brass household controller, speaking tubes, a table on rails and three empty chairs. Rook stands beyond a service hatch, trying to prevent a teapot from becoming a projectile. Workshop door is closed because its access rail is occupied by the stuck serving trolley—not because Rook demands a quest payment.

No stolen household possessions are required. The table, chairs and controller are silent. Their requests appear on mechanical cards with readable labels and diagrams.

### First entry — `A2-ROOK-01`

> **Rook:** “Don't sit down. The table has not approved the chairs.”
>
> **Nell:** “Are the chairs applying separately?”
>
> **Rook:** “That is precisely the sort of question this house encourages.”
>
> **Nell:** “I'm following a signal relay with your family's name on it.”
>
> **Rook:** “Then you have found a second system I would prefer to discuss while it is not boiling.”

If Nell has not read the plate, substitute her third line with “I was told you understand the harbour machinery.” No attribution flag is awarded by the substitute.

### Conversation menu

| ID | Nell's topic | Rook's response |
| --- | --- | --- |
| ROOK-02 | “What is breakfast waiting for?” | “The heater waits for the serving bell. The bell waits for the table. The table waits for the heater to finish. My grandfather called this perfect supervision.” |
| ROOK-03 | “Why not turn the whole thing off?” | “The trolley brake releases under local control. Kill the supply and it stays across the workshop door, celebrating its final decision.” |
| ROOK-04 | “Could each part do its own job?” | “Yes. The labels explain how. I have been rather busy preventing the tea from entering a new state of matter.” |
| ROOK-05 | “Can I help?” | “Keep the heater warm, park the table, put the bell on hand control. Then release the trolley. In that order, if you value the cups.” Reveals explicit hint; not required before solving |
| ROOK-06 | “Does the harbour work like your breakfast?” | “Not literally. I have never charged a ship for marmalade. Finish here and I will show you the distinction.” |
| ROOK-07 | “I'll look at the controls.” | “Read the little words. My family spent generations engraving them and minutes following them.” |

### Hotspot lines

| Object | Look, spoken by Nell | Interaction |
| --- | --- | --- |
| Controller | “Three departments. Each waiting for a permission slip from the next.” | Opens household close-up |
| Heater | “KEEP WARM has a reassuringly modest ambition.” | Selector: BOIL / KEEP WARM / OFF |
| Table rail | “PARK HERE BEFORE RELEASING TROLLEY. The furniture is better instructed than most crews.” | Selector: SERVE / PARK |
| Bell | “AUTO: wait for table. HAND: ring when needed.” | Selector: AUTO / HAND |
| Trolley release | “Only after the table is parked. Even the button sounds worried.” | Attempts final release |
| Three chair cards | “RESERVED FOR OCCUPANT. OCCUPANT AWAITING RESERVATION.” | Optional joke only |
| Refuse sorter | “CELESTIAL REFUSE SORTER. It has classified a potato peel as a minor moon.” | Lint joke below |
| Workshop door | “The trolley blocks it. The lock is innocent.” | Before solution: Rook points to PARK; after: enters workshop |

### Puzzle P2-02 — Stop asking breakfast for permission

**Goal:** Put the overloaded household into safe local control.

**Solution:** Heater → KEEP WARM; table → PARK; bell → HAND; press RELEASE TROLLEY. Selectors may be set in any order. Only the final release checks the full configuration; no damage occurs from exploring settings.

**Why it is more than a password:** The player follows each dependency, then lets the heater maintain safe heat, the table occupy a safe location and a human decide when to ring. The repair removes the circular wait rather than feeding it another command.

**Failure feedback:**

- BOIL selected at release: Rook: “Warm is enough. Breakfast needn't achieve propulsion.”
- OFF selected: Rook: “The brake needs power. Keep warm; don't kill the supply.”
- Table not parked: Nell: “The trolley's exit is occupied by the thing requesting its arrival.”
- Bell still AUTO: Nell: “The bell is still waiting for a committee that includes the bell.”

No selectors reset after a failed attempt. The close-up lists unmet conditions explicitly.

**Success, `A2-ROOK-08`:**

> **Nell:** “Warm tea. Parked table. Bell waiting for a person. Astonishingly ordinary.”
>
> **Rook:** “You have removed the management structure.”
>
> **Nell:** “It was obstructing the door.”
>
> **Rook:** “Come into the workshop.”

Sets `house_local`; opens workshop permanently. Trolley moves safely onto its siding. Rook relocates into the workshop; the hall keeps her short written control labels, not a duplicate Rook sprite.

**Optional Maniac Mansion-style household joke, `A2-ROOK-EGG`:** Inspect chair cards after repair.

> **Nell:** “The house is working. Are we allowed to sit?”
>
> **Rook:** “The chairs have formed a waiting list.”
>
> **Nell:** “At least they've found a standing arrangement.”

**Lint interaction:**

> **Nell:** “What does it make of pocket lint?”
>
> **Rook:** “An unlicensed nebula. Please keep it. The sorter charges by constellation.”

Lint remains in the pocket. Repeat: Nell says, “My nebula and I are just passing through.”

## 7. A2-04 — Rook House: Workshop

### Layout

A readable bench of relay components, a tabletop model of three local channels, family drawings stored vertically, and an inspection crank hanging beside a maintenance card. The model is demonstrative: it cannot operate the real harbour.

### First workshop conversation — `A2-ROOK-09`

> **Rook:** “My family made local routing gear. Gates, relays, things that should be boring when they work.”
>
> **Nell:** “The company signals before the current turns.”
>
> **Rook:** “Then someone has put part of the network back into service.”
>
> **Nell:** “Can it control the tide?”
>
> **Rook:** “It can redirect water through connected channels. The moon remains regrettably independent.”

### Topics and conditional responses

| ID | Nell's topic | Response and effect |
| --- | --- | --- |
| ROOK-10 | “Is this your relay?” | With attribution: **Rook:** “Our pattern, replacement shutters. This number belongs to the repair-yard service inlet. Here is its drawing.” Gives service drawing. Without attribution: **Rook:** “Bring a maker's name and relay number. The retired housing on the quay should still have its plate.” |
| ROOK-11 | “Why did nobody mention the service channel?” | “It was for inspections, not through traffic. Commercial charts stopped printing it. Water is less attentive to revised editions.” |
| ROOK-12 | “How do I inspect the barrier safely?” | “Set the inlet to INSPECT. Open the equalising valve. Wait for the two marked levels to agree. Then turn the local crank. The interlock prevents you doing the dangerous version.” Gives illustrated procedure with drawing |
| ROOK-13 | “Can I borrow that crank?” | After drawing: “Yes. It only fits this inspection socket. Please return it to its bracket when the barrier is latched.” Gives crank once. Before drawing: “Let me identify the mechanism first. ‘Approximately the right crank’ is a dangerous engineering tradition.” |
| ROOK-14 | “Can a local station disagree with the central controls?” | “For inspection, yes. Larger coordination is another matter. This drawing covers one barrier, not the whole network.” Seeds later rules without solving them |
| ROOK-15 | “Why are you reluctant to discuss your family?” | “We put our name on systems before we understood everyone who would depend on them.” **Nell:** “And now?” **Rook:** “Now I read the little words.” |
| ROOK-16 | “Vane offered to pay for my measurements.” | Only after invitation: “Accurate measurements are useful. Ask what permission travels with them.” **Nell:** “Could she use them to make it safer?” **Rook:** “Yes. That is why the question matters.” |
| ROOK-17 | “I freed the ship.” | After recovery: “Then the inspection route did its job. Leave the barrier in its marked safe position.” |
| ROOK-18 | “I should get back to the quay.” | “If a mechanism surprises you, stop turning it. An unpopular but serviceable rule.” |

**Repeat after drawing obtained:** “Your notebook has the inlet drawing and the four inspection steps. They do not improve when shouted.”

### Hotspots and model puzzle

| Object | Look, spoken by Nell | Use / Take |
| --- | --- | --- |
| Channel model | “Three channels, linked gates, one basin. A sea small enough to contradict politely.” | Optional demonstration: choose a gate and watch water change only in its connected branch |
| Drawing rack | “SERVICE INLET 7. Fixed marks: square drain; split granite pillar.” | Opens document after identification; duplicates never spawn |
| Inspection crank | “Square socket. Long handle. A respectable way to disagree with a gate.” | Borrow through ROOK-13; not theft |
| Family portrait | “Several generations looking certain about progressively larger machines.” | Rook: “Please don't ask which one invented breakfast.” |
| Model's central lever | “One lever requests changes. It does not make every channel identical.” | Rook: “Observe what moves. Then observe what doesn't.” |

**No mandatory second workshop puzzle.** The household fix already earned access; the model teaches a rule rather than padding the act with another lock.

**Drawing text:**

> SERVICE INLET 7 — PUBLIC INSPECTION ACCESS.
> 1. Select INSPECT; through traffic remains isolated.
> 2. Open EQUALISE until both level marks align.
> 3. Fit inspection crank; open service barrier.
> 4. Latch OPEN; secure vessel before boarding.
> Fixed survey marks: square drain / split granite pillar.
> Remove crank to bracket after latching. Never force the interlock.

## 8. A2-05 — Blind Inlet

### Layout and persistent states

A safe walkway runs along a yard wall. A tall movable timber barrier screens a small basin. Through a sighting slit, the player can see a striped cabin and part of a weather vane. Beside the walkway are the selector, level gauge, equalising valve and crank socket. A capped local inspection bracket accepts the crank when finished.

After opening, reveal Orin's modest coastal cutter, **Second Opinion** (proposed original name), floating in the basin. A messenger line trails beside the quay, well within boathook range. The stern is too far away to reach by hand. A wider berth beyond the barrier is represented within the same background.

Opening does not change the tide across the harbour. It equalises and opens one service basin. Nobody swims, climbs an unsafe wall, cuts a live cable or jumps between boats.

### First look — `A2-INLET-01`

> **Nell:** “A striped cabin behind a movable wall. Either Orin's ship is here, or architecture has taken up sailing.”

### Hotspots

| Object | Look line, spoken by Nell | Use / other result |
| --- | --- | --- |
| Sighting slit | “Cream cabin. Three blue stripes. A copper kettle where the weather vane should be.” | With Orin's description, sets `ship_identified`; otherwise records details for later matching |
| Barrier | “A screen on runners. It hides the basin; it hasn't swallowed it.” | Push: “The wheel is connected to a mechanism. My shoulders are connected to complaints.” |
| Selector | “RUN or INSPECT. I would like the setting that expects questions.” | Opens inspection close-up |
| Level gauge | “Two columns, two marked levels. Equal means matching, not close enough.” | Read available at all times |
| Equalising valve | “A small valve before a large movement. Someone expected people to read the order.” | In RUN: interlock refuses; in INSPECT: equalises |
| Crank socket | “An inspection socket, not a keyhole.” | Crank only; reject pencil, hook and lint safely |
| Messenger line | “The thin line brings the heavy rope aboard. A small job with a sensible ambition.” | After barrier opens: retrieve with boathook |
| Berth bollard | “Sound timber. No theatrical opinions about ownership.” | Attach public mooring rope after messenger line retrieved |
| Square drain | “Square drain, at the waterline. A fixed mark that doesn't mind getting wet.” | Records first survey mark |
| Split granite pillar | “That crack appears on the old drawing. Stone has been keeping notes.” | Records second survey mark |
| Still-water staff | “The basin is calm now. I can read an actual level instead of an argument.” | Read after equalisation; before: “Let the two levels settle first.” |
| Second Opinion | “Three stripes, copper kettle, and an owner who owes it an apology.” | Before safe berth: no boarding; after: ship close-up and Orin conversation |

### Puzzle P2-03 — The ship that followed instructions

**Identification prerequisite:** Ask Orin for the distinctive marks OR inspect first, then report them. Both orders work. A nameplate alone is not needed; it is hidden until opening.

**Safe opening:** Apply the service drawing to the control panel. Set INSPECT → open EQUALISE → wait for “LEVELS MATCH” → fit crank and turn → latch OPEN.

The settling animation lasts about two seconds, with an immediate text/reduced-motion option. It is not a tide timer. Leaving and returning preserves matched levels. Turning too soon cannot damage anything.

**Feedback, `A2-INLET-02` family:**

- No drawing: Nell: “I need the instructions for this barrier. The relay number should lead to them.”
- RUN still selected: Nell: “The inspection socket is locked while the system is in RUN.”
- Unequal levels: Nell: “The interlock is right. Both marks need to agree before this moves.”
- Wrong tool: Nell: “The socket wants the inspection crank. A determined pencil would only become two pencils.”
- Crank without permission: Nell: “Rook can lend me the proper tool once she identifies this mechanism.”
- Exit before latching: Nell: “I'll latch the barrier before stepping away.” Automatically completes the already-enabled safe latch, not other unfinished steps.

**Opening scene, `A2-INLET-03`:**

> **Nell:** “Second Opinion. Present, afloat, and making a strong case against ‘vanished.’”

Sets `barrier_open`. Crank moves into its fixed return bracket, fulfilling Rook's instruction. It is no longer loose inventory and is available locally for inspection replay without duplicating rewards.

### Puzzle P2-04 — Bring the boat to the person

**Goal:** Secure the vessel at the safe outer berth so Orin can sail it later.

**Solution:** Use boathook on messenger line; use public mooring rope on the retrieved loop; secure the free end to the berth bollard; choose **“Ask Orin to bring her alongside.”** Nell walks to the tavern if Orin has not been told; the request is an explicit conversation action, not an ally solving an unvisited puzzle off-screen.

All physical preparations can be made before telling Orin. If Orin was already informed, he waits at the inlet only after the barrier is safely latched open. His tavern seat becomes empty, with a location note in the notebook. Never duplicate him.

**Exact responses:**

- Bare-hand line retrieval: Nell: “A little farther than an arm. Fortunately, I borrowed a longer argument.”
- Boathook before barrier opens: Nell: “The wall has won the reach contest. Open it first.”
- No rope: Nell: “The messenger line isn't strong enough to moor her. There's proper rope in the quay locker.”
- Boarding before moored: Orin, if present: “Boat first, person second. I am revising my order of operations.” Otherwise Nell: “Secure her before boarding.”
- Correct hook use: Nell: “Got it. The small line can carry the big idea.”
- Correct rope use: Nell: “A sound line to a sound post. Refreshingly little philosophy.”

**Recovery scene, `A2-ORIN-RECOVER`:**

> **Orin:** “I followed the new marker. It led straight into the service inlet.”
>
> **Nell:** “And when the barrier closed?”
>
> **Orin:** “I called it fog. I was standing on land at the time.”
>
> **Nell:** “The marker was wrong for your journey. You can say that without claiming the ship evaporated.”
>
> **Orin:** “I trusted the sign over what I knew. There. An unpleasantly navigable sentence.”
>
> **Nell:** “Can she reach Bellweather Shoal?”
>
> **Orin:** “With a current survey and someone willing to question the navigator.”
>
> **Nell:** “I have been practising.”

Orin visibly takes the prepared line and moves the vessel through the open barrier to the berth. Start and end positions remain in water. Rope tightens naturally around the bollard; do not draw it through the dock. Sets `boat_recovered`; unlocks a future voyage, not immediate Act III departure.

### Puzzle P2-05 — Measure what the old chart omitted

Available after equalisation and workshop drawing; does not require Orin to have arrived.

Use old survey at the fixed-mark viewing notch. Choose **square drain** and **split granite pillar**, then select the staff's **middle marked line**. All labels appear both on the scene and the close-up. The staff has three clearly named marks; no pixel reading or colour matching is required.

The notebook combines the two fixed bearings with the recorded still-water level to complete a missing local cross-section. Do not imply a single depth reading surveys an entire harbour: this supplies the final check on Rook's existing service drawing.

**Wrong choices:**

- Ship's mast: “That mark leaves when the boat does.”
- Company buoy: “A floating witness is not a fixed reference.”
- Unmatched level: “Read the staff after equalisation. The actual mark is shown beside this choice.”

**Success, `A2-INLET-04`:**

> **Nell:** “The drain and pillar agree with the old drawing. The basin gives me the missing level.”
>
> **Nell:** “A short service channel. A small correction. I can finally put my name beside something useful.”

Sets `service_measured`. Keep a dated notebook entry of exactly which marks and level were used. This is the measurement Vane needs; recovering the vessel alone does not supply it.

## 9. Returning cast and reused rooms

These are the complete new Act II topics for existing characters. Act I topics remain available as archival conversation but grant no duplicate rewards. Before the company announcement, Mara does not confess her history.

### Mara — tavern

| ID | Nell's topic | Response |
| --- | --- | --- |
| MARA-01 | “I'm following the signal equipment.” | “Then find who made it, who uses it, and who says those are the same person.” |
| MARA-02 | “I borrowed your boathook.” | “Bring it back when it has finished being useful. It was wasted on the wall.” |
| MARA-03 | “Vane says my work is worth paying for.” | “It is. That doesn't tell you what she wants to buy.” |
| MARA-04 | “Should I take the commission?” | “Read it. Keep your original. Ask what happens to the copy. The choice is yours.” |
| MARA-05 | “I found Orin's ship.” | “Good. Perhaps he'll stop using my tables to demonstrate where it isn't.” |
| MARA-06 | “Do you know anything about the old gates?” | “Enough to know their drawings deserve care. Bring me what you can actually establish.” No new factual flag |
| MARA-07 | “I'll keep looking.” | “Eat something before you decide the fate of the harbour.” |

### Orin — tavern before recovery

`A2-ORIN-01`, required topic “Describe your ship without describing your feelings.”

> **Orin:** “Second Opinion. Cream cabin, three blue stripes, copper kettle for a weather vane.”
>
> **Nell:** “A kettle?”
>
> **Orin:** “It always points away from the weather. Better judgement than several instruments.”
>
> **Nell:** “Where did you last see her?”
>
> **Orin:** “By the new arrow behind the repair yards. I stepped ashore. When I returned, a timber screen occupied the view.”

Sets `ship_description`; matches an already-recorded inlet sketch automatically.

| ID | Nell's topic | Response |
| --- | --- | --- |
| ORIN-02 | “Why didn't you look behind the screen?” | “The notice said CLOSED CHANNEL. I interpreted it rather completely.” |
| ORIN-03 | “I saw the stripes and the kettle.” | “Then she is there.” **Nell:** “You sound surprised.” **Orin:** “Relieved. I have been performing surprise to avoid that.” Sets identification if physical details were inspected |
| ORIN-04 | “Come to the inlet.” | Before open barrier: “Open the inspection access safely first. I can wait without making another navigational decision.” After open barrier: “I'll meet you there. Bring a proper mooring line.” Relocates Orin |
| ORIN-05 | “Any advice on the old survey?” | “Trust fixed marks. Correct what you can measure. Leave a clear note where you can't.” |

### Orin — recovered vessel

- `A2-ORIN-06` — “Can we leave now?” → “She is ready. Finish your business ashore and speak to Mara. I will check the rigging; no voyage improves because someone skipped that.”
- `A2-ORIN-07` — “Do you mind if I question your route?” → “I have named the ship Second Opinion. It would be poor seamanship to object.”
- `A2-ORIN-08` — “What did we prove?” → “That the new marker diverted me, and a barrier hid the vessel. Not who gave the order. Keep those separate.”

### Quibble and Fine Print — crossing

| ID | Nell's topic | Response |
| --- | --- | --- |
| BRIDGE-01 | “I'm investigating the company's trials.” | **Quibble:** “At last. A rival with enough paperwork to deserve being called a trial.” **Fine Print:** “Record dates. Insults age poorly as evidence.” |
| BRIDGE-02 | “What does ‘operational use of measurements’ mean?” | **Fine Print:** “It means they may operate using the measurements. A sentence can be perfectly honest and still deserve your attention.” |
| BRIDGE-03 | “Their licence allows public inspection.” | **Quibble:** “Then inspect publicly.” **Fine Print:** “Safely. He omits adverbs when excited.” |
| BRIDGE-04 | “I found a way to recover Orin's ship.” | **Quibble:** “A fine rescue. I once rescued a fleet.” **Fine Print:** “Of receipts. From a puddle.” |
| BRIDGE-05 | “I need advice, not another duel.” | **Quibble:** “Then you may cross. I am experimenting with relevance.” |

Optional rematches remain available. No win, score, or repeated “welcome” is required for Act II.

## 10. A2-06 — Fair Passage Survey Office

### Layout and first access

A bright, reassuring office with a harbour model, public licence, commission desk and neatly labelled copy tray. The public enquiry area is open from the beginning. Vane's inner desk becomes interactive after her quay invitation; no new clerk is necessary.

Before invitation, Nell says: “Public documents on this side. Appointments on that one.” The closed inner door yields: “I'll follow the evidence before asking for an audience.”

### Documents and hotspots

| Object | Exact Look / printed content | Interaction |
| --- | --- | --- |
| Public works licence | “Provisional local routing trials. Public inspection access to remain available.” | Records licence; no magical legal unlock |
| Harbour model | Nell: “The harbour, reduced to something one person can put a hand over.” | Vane: “A model helps us see the whole problem.” Nell: “Provided we remember who doesn't fit on it.” |
| Emergency-authority plaque | “DIRECTOR'S EMERGENCY AUTHORITY: CENTRAL SIGNALS TO BE ANNOUNCED PUBLICLY.” | Seeds final-act broadcast rule, does not reveal an override code |
| Copy tray | Nell: “For copies. My original is remaining unusually close to me.” | Working-copy preparation and explicit handover only |
| Commission | Text below | Read/review whenever offered |
| Ink blotter | Nell: “Nothing gets wet here without becoming a record.” | Take: “I have paper. I don't need to steal the desk's clothing.” |

**Commission text, always readable before confirmation:**

> Nell will verify the service-inlet survey against current fixed marks and levels.
> Fair Passage will pay a stated survey fee and credit Nell's work.
> An annotated copy is supplied for local route planning and operational calibration.
> The original survey and Nell's notebook remain Nell's property.
> The director retains decisions about operating policy and passage charges.

Use a fixed fictional fee of **twelve harbour crowns**. This is ledger credit recorded on a receipt, not a spendable economy or another puzzle gate. The company really pays it; Vane's betrayal concerns access policy, not a forged payment.

### Commission conversation — `A2-VANE-03`

> **Vane:** “You have a boat and a correction. An unusually productive afternoon.”
>
> **Nell:** “The boat was already there. That was part of the correction.”
>
> **Vane:** “And the service measurement?”
>
> **Nell:** “Checked against fixed marks, with the basin equalised.”
>
> **Vane:** “Then let us put your name on it.”

This opening requires boat recovery and measurement. Earlier visits use the relevant missing-work response below.

| ID | Nell's topic | Vane's complete response |
| --- | --- | --- |
| VANE-04 | “What will you do with my copy?” | “Calibrate the service route and coordinate it with our marked passage. The commission says operational use.” |
| VANE-05 | “Will other boats benefit?” | “A dependable harbour benefits every operator. The terms of access will be published.” |
| VANE-06 | “That is not the same as free access.” | “No. Maintenance, crews and liability cost money. I do not propose to finance them with optimism.” |
| VANE-07 | “My evidence doesn't prove you caused every change.” | “Correct. That distinction is one reason I am hiring you.” |
| VANE-08 | “The trials hid Orin's ship.” | “His vessel followed a trial marker into a service basin. We will correct the notice. I am paying for better measurements because imperfect arrangements have consequences.” |
| VANE-09 | “I want public safety written into the purpose.” | “Agreed: ‘for safe local routing.’ The operating-policy clause remains.” Records cautious tone; does not secretly alter the plot |
| VANE-10 | “I would like the credit to say independent surveyor.” | “Independent surveyor Nell. A precise description.” Records confident tone; same story outcome |
| VANE-11 | “I need time to decide.” | “Take it. Precision is wasted if you sign without reading.” Leaves transaction pending indefinitely |

**Missing-work responses:**

- No verified timeline: “Bring an account that separates the sequence from its explanation. The public reports are available on the quay.”
- No service measurement: “The old drawing lacks one local level check. Your notes should identify the fixed marks and the equalised reading.”
- No recovered boat: “Finish securing the vessel first. I will not send a surveyor into the shoal with an unresolved berth.”

These checks protect Nell's planned voyage, not Vane's ability to recognise evidence. Topics about policy remain accessible before all work is complete.

### Puzzle P2-06 — Keep the original; understand the copy

**Goal:** Produce the commissioned working document, not accidentally give away the quest chart.

**Inputs:** tracing sheet, pencil, old survey, service drawing, recorded measurement, verified timeline. All knowledge stays in the notebook. The copy can be prepared on Pip's proof table, the quay bench, or the office desk; no mandatory backtracking to a single table.

**Interface:** Three checkboxes with visible source notes:

1. Fixed service marks and equalised level.
2. Dated observation sequence: signal → current → launch.
3. Boundary note: local connected channels only; wider effects not established.

Wrong addition “The company controls all tides” → Nell: “That isn't a measurement. It doesn't go on a measured drawing.” Nothing is consumed.

**Completion, `A2-COPY-01`:**

> **Nell:** “Original retained. Working copy dated. Uncertainty labelled instead of wished away.”

Sets `copy_ready`; converts sheet to annotated copy. An identical notebook facsimile is retained automatically. Pencil is never consumed.

### Explicit story decision

Using the copy on Vane opens a confirmation panel; it does not instantly transfer it.

**Heading:** “Deliver the commissioned survey?”

**Body:** “Vane will receive a usable annotated copy for route planning and operational calibration. Nell keeps the original and a notebook facsimile. Delivering it advances the story and changes the harbour.”

**Buttons:** **“Deliver the copy”** / **“Keep investigating”**.

Declining simply returns control. No countdown, lost payment or alternate hidden ending. Both cautious and enthusiastic dialogue paths require this same explicit action. The fixed story includes Nell's mistake; postponing it remains possible for exploration.

`A2-VANE-HANDOVER`:

> **Nell:** “Here is the copy. The correction is local. The limitations are on the page.”
>
> **Vane:** “And your name is on the commission. Twelve crowns, credited in full.”
>
> **Nell:** “Independent surveyor Nell.”
>
> **Vane:** “You have made the missing connection.”
>
> **Nell:** “I hope it helps people find their way.”
>
> **Vane:** “It will make the route dependable.”

Remove the delivered copy, grant receipt, retain original and facsimile. Set `copy_delivered` atomically before playing the cinematic so reload never pays twice or repeats the decision.

## 11. Company announcement and act ending

### Controlled consequence

After handover, a short transition returns Nell to the Repair Quay. No real-time tide countdown begins. The public board now carries a company route sheet with Nell's distinctive service-channel annotation and a compulsory contract notice. Public walkways remain traversable; restrictions concern sailing at the next major tide, so existing exits are not inexplicably locked.

Vane stands by the board for the announcement, then remains available for one follow-up menu before returning to her office. Do not duplicate her sprite.

`A2-ANNOUNCE-01`:

> **Vane:** “At the next major tide, all commercial passage through the managed channels will operate under a Fair Passage contract.”
>
> **Nell:** “All passage?”
>
> **Vane:** “Uncoordinated access makes coordinated safety impossible.”
>
> **Nell:** “You hired me to correct a route.”
>
> **Vane:** “And you did. Excellently.”

**Board text:**

> FAIR PASSAGE MANAGED ROUTES — COMPULSORY PASSAGE CONTRACTS FROM NEXT MAJOR TIDE.
> Service-channel calibration: independent survey by Nell.
> Applications and conditions available at the survey office.

### Puzzle P2-07 — Recognise your own contribution

Use notebook facsimile or old survey on the new route sheet. The comparison shows three labelled details; select the service-channel level annotation that Nell supplied. It matches exactly, including her explicit local limitation. The company has not altered the science; it has used it for an exclusionary policy.

Wrong choice “They invented my entire survey” → Nell: “No. The credit is real. So is what they've done with it.”

Wrong choice “My observations must have been false” → Nell: “The measurements were sound. My assumption about their purpose wasn't.”

**Success, `A2-ANNOUNCE-02`:**

> **Nell:** “That's my correction. Not a forgery. Not a misunderstanding.”
>
> **Nell:** “I helped finish the route they mean to charge everyone for.”

Sets `company_use_proven`. The licence, commission, facsimile and announcement remain together in the notebook. This is evidence of use and policy, not yet the full machine operating record needed in Act IV.

### Optional immediate replies

| ID | Nell's topic | Response |
| --- | --- | --- |
| VANE-12 | “You knew what I wanted this to achieve.” | “I knew you wanted accurate routes and paid work. You have provided the first and received the second.” |
| VANE-13 | “Safety doesn't require owning every way through.” | “Someone must accept responsibility for coordinating them.” **Nell:** “Responsibility isn't the same as exclusive permission.” **Vane:** “We disagree about the practical difference.” |
| VANE-14 | “Withdraw my name.” | “I can record your objection. I cannot pretend the work was not yours.” Notebook adds objection; outcome unchanged |

### Return reactions after announcement

- `A2-PIP-12`, if visited: **Pip:** “Your name is on their route sheet.” **Nell:** “So is the measurement I gave them.” **Pip:** “Then we print the distinction. A correction is not an erasure.”
- `A2-ROOK-19`: **Rook:** “I told you to ask about permission.” **Nell:** “I asked. I wanted the answer to mean something kinder.” **Rook:** “Then next time we must make the answer less optional.”
- `A2-BRIDGE-06`: **Fine Print:** “Compulsory contracts. The word ‘all’ has found its teeth.” **Quibble:** “Can we stop it?” **Nell:** “Not by cutting something we don't understand.”
- `A2-ORIN-09`: **Orin:** “The boat is ready.” **Nell:** “I have something to put right before we sail.” **Orin:** “Then start with the person you need to tell.”
- `A2-MARA-08`, if approached before ending confirmation: **Mara:** “You look as though being right has gone badly.” **Nell:** “I need to tell you what I gave Vane.” **Mara:** “Then we'll make time.” Stops before Act III confession |

### Act-ending prompt

After P2-07, notebook offers **“Tell Mara everything”** and **“Look around first.”**

Confirming the first opens an Act III loading boundary, not a premature voyage. Autosave retains all evidence, boat status and inventory before the next chapter downloads. If Act III is not implemented, show its title card and allow continued Act II exploration; never strand the player at a dead link.

`A2-END`:

> **Nell:** “I wanted somebody important to say my work mattered.”
>
> **Nell:** “It matters. Now I have to decide what I do about that.”

**End of Act II — Respectable Nonsense.**

## 12. Shared dialogue and interaction fallbacks

These complete the script for actions not given a dedicated line above. They do not award clues or consume items.

| Situation | Exact response |
| --- | --- |
| Talk to an ordinary object | Nell: “A poor conversationalist. Excellent at holding its position.” |
| Take fixed equipment | Nell: “Useful here. Awkward in a pocket.” |
| Use wrong ordinary item | Nell: “I can make those meet. I can't make that useful.” |
| Use a document where no matching evidence exists | Nell: “No matching detail here. Keep the paper; look elsewhere.” |
| Give original survey to anyone | Nell: “You may look. I'm keeping the original.” |
| Use hook on a person | Nell: “I need their attention, not their coat.” |
| Take another copy of an owned supply | Nell: “I have enough. An expedition needn't begin with hoarding.” |
| Attempt solved mechanism | Nell: “Already in its safe position.” |
| Try an inaccessible exit | Nell names the specific obstruction using that room's entry text, not “I can't go there” |
| Leave a conversation | Nell: “I'll come back when I have something more useful to ask.” |
| Repeat completed evidence puzzle | Nell: “The sequence is recorded. I can review the sources without changing the conclusion.” |
| Start voyage before Act III | Orin: “Ready when your business ashore is finished. We won't miss a tide because you read a page.” |

Do not use a generic refusal in place of a missing-prerequisite clue. Named puzzle failures always take precedence.

## 13. Inventory and document ledger

| Item / document | Source | Necessary use | End state / replacement |
| --- | --- | --- | --- |
| Notebook | Act I | All evidence and facsimiles | Permanent; never transferred |
| Pencil | Act I | Tracing and annotated copy | Permanent |
| Lint | Act I | Optional sorter joke | Permanent; never required |
| Old survey | Act I chest | Inlet comparison; working-copy preparation | Permanent original |
| Boathook | Act I tavern fireplace | Retrieve messenger line | Remains carried throughout Act II; returning it is deferred to a later act |
| Relay tracing | Pencil/notebook + plate | Identify inlet drawing with Rook | Notebook knowledge; reading plate is equivalent |
| Witness reports | Quay or Pip | Timeline verification | Notebook source cards; no physical theft |
| Tracing sheet | Quay drawer or Pip tray | Annotated copy | Becomes copy; replaceable before delivery |
| Mooring rope | Quay locker | Secure Second Opinion | Fixed to berth after recovery; not required elsewhere |
| Service drawing | Rook after attribution | Safe inspection and survey comparison | Permanent document copy |
| Inspection crank | Rook, borrowed | Open local barrier | Placed in inlet bracket once safely latched |
| Messenger line | Existing vessel gear | Lead mooring rope aboard | Contextual line, not a pocket item |
| Inlet measurement | Fixed marks + equalised staff | Annotated copy | Permanent notebook fact |
| Annotated copy | Paper + pencil + verified sources | Explicit delivery to Vane | Delivered; notebook facsimile retained |
| Commission / fee receipt | Vane | Records rights, limits and payment | Permanent evidence, no currency puzzle |
| Company route notice | Post-handover board | Compare with facsimile | Permanent evidence; board remains intact |

**Scope guard:** No lamp fuel, breakfast ingredients, unrelated keys, postage, costumes or money grinding. Tool access follows the actual task. Recovering a vessel is the reward for the linked investigation, not an item exchange chain without a reason.

## 14. State, save and recovery specification

Use a separate Act II state namespace/schema when implemented; these are proposed names, not changes to the current save code.

| Flag / value | Set by | Enables |
| --- | --- | --- |
| `act2_started` | Confirm Act II entry | New room map |
| `timeline_verified` | P2-01 at either board | One investigation fact; copy preparation |
| `maker_traced` | Read or trace actual relay plate | Rook identification; one investigation fact |
| `house_local` | P2-02 release | Workshop access |
| `service_drawing` | ROOK-10 with attribution | Crank loan, safe inspection, measurement |
| `ship_description` / `inlet_details_seen` | Orin / sighting slit | Together set identification regardless of order |
| `ship_identified` | Matching description and physical details | One investigation fact; recovery request |
| `vane_invited` | Two of three investigation facts | Vane office meeting |
| `inspection_mode`, `levels_equal` | Inlet controls | Safe barrier opening |
| `barrier_open` | Crank and safe latch | Line access; Orin relocation |
| `line_retrieved`, `rope_secured` | P2-04 physical steps | Safe recovery scene |
| `orin_location` | Explicit invitation / recovery | Exactly one Orin instance |
| `boat_recovered` | Completed/replayed recovery event | Vessel inspection and commission readiness |
| `drain_seen`, `pillar_seen`, `staff_read` | Physical inspections | Service measurement |
| `service_measured` | P2-05 confirmation | Copy preparation |
| `copy_ready` | P2-06 | Handover confirmation |
| `copy_delivered` | Explicit story confirmation | Announcement and one receipt |
| `announcement_seen` | Played or read in full | P2-07 |
| `company_use_proven` | P2-07 | Act-ending decision |
| `act2_complete` | Tell Mara everything | Act III boundary |
| Optional flags | Pip partnership, both jokes, tone, objection | Alternate lines only; never block progression |

**Save behaviour:**

- Save all selector positions, inventory ownership, document knowledge, NPC locations and committed story flags.
- During moving water or barrier animation, save the safe logical checkpoint. Reload resumes the explanatory prompt or completes the already-authorised safe action once; never leaves a half-open hazardous state.
- During ship recovery, save preparations first; reload offers “Finish bringing her alongside” without respawning rope or consuming another item.
- During handover, `copy_delivered` and receipt are one transaction. Reload resumes the announcement; it cannot create a second fee or confiscate the original.
- Visiting Pip after solving the public board acknowledges prior work. Solving either board cannot reset the other.
- Do not delete Act I notes or reset the open chest, hook pickup, passage or evidence.
- A saved act-transition decision waits for the next chapter's cache to finish. Download failure keeps the save and provides retry.

## 15. Art, animation and audio list

### Backgrounds and interfaces

| Asset | Required states |
| --- | --- |
| Repair Quay | Initial report board; Vane introduction; company announcement board |
| Quay Quill interior | Original headline; optional corrected proof |
| Breakfast Hall | Circular-wait mechanism; safely parked trolley and open workshop path |
| Rook workshop | Bench, model, drawings, crank present/borrowed |
| Blind Inlet | Closed barrier with slit; open basin; vessel at safe berth |
| Survey office | Public enquiry view, Vane meeting, delivery tray |
| Close-ups | Household controls; inlet inspection panel; service measurement; copy/notice comparison |
| Act II loading illustration | Nell between newspaper, Rook's house, hidden vessel and Vane's office; original composition |
| Room emblems | Six readable painted badges for shared header/navigation |

Keep interactive objects on separate transparent layers: paper, rope, crank, trolley, barrier, messenger line, boat, notices and model gates. Room backgrounds must not contain immutable copies of items that disappear when taken.

### Characters and motion

- Pip: writing, listening, reading a correction, press operation.
- Rook: impatient idle, explaining, tea rescue, relieved workshop stance.
- Vane: composed idle, attentive listening, offer gesture, receipt handover, public announcement.
- Orin: existing identity; inlet arrival, admitting mistake, handling prepared line, boarding.
- Nell: inspect, trace, turn crank, reach with hook, tie rope, compare paper, hand over copy.
- Household: selectors, gentle steam settling, table parks, trolley moves clear. No chaotic flashing.
- Inlet: levels equalise, barrier moves, safe latch seats, line retrieves, ship moves entirely in water to berth.
- Every animation has captions and reduced-motion alternatives. Do not make dialogue duration determine whether a puzzle succeeds.

### Voice direction and sound

Nell retains her current voice. Pip speaks quickly but slows when checking a fact. Rook is clipped and precise, softening when admitting uncertainty. Vane is measured, warm and persuasive; avoid an obvious villain voice that makes Nell's choice absurd. Orin loses some verbal decoration when he admits his mistake. Mara remains practical, not oracular. Quibble and Fine Print retain their established contrast.

Record every speaker turn in the scripted blocks and tables, including wrong attempts, repeat lines and generic fallbacks. Printed text needs an accessible read-aloud option but does not require an extra character voice. Export final line IDs only after editing; do not generate an expensive voice library against this first draft.

**Ambience:** quay tools/water; quiet press and paper; house clock/pipes; workshop soft mechanisms; sheltered inlet; orderly office muffled harbour. **Effects:** pencil trace, paper pickup, selector click, table park, latch, equalising water, crank, rope retrieval, mooring tension, small vessel movement, stamp, notice posting. Reuse existing suitable sounds.

Precache all required Act II room, prop, voice and effect assets before entry. Include reused assets by revision so they are not downloaded twice. Show actual download progress over the Act II illustration. On every room exit cancel active speech, queued subtitles and replay state; the notebook may retain the transcript.

## 16. Implementation acceptance checklist

- [ ] Start from each of Act I's three chosen leads; all investigations remain available.
- [ ] Complete Act II without entering the newspaper office or seeing either Easter egg.
- [ ] Complete evidence analysis at Pip's and at the public board; visiting the other later preserves progress.
- [ ] Inspect the inlet before talking to Orin, and talk to Orin before inspecting it.
- [ ] Fix the household before finding the maker's plate; Rook then clearly identifies the missing information.
- [ ] Find the maker's plate before visiting Rook; no redundant tracing requirement appears.
- [ ] Attempt every unsafe control order; interlocks explain and preserve valid settings.
- [ ] Leave and reload after equalisation, opening, line retrieval and rope attachment.
- [ ] Bring Orin only after safe opening; no duplicate NPC, boat or rope appears.
- [ ] Recover the boat before measuring, and measure before recovery.
- [ ] Verify boat and rope geometry in every animation frame and reduced-motion state.
- [ ] Confirm original survey cannot be accidentally transferred to Vane.
- [ ] Decline handover repeatedly, explore, return and complete it normally.
- [ ] Save during handover and announcement; one receipt and one copy transfer result.
- [ ] Use all commission tone choices; none secretly bypasses the fixed plot or changes essential facts.
- [ ] Recognise Vane's use from retained evidence without visiting an optional ally.
- [ ] Keep all public walking routes usable after the announcement.
- [ ] Finish with sound muted, keyboard only, touch, and reduced motion.
- [ ] Retry interrupted chapter downloads without erasing the Act I or Act II save.
- [ ] If Act III is unavailable, end on a readable title card with safe continued exploration.

## 17. Editorial decisions for refinement

- Keep six new rooms, or combine Rook's hall and workshop into one background with a revealed alcove?
- Keep Pip optional as specified, or deliberately promote his office to a required story stop?
- Keep **Second Opinion** as Orin's vessel name?
- Keep the household humour almost entirely mechanical, or introduce a non-speaking resident?
- Does Vane's clearly worded operational-use clause give Nell the right mixture of responsibility and understandable hope?
- Keep twelve crowns as a receipt only, avoiding a currency system?

The default plan above is complete without answering these questions. Recommended first implementation slice: Repair Quay → household/workshop → inlet recovery, with the public evidence board and inventory persistence; then add Pip's richer presentation and Vane's explicit transaction and consequence.

## Opening monologue — `A2-INTRO`

On a fresh normal Act II start, Nell talks herself through her evidence and the three open leads. Keep the transcript and replay available; continuing or travelling stops the narration. Debug starts in later rooms bypass this recap; progressed saves do not repeat it. The notebook offers a recap replay at any point.

> **Nell:** “Right, Nell. Take stock. You have a borrowed boathook, an old survey, and a pencil that has somehow become responsible for your career.”
>
> **Nell:** “At the landing, the signal came first. Then the local current changed. Then the company launch sailed through. That is a sequence, not proof that somebody has bought the ocean.”
>
> **Nell:** “I need other witnesses. Pip’s newspaper might have reports worth comparing, once I separate the facts from the exciting punctuation.”
>
> **Nell:** “Then there is the signal hardware at the repair quay. Find its maker, find out what it actually does. Preferably before touching anything labelled experimental.”
>
> **Nell:** “And Orin’s missing ship. Boats rarely disappear out of embarrassment, even when their navigators would like them to. I should ask him for a proper description.”
>
> **Nell:** “Check the witnesses. Follow the machinery. Find the boat. If I can explain this harbour, perhaps I can finally reach Bellweather Shoal. One well-supported mistake at a time.”
