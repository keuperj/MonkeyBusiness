# Monkey Buisness — Act I Room, Dialogue and Puzzle Plan

> **Draft 0.1 · 19 October 2026 · Editable design proposal**
>
> Companion to the [story plan](STORY_PLAN.md) and [concept map](../public/assets/story-map.png).
>
> This document proposes the playable version of Act I. It does not change the current game. Existing prototype content is identified below; all additions, progression rules and dialogue revisions remain open for editing.

> **Implementation note · 19 October 2026:** The main game now implements this Act I proposal across all three rooms, with generated art and voiced dialogue, shared saves, notebook, evidence selection, the cupboard Easter egg and animated map travel. This document remains editable design material; `src/chapter-lines.json` and `src/duel.json` contain the shipped dialogue. Act II destinations remain future work.

## 1. What Act I must accomplish

**Act title:** A Job, a Tankard and a Toll.

**Opening want:** Nell needs surveying work and somewhere to sleep.

**Closing decision:** Nell chooses to investigate why the harbour behaves differently from its charts—and why the Fair Passage Company's boat seems prepared for it.

**Emotional movement:** From seeking permission to trusting an observation she made herself.

**Player learning:** Walk, inspect, talk, take, use, combine information, choose a comeback and revisit a clue. Teach these through understandable situations rather than a separate tutorial overlay.

**Proposed scope:** Three walkable rooms, one reusable chart/notebook close-up, five speaking characters and roughly 25–40 minutes on a first playthrough. Timing is a design target, not a production estimate.

**By the end, the player should know:**

- Nell is a practical, self-taught chartmaker looking for a chance.
- Mara rewards useful action and knows more about the old chart than she volunteers.
- Orin is embarrassed about his missing vessel but still has useful expertise.
- Quibble's authority is mostly performance; Fine Print is an interested participant, not a pet-shaped hint dispenser.
- The harbour's navigation system is doing something unexpected. Company traffic appears to benefit.
- Bellweather Shoal matters, but Nell does not yet know about the Tide Ledger, Vane's full plan or Mara's history.

**Do not reveal yet:** The underground control station, the override procedure, the company's complete monopoly scheme or the reason Mara kept the chart. Those discoveries belong to later acts.

## 2. Room layout and progression

```text
A1-01  THE CROOKED COMPASS
       Interior; warm introduction and chart puzzle
                  ↕ tavern door
A1-02  QUIBBLE'S CROSSING
       Near bridge approach always accessible
       Far end opens after the word duel
                  ↕ public landing
A1-03  OUTER LANDING
       Working edge of the repair yards;
       chart comparison and current observation
                  → Act II harbour hub, after Nell's conclusion
```

The outer landing is a small playable portion of the map's **Repair Yards**, not a new settlement or island. A short transition between the tavern door and bridge approach represents the waterfront lane; it does not need a fourth room.

The map is a notebook reference, not a way to bypass locked exits. The rest of Brindle Quay appears as destination sketches until Act II.

### Order flexibility

- Nell may visit the bridge before returning the tankard or obtaining the chart.
- The word duel requires no inventory item and may be completed first.
- The landing may be explored without the chart, but Nell cannot finish the comparison puzzle without it.
- Reading clues early records them. The player never needs to repeat a click merely because another prerequisite was obtained later.
- All three rooms remain available throughout Act I. Winning the duel opens permanent passage for this playthrough.
- Act I ends only when Nell has both recorded the anomaly and chosen her next lead. The ending does not silently teleport her away.

### Main dependency chain

```text
Take tankard → return tankard → receive key → unlock chest → obtain chart
                                                              │
Win word duel → landing access → inspect tide board + sighting marks
                                                              │
                                   chart + both observations → comparison
                                                              │
Use fixed boathook to free tethered float → working current indicator
                                                              │
                  comparison + indicator → observe signal / reversal / boat
                                                              │
                  record three observations → choose investigation lead
                                                              │
                                                        ACT I COMPLETE
```

The two landing prerequisites can be completed in either order. Nobody requires the player to exhaust every conversation or find the Easter egg.

## 3. Nell's starting state and interaction language

### Starting possessions

| Possession | Purpose | Rules |
| --- | --- | --- |
| Field notebook | Goals, sketches, observations and available leads | Always accessible; cannot be dropped, traded or lost |
| Pencil stub | Establishes Nell's working habits | Part of the notebook animation; not a separate inventory puzzle |
| Empty purse | One optional character joke | Inspect-only; no money puzzle or mandatory payment in Act I |

