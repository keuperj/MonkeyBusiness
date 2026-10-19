export const cast = {
 NELL: { name:'Alice', voice_id:'Xb7hH8MSUJpSbSDYk0k2', direction:'Clear, lively young adventurer; curious and dryly amused.', settings:{stability:.45,similarity_boost:.75,style:.3,speed:1.04} },
 MARA: { name:'Matilda', voice_id:'XrExE9yKIg1WjnnlVkGX', direction:'Warm, grounded tavern keeper; measured delivery and dry humour.', settings:{stability:.55,similarity_boost:.75,style:.25,speed:.94} },
 ORIN: { name:'Bill', voice_id:'pqHfZKP75CvOlQylNhV4', direction:'Low, seasoned older navigator; unhurried storyteller.', settings:{stability:.6,similarity_boost:.75,style:.25,speed:.9} }
};
export const conversations = {
 MARA: [
 'If you came for a room, the roof only leaks on the expensive side.',
 'You have the key. Consider it payment for services to tidiness.',
 'An old chart. Bring back my brass tankard from the window table and you can have the key.',
 'Look before you pick things up. Then pick them up anyway. That seems to be how adventurers work.',
 'My tankard! Here, take the chest key. The chart inside deserves some fresh air.'
 ],
 ORIN: [
 'I haven’t lost my ship. I know exactly which ocean it’s in.',
 'That chart marks Bellweather Shoal. Bring a boat. I’ve tried walking.',
 'Mara keeps a chart in that chest. She might part with the key if you help clear up.',
 'I got lost professionally until someone started paying me.'
 ],
 NELL: [
 'A warm fire. A cold harbour. And absolutely no plan.',
 'What’s in the sea chest?', 'Any advice for a new arrival?', 'Where should I start?',
 'How did you become a navigator?', 'I’ll let you get back to it.'
 ]
};
export const effects = {
 'tavern-ambience':{text:'Quiet interior of a small wooden seaside tavern at night. Gentle close fireplace crackle, distant soft harbour waves and occasional low timber creaks. Calm warm intimate atmosphere, no music, no speech, no loud events. Seamless background loop.',duration_seconds:20,loop:true},
 footsteps:{text:'Steady unhurried footsteps of one person in soft leather boots walking on old wooden tavern floorboards. Quiet rhythmic hollow footfalls and subtle wood creaks, close dry recording, no voices or music. Seamless loop.',duration_seconds:4,loop:true},
 pickup:{text:'Single brass tankard lifted from a wooden table, short light metallic clink and faint scrape. Close dry game sound effect, no voices or music.',duration_seconds:1.2},
 exchange:{text:'Brass tankard set gently on a wooden counter, followed by a small brass key jingling into a palm. Two delicate metallic clinks. Close dry game sound effect, no speech, no music.',duration_seconds:2},
 unlock:{text:'A small brass key turns in an old lock with a satisfying click, then a wooden sea chest lid creaks open softly. Close dry game sound effect, no voices or music.',duration_seconds:2.5}
};