The notebook is a persistent interface feature. The old chart becomes a persistent document inside it after acquisition, rather than filling a pocket forever. It must still be selectable for **Use chart with…** interactions.

Keep the prototype's five verbs: **Walk to**, **Look at**, **Talk to**, **Pick up** and **Use**. Using an item on a person covers giving it. Scene targets also have a keyboard-accessible list.

**New goal messages are summaries, not orders:** “Find something useful to do” becomes “Check the old chart against the harbour.” The player should understand why a task matters before being asked to perform it.

## 4. A1-01 — The Crooked Compass

### Dramatic purpose

Give Nell a believable reason to become involved. Introduce useful kindness as the first way forward, reward observation with a chart and establish the contrast between what people claim and what they actually know.

### Visual layout

Retain the existing room's warm lanterns, fireplace, harbour window, back-right counter and clear foreground walking area.

- **Left:** Exit door, noticeboard and a shallow cleaning cupboard beside the fireplace.
- **Centre:** Window table with the abandoned tankard; Orin stands nearby.
- **Right:** Mara works at the bar. The accessible sea chest sits away from the main walkway.
- **Background:** A company launch occasionally passes beyond the window, establishing its silhouette without starting the later event.

Keep every required object readable at the actual game scale. The cleaning cupboard is intentionally secondary, but discoverable with hotspot highlighting.

### Characters

**Mara:** Polishes a glass, checks the fire, and notices when someone helps without being asked. Her humour is grounded and economical. She does not act mysterious in every line.

**Orin:** Looks out at the harbour between increasingly unconvincing explanations of his ship's whereabouts. He can be wrong about his own actions without becoming incompetent at everything.

**Nell:** Enters carrying her notebook. Before making a joke about the room, she briefly checks whether the noticeboard offers work.

### Objects and responses

| Object | Look / conversation information | Available action | Result or feedback |
| --- | --- | --- | --- |
| Brass tankard on window table | “PROPERTY OF MARA” on the base | Pick up; use on Mara | Goes to inventory, then returns to its owner; grants chest key once |
| Mara's bar | A small mountain of unwashed crockery | Look; use unrelated items | “I asked for a tankard, not a new branch of the business.” |
| Sea chest | Plain working chest with a brass lock | Use key; look after opening | Nell takes the old chart automatically; chest remains open |
| Old chart | Bellweather Shoal, a transit line and a note about the ebb channel | Look; use with window or later landing markers | Adds document and tentative notebook question |
| Noticeboard | Cook advert from prototype; fresh notice seeking shoreline observations | Look | Introduces surveying as paid work; not mandatory for progression |
| Harbour window | Two stationary landmarks and recently painted navigation buoys | Look; use chart | Nell spots a possible mismatch, but cannot measure it accurately indoors |
| Fireplace | Warmth and everyday comfort | Look; use chart/key/tankard | No destruction of items. “A dramatic edit. I'll try a pencil first.” |
| Door | Leads toward the public bridge | Walk to / Use | Travel allowed at any time after the opening exchange |
| Cleaning cupboard | Jammed by an overambitious mop and a bucket | Look / Use | Optional Space Quest Easter egg; no story flag required |

### Opening conversation — proposed additions

The opening is short and skippable. Subtitles persist in the conversation log.

> **Nell:** “I'm looking for surveying work.”
>
> **Mara:** “Then you've come to a place with water and disagreements.”
>
> **Nell:** “I brought a pencil.”
>
> **Mara:** “Good. Most applicants bring another disagreement.”

**Notebook goal:** Find a lead on surveying work.

### Mara's conversation topics

| Player topic | Availability | Proposed response / purpose | State effect |
| --- | --- | --- | --- |
| “Does anyone need a chartmaker?” | Always | “Everyone needs an accurate chart. Paying for one remains a minority interest. There’s an old survey in that chest.” | Points toward chest; records work lead |
| “What's in the sea chest?” | Before chart obtained | Keep the existing tankard-for-key explanation | Reveals the simple bargain |
| “Why don't you fetch the tankard?” | Before return | “Because I have six customers' washing-up and one customer's ambition to encourage.” | Character joke; not a required challenge |
| “Is this yours?” | Tankard selected | Keep existing gratitude and key reward | Consumes tankard; grants key once |
| “Can I keep the chart?” | Chart obtained | “A chart ought to go somewhere. That one has mostly been under a blanket.” | Confirms permission; prevents theft ambiguity |
| “The markers don't agree with it.” | Chart inspected | “Then check which one has changed. Old doesn't always mean wrong.” | Directs Nell to the landing; conceals Mara's deeper involvement |
| “Do you know who made it?” | Chart obtained | “People who knew this harbour before it acquired an advertising budget.” | Foreshadowing only; no Tide Ledger exposition |
| “I should get going.” | Always | Short farewell, different after tankard return | Exits conversation |

Returning the tankard before discussing it is valid: Mara notices the help and gives the same reward. The player never has to put it back and repeat the exchange.

### Orin's conversation topics

| Player topic | Proposed exchange | Purpose / effect |
| --- | --- | --- |
| “Have you lost a ship?” | Keep: “I haven't lost my ship. I know exactly which ocean it's in.” Nell: “That narrows it down to most of the map.” | Introduces later Act II investigation |
| “Where did you last see it?” | “At the berth indicated by an entirely official marker. It was a very reassuring marker.” | Plants misplaced trust in official signals |
| “Can you read this chart?” | “Bellweather Shoal. And the old transit marks. Match those from the outer landing before you trust either set of buoys.” | Names comparison method; available after chart obtained |
| “What is a transit mark?” | “Two fixed marks. Line them up and you know where you're looking. Much less opinionated than a sailor.” | Accessible explanation; never required trivia |
| “Which way should the water run?” | “Depends on the tide and the channel. Use the board at the landing. Don't mistake one swirl for a conspiracy.” | Prevents overclaiming what Nell's first observation proves |
| “Will you come with me?” | “Find out whether the bridge is admitting pedestrians today. I'll keep an eye on the water from here.” | Keeps Orin in one location during this act; no unexplained teleport |

### Puzzle P1 — A modest beginning

**Goal:** Obtain the old survey chart.

**Obstacle:** The chest is locked; Mara will offer access in exchange for a small favour.

**Clues:** Mara's direct request; her name on the tankard; visible brass lock; the chest topic remains available.

**Solution:** Pick up tankard → use on Mara → receive key → use key on chest → Nell retrieves chart.

**Reward:** Chart document, new goal and Mara's warmer attitude.

**Key cleanup:** When Nell opens the chest, she places the key on its hook beside the lock. This is automatic and shown in animation; the pocket is freed and the chest cannot relock. This is a proposed improvement over the prototype, which keeps the key in inventory.

**Plausible failed attempts:**

- Take chest: “Too heavy. I'd have to chart a route just to lift it.”
- Use tankard on lock: “Wrong sort of tumbler.”
- Use key on door: “This door has a much simpler mechanism. A handle.”
- Return tankard twice: Mara acknowledges it; no duplicate keys.

**Hint ladder:** Mara mentions the abandoned cup → inspecting its base identifies the owner → the explicit help option names the full exchange. No hints depend on having audio enabled.

### First chart discovery

On opening the document, Nell recognises the drawing conventions. This is the first visible demonstration of her skill.

> **Nell:** “These aren't decorative arrows. Someone measured the ebb channel.”
>
> **Nell:** “But the new marker outside points across it. Either this chart has aged badly, or somebody's improved the water.”

Record a **question**, not a conclusion: “Check the old survey against the outer landing.” The window is a teaser; the authoritative comparison requires the marked sighting position outdoors.

### Optional Easter egg E1 — A caretaker's Space Quest

**Reference:** *Space Quest*, through its affection for overlooked caretakers and absurdly grand treatment of ordinary maintenance.

**Location:** The cleaning cupboard beside the tavern fireplace.

**Setup:** The cupboard door will not close because a mop leans across a bucket. Pinned inside is a tiny handwritten work request headed **“SPACE QUEST”**. Underneath: **“One shelf. Six inches wider. Please.”** A doodle turns the bucket into a rocket using two scrubbing brushes as fins.

**Trigger:** Look at the request, then Use the cupboard. Nell rotates the bucket; the mop settles into the newly available gap and the door finally shuts. This uses a fixed prop, not an inventory item.

> **Nell:** “A space quest?”
>
> **Mara:** “Six inches. The bucket's ambitious.”
>
> *Nell rearranges the cupboard. The mop pops upright like a tiny launch gantry.*
>
> **Nell:** “Mission accomplished. No worlds saved. Considerably less tripping.”
>
> **Mara:** “That's how most useful jobs end.”

**Payoff:** A little visual celebration: the bucket handle swings like an antenna, followed by a completely ordinary drip. The joke still makes sense without recognising the reference.

**Boundaries:** No borrowed protagonist, costume, logo, quoted dialogue, spacecraft or copied puzzle. The note uses the title as a situational pun. This is a proposed reference, not an assertion of legal clearance.

**Optionality:** No clue, achievement requirement, item, money or progression reward. Missing it never blocks Act I. If the player uses the cupboard before reading the note, the same short exchange reveals the joke. On repetition: “Still six inches. Still a frontier.”

## 5. A1-02 — Quibble's Crossing

### Dramatic purpose

Introduce wordplay as a meaningful form of action. Establish Quibble and Fine Print as people with interests, not disposable guards. Let Nell learn that satisfying a demand can be cleverer than attacking it.

### Visual layout

Use the generated bridge scene: twilight water, warm lamps, low rear railing and open fencing space.

- **Near/left approach:** Exit back to the tavern; Nell starts here.
- **Centre:** Clear area for the duel. A safe practice blade hangs from a post.
- **Far/right approach:** Quibble stands before the landing exit.
- **Above/right:** Fine Print's perch and small fold-out ledger desk.
- **Railing:** Quibble's handwritten toll sign partly covered by a new company notice.
- **Beyond:** Repair-yard cranes and a signal buoy establish the next destination.

### Characters and motivations

**Quibble** wants someone to take his obsolete reputation seriously. He cannot afford to fight a real battle and is relieved when Nell agrees to a verbal one.

**Fine Print** enjoys interpreting rules to his advantage. His annoyance at the company's claim is sincere: it threatens his own little business.

They block **forward passage only**. Nell can always retreat, fetch the chart, save or return later.

### Objects

| Object | Interaction | Result |
| --- | --- | --- |
| Handwritten toll sign | Look | “ONE GLORIOUS VICTORY. EXACT CHANGE APPRECIATED.” Establishes duel terms |
| Company notice covering sign | Look before or after duel | “Fair Passage Company: harbour access agreements under review.” Adds company name, not proof of wrongdoing |
| Practice sword on peg | Look / Use | Blunted edge; automatically equipped when duel starts and returned afterward. Never a required pocket item |
| Fine Print's ledger | Look / Talk to Fine Print about it | Expenses: ink, crackers, ink-flavoured crackers. A closed business document; cannot be stolen |
| Public bridge plaque | Look | Weathered wording: “FOR THE USE OF THE HARBOUR.” Useful context for Quibble's dubious claim |
| Far exit | Walk to before victory | Quibble offers the duel; no automatic forced combat |
| Far exit after victory | Walk to | Enter outer landing |
| Near exit | Walk to | Return to tavern, even after losing or declining |

### Pre-duel conversation

> **Quibble:** “Halt! Captain Quibble owns this bridge. Passage costs three bruises to my ego.”
>
> **Nell:** “That seems unusually specific.”
>
> **Fine Print:** “We tried charging by injury. The accounting was awful.”

| Nell's choice | Response / result |
| --- | --- |
| “What are the rules?” | Five exchanges; win three. Wrong replies give a useful hint. Nobody gets hurt. No timer |
| “I don't have a sword.” | Quibble gestures to the practice blade: “Neither did that sword, until we attached a handle.” Start still offered |
| “This plaque says the bridge is public.” | “And the public has been very careless about defending it.” Explains his performance; does not prematurely reveal the final solution |
| “What does the company want?” | Fine Print: “Apparently my toll is an unauthorised obstruction. Their toll is infrastructure.” Records a grievance, not objective proof |
| “En garde… grammatically.” | Starts duel |
| “I'll come back.” | Leaves conversation; no penalty |

### Puzzle P2 — Five exchanges of pointed remarks

Retain the prototype's original challenge material and three-of-five win threshold. All answers remain visible in the dialogue log after the exchange. Shuffle answer positions, not question order.

| Exchange | Challenger and boast | Winning reply | Reason it works |
| --- | --- | --- | --- |
| 1 | Quibble: “My fearsome reputation always precedes me!” | “Then I'll fight your reputation while you catch up.” | Treats his boast as an admission that he is absent |
| 2 | Fine Print: “Squawk! Bridge toll: one gold coin per foot. Wings cost extra!” | “Put it on your bill. You've already got one.” | Turns a charge into the bird's own anatomy |
| 3 | Quibble: “I can tie an enemy in seventeen different knots!” | “Wonderful. I've been looking for a bow tie with ambition.” | Makes a threatening skill into a mundane service |
| 4 | Fine Print: “Every word spoken on this bridge belongs to me. Pay the royalties!” | “Then these unpaid taxes belong to you too.” | Applies his ownership claim to something undesirable |
| 5 | Quibble: “Nobody crosses my bridge until I have the last word!” | “Say welcome. You get the last word; I get across.” | Satisfies both goals instead of accepting a false conflict |

Keep the two wrong alternatives and retorts already written in [`src/duel.json`](../src/duel.json), unless edited during the script pass. Required information never depends on recognising a borrowed joke.

**Animation:** Nell and Quibble lunge, parry and recoil according to who wins the exchange. Fine Print swoops during his turns, but never scratches or attacks Nell. There is no real-time hit detection. Reduced motion substitutes brief pose changes and clear score feedback.

**Failure:** Fewer than three successful answers leads to an invitation to retry. No health, items or money are lost. The log retains the hints. Exiting the duel returns Nell to the near approach.

**Success:** Forward passage is permanently available. The sword returns to its peg. A voluntary rematch is optional and cannot revoke passage.

### Making the story's cooperative payoff reliable

The prototype allows a three-of-five victory even if Nell misses the final “welcome” response. The story outline nevertheless relies on that cooperative idea being introduced.

**Proposed resolution:** Keep the scoring unchanged. If the player wins overall but misses exchange five, add a short unscored coda:

> **Quibble:** “You've won. I still insist on the last word.”
>
> **Nell:** “Then make it ‘welcome.’ You keep the word. I keep walking.”
>
> **Quibble:** “Welcome. Hm. That was almost civilised.”

If the player already chose the cooperative reply, do not repeat it. If the player lost overall, give ordinary retry feedback; no coda opens the exit.

### Post-duel conversation

> **Fine Print:** “A temporary victory. The company's notice says it may replace all existing passage arrangements.”
>
> **Nell:** “Including yours?”
>
> **Fine Print:** “Especially mine. It uses the word ‘all’ in a most aggressive manner.”

**Notebook:** “Fair Passage is reviewing harbour access. Quibble and Fine Print expect to lose their toll.” This distinction between a witness's interest and a proven fact matters later.

Optional follow-up: “What should I look for at the landing?” Quibble points to the tide board and warns that the new lamps are more confident than the water.

## 6. A1-03 — Outer Landing

### Dramatic purpose

Let Nell perform actual survey work. Reward observation, not merely being told the plot. End the act with a concrete sequence the player has witnessed, while leaving its explanation open.

### Visual layout

A compact public landing at the working edge of the repair yards. Reuse the harbour's palette, lantern design and company-launch silhouette.

- **Left:** Bridge exit and path back to the tavern.
- **Foreground:** Safe observation cleat, tethered cork float and a fixed boathook in a rack.
- **Centre:** A marked sighting position with two brass notches; no precarious climbing required.
- **Rear/centre:** Old tide board and a newly painted company direction arrow.
- **Across water:** A fixed warehouse corner and lighthouse notch, matching the chart's transit sketch.
- **Right:** Company signal buoy and the navigable channel. The launch crosses here during the concluding observation.
- **Far-right lane:** Future access to the repair yards and wider harbour hub, opened narratively at the act transition.

### Characters

**Nell** is the only foreground speaking character. Give her space to think aloud without turning every observation into a joke.

A **silent company deckhand** can be visible on the passing launch. This is a silhouette/animation role, not a new conversation character. Vane does not appear in Act I.

Orin remains at the tavern. Nell can return to ask him about anything she has observed. His optional answers offer explanations, not remote puzzle completion.

### Objects and clue content

| Object | Look information | Use / other response | Persistence |
| --- | --- | --- | --- |
| Tide board | Current phase: ebb. A simple local diagram shows the expected flow in this particular channel | Adds phase and diagram to notebook | Recorded once; always reviewable |
| Company arrow | Newly painted route arrow diverges from the old survey line | Look from sighting position | Adds discrepancy note; does not establish wrongdoing |
| Sighting cleat and brass notches | “Stand here; align warehouse edge with lighthouse notch.” | Use chart here opens comparison close-up | Works only with chart; earlier landmark inspection is remembered |
| Distant fixed landmarks | Warehouse corner and lighthouse notch remain aligned despite the floating markers' positions | Look | Adds landmark sketch |
| Tethered cork float | Current indicator snagged on a protruding bolt; line still attached | Use boathook on float | Frees float without taking it or throwing litter into the harbour |
| Fixed boathook | Public tool labelled “RETURN TO RACK” | Use on float; optional reach toward buoy | Nell frees float and replaces tool automatically; buoy is out of reach |
| Signal buoy | Three amber flashes before the company's boat moves | Look / observe | Sequence is described in words and logged; not a colour-only or sound-only clue |
| Company launch | Uses the newly indicated channel immediately after the signal | Look after event | Sketch of company emblem and direction of travel |
| Harbour lane | Leads to newspaper, repair yards and other Act II destinations | Walk to | Before conclusion: Nell offers to finish the observation or return; after conclusion: choose next lead |

### Puzzle P3 — Which thing moved?

**Goal:** Check whether Nell is comparing the correct channel, rather than blaming the chart for a viewpoint error.

**Prerequisites:** Old chart, tide-board observation and fixed-landmark observation. Their acquisition order does not matter.

**Obstacle:** Floating markers are unreliable reference points. The first comparison from the tavern window was only suggestive.

**Solution:** Use chart on the marked sighting cleat. In a readable close-up, match two simple chart symbols to the warehouse corner and lighthouse notch. These are labelled choices, not a precision dragging exercise.

**What Nell establishes:** The old chart refers to the channel she is observing; the company's new arrow indicates a different route. The tide board predicts the usual local ebb direction. She now has a baseline to test.

> **Nell:** “The buildings haven't moved. Reassuring, if you're a building.”
>
> **Nell:** “This is the right channel. Now let's see whether the water agrees with the sign.”

**Wrong match:** “That's a floating marker. If it drifts, my whole argument drifts with it.” The symbols remain available; nothing resets.

**Using the chart without the other observations:** Nell names the missing information: “I need the tide phase” or “I should identify the fixed marks first.” The close-up can be closed freely.

**Hint ladder:** Orin explains fixed marks → cleat inscription gives the two landmarks → help highlights their matching chart symbols.

### Puzzle P4 — A float, not a theory

**Goal:** Observe the direction of water movement independently of the company's signs.

**Obstacle:** The tethered indicator is snagged and tells Nell nothing while stuck.

**Clues:** Its line leads to a labelled observation cleat; the bolt is visibly catching it; the boathook is within reach and explicitly a public tool.

**Solution:** Use boathook on float. Nell lifts the line off the bolt, places the hook back in the rack and watches the float settle into its downstream position.

**Wrong approaches:**

- Pull line directly: “That tightens the snag. I need to lift it.”
- Take float: “This works better when it stays in the water.”
- Use chart on float: “Paper is an excellent current indicator exactly once.”
- Use sword: It is not in inventory. Do not invent a weapon dependency.

**Reward:** A reliable, reusable observation tool. No new pocket item and no consumable resource.

### The concluding observation — controlled story event

Once P3 and P4 are complete, the interaction becomes **“Watch the channel.”** It remains available until the player chooses it. Nobody must wait for a random boat, synchronise a real clock or click within a timing window.

The player can pause, skip animation or replay the observation. Equivalent text describes every important visual and sound cue.

**Sequence:**

1. The freed float settles into the ordinary ebb direction shown on the local tide board.
2. The company buoy signals three amber flashes; a short bell pattern repeats them.
3. The float slackens and swings to the opposite side of its tether. A patch of floating leaves confirms the new direction.
4. The company launch enters immediately, following the new arrow through the changed channel.
5. The old tide board still shows ebb. No storm or tide-phase change has occurred during the observation.

Do not present this as proof that every contrary current must be artificial. The suspicious evidence is the **abrupt change, its coordination with a company signal and a prepared vessel**, not just water flowing in an unexpected direction.

> **Nell:** “A current can surprise a chart. That's why people like me get work.”
>
> **Nell:** “But the bell knew first. And that boat was ready.”
>
> **Nell:** “Someone knows something the rest of the harbour doesn't.”

### Puzzle P5 — Put observations before accusations

**Goal:** Turn the event into a usable lead for Act II.

The notebook shows a short, persistent timeline of the event and asks Nell what she can actually support. This is a simple evidence-selection interaction, not a memory test.

**Select three supported statements:**

- The local tide board still indicated ebb.
- The signal came immediately before the change in flow.
- A company launch used the changed route without hesitation.

**Optional false conclusions:**

- “The company controls the entire sea.” → “I have observed one channel, not interviewed an ocean.”
- “Orin's ship was stolen.” → “Possible. Not something this tells me.”

Incorrect selections can be removed immediately; hints point back to the timeline. An accessible “Review what I saw” button presents the three observations in plain language.

**Conclusion recorded:** “The change was local and coordinated with company traffic. Find out who operates the signals and whether this has happened before.”

**Purpose:** Establish Nell as a careful investigator and avoid revealing the full plot through a premature deduction.

### Act-ending choice

After the supported observations are recorded, Nell chooses a next step. Each choice adds a lead and completes Act I; it does not create a different campaign.

| Choice | Nell's proposed line | Act II lead |
| --- | --- | --- |
| Ask who else has seen it | “If the harbour's doing tricks, somebody has already written a terrible headline.” | Pip's newspaper |
| Follow the hardware | “Someone built that signal. Someone may remember how it's meant to work.” | Repair yards; later the maker's mark leads to Rook |
| Revisit Orin's missing ship | “An official marker sent Orin to the wrong berth. I'd like to see which one.” | Missing-vessel investigation |

If the player wants to revisit Mara or the bridge first, allow it. The notebook retains all three leads; the chosen one is simply marked as the current intention.

## 7. Conversations on returning to earlier rooms

Avoid making solved locations feel abandoned. Give each main character one short update after the observation, without requiring another circuit of the harbour.

| Character | Player topic | Proposed response |
| --- | --- | --- |
| Mara | “A company boat knew when the current would turn.” | “Then write down what you saw. People argue less successfully with a date and a drawing.” |
| Orin | “The signal came before the change.” | “Then start with the signal, not with my reputation. One of those can still be repaired cheaply.” |
| Quibble | “The company's route seems to have an advantage.” | “Of course. Their signs are larger. Are we investigating that, or something worse?” |
| Fine Print | “What does their agreement actually say?” | “At present, that I should sign it before asking that question.” |

Mara does not confess her connection to the Tide Ledger here. Orin does not suddenly know where his ship is. Fine Print's legal expertise supplies a later thread, not an instant solution.

## 8. State and inventory design notes

These names are planning aids for later implementation, not a requirement to adopt a particular engine architecture.

### Persistent facts

| Fact | Set when | Enables |
| --- | --- | --- |
| `tankard_returned` | Tankard given to Mara | Key reward; warmer dialogue |
| `chart_obtained` | Key used on chest and chart retrieved | Chart close-up and comparison |
| `bridge_passage_granted` | At least three of five duel answers succeed | Permanent landing access |
| `welcome_payoff_seen` | Correct final reply or victory coda plays | Avoid duplicate cooperative ending |
| `tide_board_read` | Landing board inspected | Current-phase baseline |
| `fixed_marks_identified` | Distant marks inspected | Reliable comparison |
| `chart_compared` | Chart symbols matched at sighting cleat | Prepared observation |
| `float_freed` | Boathook used on snag | Prepared observation |
| `anomaly_witnessed` | Observation completed or its full text alternative read | Evidence-selection notebook entry |
| `evidence_recorded` | Three supported statements selected | Next-lead choice |
| `act_1_complete` | A next lead is chosen | Act II hub progression |
| `cupboard_joke_seen` | Optional cupboard interaction | Short repeat response only |

### Inventory changes

```text
Start:         Notebook / chart tab empty
Take tankard:  + Tankard
Return it:    - Tankard, + Brass key
Open chest:   - Brass key, + Old survey in document tab
End of act:   Notebook + Old survey + observation sketches
```

The practice sword and boathook are contextual tools that return to their original places. No essential document can be given away during Act I. Vane's later chart transaction is a separately signposted story event.

### Saving and recovery

- A full save must include room, inventory/documents, clue facts, permanent passage and notebook entries. Session-only travel persistence is not sufficient for the story version.
- Save during a duel restores at the start of the current exchange, with already resolved scores intact. No duplicate scoring on reload.
- Save during the channel observation restores a replayable observation prompt; if the evidence was already recorded, preserve it.
- Re-entering a room never respawns a returned tankard, grants another key or relocks the opened chest.
- A developer's “reset room” control should be separated from ordinary story play so it cannot accidentally erase required cross-room facts.

## 9. Art, animation and audio requirements

| Area | Reuse | Proposed additions |
| --- | --- | --- |
| Tavern | Existing background, Nell/Mara/Orin sprites, tankard, key, chest | Cupboard detail; chart pickup/read animation; key-on-hook state; optional newspaper/work notice detail |
| Bridge | Existing background, fencing art, parrot, blades and generated duel voices | Public plaque, overlapping notices, sword peg; approach/exits integrated with room navigation |
| Outer landing | Existing visual palette and company design language | One background; board and marker close-ups; float/hook rig; signal buoy; company launch silhouette |
| Notebook | Existing story chart as reference | Legible old survey detail, landmark symbols, observations timeline and three lead entries |
| Motion | Existing tweened fencing | Float snag/free/reversal; buoy flashes; launch crossing; brief cupboard gag |
| Audio | Existing tavern/bridge ambience and suitable voice clips | Landing water/rigging loop; float creak, short buoy signal, boat pass; new character lines |

**Voice direction:** Nell thinks before she jokes; Mara is dry rather than cryptic; Orin overexplains when embarrassed; Quibble treats a small bridge like a grand stage; Fine Print is quick and proprietorial. Do not make the parrot so fast that clues become difficult to follow.

Record new lines only after this document's dialogue is approved editorially. Reuse existing recordings when text and context still fit. Every essential sound has a written and visual equivalent; dialogue can be replayed without restarting a puzzle.

## 10. Prototype changes to make later

| Current prototype | Proposed Act I behaviour |
| --- | --- |
| Chart exists as narration after chest opens | Actual persistent chart document with a usable close-up |
| Key remains in Nell's pockets | Automatically returned to chest hook when its purpose is complete |
| Tavern door jumps directly into duel page | Arrive at an explorable bridge approach with optional dialogue and retreat |
| Duel page has no onward room | Permanent far exit to outer landing after victory |
| Victory can omit the cooperative reply | Short conditional coda preserves the story's intended payoff |
| Tavern progress passed through session storage | Shared story save covers all rooms and evidence |
| No current-measurement investigation | Add landing, comparison, float and repeatable observation |
| Optional development resets exposed | Keep story-safe restart/load controls separate from test tools |

These are changes for the next implementation pass. Nothing in this document says they already exist.

## 11. Playthrough checks for the future implementation

- [ ] Complete the normal route: tankard → chart → duel → landing → observation → next lead.
- [ ] Win the duel before obtaining the chart; return for it without losing passage.
- [ ] Pick up and return the tankard before discussing work or the chest.
- [ ] Inspect every landing clue before acquiring the chart; later comparison uses remembered facts.
- [ ] Free the float before comparing the chart, and complete the prerequisites in the opposite order.
- [ ] Win three exchanges while missing the final answer; see the welcome coda once.
- [ ] Lose a duel, leave, return and win; no item or story progress is lost.
- [ ] Leave the landing before observing; the event remains available on return.
- [ ] Skip/replay the observation and still receive all evidence in accessible form.
- [ ] Select unsupported conclusions, correct them and finish without restarting.
- [ ] Play without sound, with reduced motion, on touch and through the accessible target list.
- [ ] Finish the entire act without finding the Easter egg.
- [ ] Trigger the cupboard joke before reading its note; it remains understandable and optional.
- [ ] Save/reload in each room and during the duel; no duplicate rewards or scores appear.
- [ ] Return after Act I completion; characters acknowledge the event and all three investigation leads remain available.

## 12. Editorial questions before implementation

- [ ] Does three rooms feel right, or should the landing be a walkable extension of the bridge?
- [ ] Keep both the chart-comparison and evidence-selection interactions, or simplify the latter to a single notebook confirmation for pace?
- [ ] Keep the company's manipulation understated until Act II, as proposed?
- [ ] Keep the Space Quest cupboard joke, including the explicit title pun, or prefer a subtler reference?
- [ ] Keep all five prototype duel exchanges and the victory coda?
- [ ] Should the act open with Nell entering the tavern or already studying its noticeboard?
- [ ] Approve the speaking-line draft before expanding the generated audio library.

**Recommended next implementation slice:** Make the chart a persistent document and connect the tavern to an explorable bridge approach. Then build the landing's observation sequence before polishing optional interactions.
