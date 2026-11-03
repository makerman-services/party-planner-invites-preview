/* Decor, games, checklist, invites. Slots: {c1} {c2} {c3} colours, {m1} {m2} {m3} motifs, {mat} {mat2} materials, {light}, {backdrop}, {spot} a venue spot, {theme} theme name. */
PP.DECOR = {
 'Entrance & welcome':[
  'An organic balloon garland in {c1}, {c2} and {c3} curling around the {spot}, with a few {m1} tucked in.',
  'A welcome sign on an easel in {c1} with {m1} doodles and the party name in big letters.',
  'A path of {light} leading guests to the {spot}, with {m2} markers every few metres.',
  'A {mat} runner at the door and a basket of {m1}-themed name stickers so guests can say hi.',
  'A "this way to the party" trail of {c2} arrows cut from card, each with a tiny {m2}.',
  'Two tall {c1} balloon columns either side of the {spot}, topped with a {m3} cut-out.',
  'A potted-plant pair dressed with {mat} bows in {c2} to frame the {spot}.'],
 'Photo backdrop':[
  '{backdrop}.',
  'A {c1} fabric drape with a {c2} balloon cluster in one corner and a hand-lettered sign: the hashtag or party name.',
  'A DIY prop box full of {m1}, {m2} and {m3} cut-outs on sticks for silly photos.',
  'A {mat} panel wall layered with {c3} paper flowers and a few hanging {m1}.',
  'A "frame" made from a big painted picture frame in {c2}, hung with {light} so photos glow.',
  'A polaroid-style corner: a string of pegs where guests clip instant photos and write a message.'],
 'Tables':[
  '{c3} tablecloths with a {c1} runner and a small cluster of {m1} in the middle.',
  'Low centrepieces of {mat} and greenery so guests can still see each other across the table.',
  'Mismatched jars filled with {c2} flowers and LED tea lights with screw-secured battery compartments (keep spare batteries away from kids).',
  'Paper napkins in {c1} folded into a pocket with a tiny {m2} tag on each.',
  'Scatter {c2} confetti in clusters (biodegradable paper only) around a single {m3} centrepiece.',
  'A table number or name card on each table shaped like a {m1}.',
  'A {mat2} placemat at each seat with a {c3} ribbon tied around the cutlery.'],
 'Ceiling & overhead':[
  'Paper fans and tassels in {c1}, {c2} and {c3} hung at different heights over the food table.',
  'Streamers twisted from the centre of the ceiling out to the corners in {c1} and {c2}.',
  'Hanging {m1} cut-outs on fishing line so they look like they float.',
  'Festoon or fairy lights zig-zagged overhead for a {light} feel after dark.',
  'A few big {c3} paper lanterns grouped in odd numbers over the main table.'],
 'Food & cake table':[
  'Platters at three heights (use upturned boxes under the cloth) with {c1} labels for each dish.',
  'A cake stand dressed with a {c2} ribbon and a {m1} topper.',
  'Little flag picks in {c3} naming each dish, plus a dietary key (V, GF, contains nuts).',
  'A {mat} tray of serviettes and cutlery rolled and tied in {c2}.',
  'A dessert board laid out in a rainbow from {c1} to {c3}.',
  'A drinks tub filled with ice, a {c1} sign and a jug of water with sliced citrus.'],
 'Lighting & mood':[
  '{light}, switched on just before sunset.',
  'Dim the main lights and use lamps and {light} for a warmer room.',
  'LED tea lights with screw-secured battery compartments (keep spare batteries away from kids), in {c2} jars along windowsills and steps.',
  'One coloured uplight in {c1} washing the backdrop wall.',
  'A playlist of {music} at a level where people can still talk.'],
 'Take-home favours':[
  'A small {c1} bag with a {m1} sticker and a sweet or two.',
  'Mini potted seedlings with a "thanks for growing with us" tag.',
  'A cookie decorated with a {m2} in {c2} icing, wrapped in cello.',
  'A photo strip from the backdrop corner as the favour.',
  'Seed paper cards in {c3} that guests can plant at home.',
  'A tiny jar of homemade jam or spice mix with a {m3} label.'],
};
PP.DECOR_SPOT = {home:['front door','gate','hallway','back deck steps','garage entry'],park:['picnic shelter','tree you set up under','gazebo','path from the car park'],hall:['hall entry doors','foyer','stage edge','welcome table'],restaurant:['room entry','welcome table','bar end of the room']};
PP.DECOR_VENUE = {
 home:['Clear one room or the deck as the party zone and keep bedrooms closed.','Set up the night before so the morning is just food.'],
 park:['Book the shelter or area with the local council if needed, and check their rules on decorations, music and glass.','Weigh balloons down and use pegs or clips for tablecloths: wind is the enemy.','Use biodegradable paper confetti only, and take every balloon and scrap home.','Bring shade, sunscreen and a big water container for summer days.'],
 hall:['Ask the hall what you can stick to walls: many ban tape and poster putty, so use free-standing frames.','Confirm setup and packdown times, and who holds the keys.'],
 restaurant:['Ask the restaurant what decor they allow; most are happy with centrepieces and a cake.','Check if there is a cakeage fee and whether you can arrive early to set up.'],
};
PP.DECOR_TYPE = {
 kidbday:['A big number {age} balloon in {c1} as the star of the room.','A "birthday crown" station where kids decorate their own.'],
 teenbday:['Let the birthday teen choose the playlist and the backdrop sign wording.','A neon-style name sign in {c2} they can keep in their room after.'],
 b18:['A giant "18" in {c1} balloons and a memory board of photos from baby to now.','A guest book that is a big framed print everyone signs.'],
 b21:['A "21" balloon numeral with a key prop for the traditional key moment.','A timeline of photos from each year, 1 to 21.'],
 b30:['A "30" marquee number and a "then and now" photo wall.'],b40:['A "40" balloon numeral and a "40 things we love about you" board.'],b50:['A gold "50" numeral and a decade-by-decade photo timeline.'],b60:['A "60" numeral and a table of memory photos from each decade.'],
 engagement:['A neon-style "engaged" sign and a framed photo of the couple.','A wishes jar and cards for advice for the couple.'],
 wedding:['An aisle or entrance lined with {mat} lanterns and greenery.','A seating chart board in {c1} with {m1} accents.','A sweetheart table with {light} behind it.'],
 babyshower:['A nappy cake centrepiece tied with {c2} ribbon.','A "guess the due date" board and a message-for-baby card station.'],
 genderreveal:['A reveal box of {c1} and {c2} balloons, or a cake with coloured filling. Skip smoke bombs and fireworks: they cause fires and injuries.','"Team boy" and "team girl" stickers in two colours at the door.'],
 christening:['A white or {c1} candle display with the child\'s name.','A framed welcome with the date and a simple olive-branch motif.'],
 eid:['An "Eid Mubarak" banner in {c1} and {c3} and a cluster of lanterns.','A small Eidi envelope station for the kids.','A date and sweets table under the lanterns.'],
 christmas:['A tree or a gum-branch tree dressed in {c1} and {c2}.','A Secret Santa table with name tags.'],
 newyear:['A big clock face showing midnight, plus a countdown banner.','Party hats and noisemakers in {c3} on every table for midnight.'],
 graduation:['A "congrats grad" banner and a mortarboard photo prop.','A memory board with notes of advice for the graduate.'],
 bbq:['Bunting along the fence in {c1} and {c2}.','A chalkboard "today on the grill" menu.'],
 corporate:['Your own company logo on the welcome screen and name badges (no other brands).','A small awards or thank-you moment backdrop.'],
 housewarming:['Little signs labelling each room for the house tour.','A "wishes for our new home" board by the door.'],
 retirement:['A "happy retirement" banner and a timeline of career highlights.','A world map for "where to next?" travel suggestions.'],
};
// games: name | ages t toddler k kids w tweens e teens a adults s seniors | where i o b | mins | needs | how
PP.GAME_SRC = `
Pass the parcel|t,k|i|15|a wrapped parcel with a small treat in each layer, music|Pass the parcel while music plays; when it stops, the holder unwraps one layer. Put a small treat in every layer so everyone wins something.
Musical statues|t,k|b|10|music|Dance while the music plays and freeze when it stops. Anyone who wobbles does a silly pose for the next round instead of going out.
Bubble chase|t|o|10|bubble wands or a bubble machine|Blow bubbles and let little ones chase and pop them.
Sticker treasure hunt|t,k|b|15|stickers, a simple map|Hide big stickers at toddler height and give each child a card to fill.
Teddy bear's picnic|t|b|20|teddies, a rug, toy cups|Each child brings a teddy for a pretend picnic and a song.
Ring-a-rosie and action songs|t|b|10|none|Classic circle songs with actions led by a grown-up.
Pin the tail|t,k|i|15|a poster, sticky tails, a blindfold (optional)|A themed pin-the-tail poster: pin the {m1} on the picture.
Treasure hunt|k,w|b|25|clues, a treasure box|Hide 6 to 8 clues around the space leading to a box of {m1} treasure.
Sack race|k,w,e|o|15|old pillowcases or hessian sacks|Hop to the finish line. Mix up the heats so everyone gets a turn.
Egg and spoon race|k,w|o|10|spoons, plastic eggs or potatoes|Race with an egg balanced on a spoon.
Piñata (made at home)|k,w|o|15|a homemade papier-mâché piñata, soft stick|Blindfolded, kids take turns from youngest to oldest. Keep others well back.
Musical chairs|k,w|i|15|chairs, music|Classic musical chairs; the out players become DJs.
Freeze dance|k,w,e|b|10|music|Dance, freeze when the music stops, best freeze wins.
Simon says|t,k|b|10|none|The leader gives instructions; only follow those that start with "Simon says".
Limbo|k,w,e,a|b|10|a pole or broom, music|How low can you go? Lower the bar each round.
Water balloon toss|k,w,e|o|15|water balloons, towels|Pairs toss a water balloon and step back each round. Pick up every scrap after.
Cupcake decorating|k,w|i|20|plain cupcakes, icing, sprinkles|Each child decorates and takes home their own.
Craft table|t,k,w|i|25|paper, stickers, glue, crayons|A {theme} craft: make your own {m2} masks or crowns.
Face painting corner|t,k|b|30|skin-safe face paints, wipes|A parent or hired face painter does simple {m1} designs. Patch test for sensitive skin.
Obstacle course|k,w|o|20|hoops, cones, a tunnel|Time each child through a backyard course.
Hot potato|t,k|b|10|a ball or soft toy, music|Pass the "hot potato" quickly; holding it when music stops means a silly forfeit.
Duck duck goose|t,k|o|10|none|Sit in a circle; the tapper chooses a "goose" who chases them.
Scavenger photo hunt|w,e,a|b|30|phones, a list|Teams photograph a list of {theme} challenges in 20 minutes.
Minute to win it|w,e,a|i|30|cups, ping pong balls, biscuits, string|Quick 60-second challenges like stacking cups or moving a biscuit from forehead to mouth.
Karaoke|w,e,a,s|i|45|a speaker, lyrics on a TV|Sing-along hits; set up a "song request" jar.
Charades|w,e,a,s|i|30|cards with prompts|Act out {theme}-themed words and films in teams.
Pictionary on a big pad|k,w,e,a|i|30|a flip chart or big paper, markers|Draw and guess in teams.
Trivia quiz|e,a,s|i|40|question sheets, pens|5 rounds of 5: general knowledge, music, the guest of honour, {theme}, and a picture round.
"Who knows them best?" quiz|e,a,s|i|20|question cards|Questions about the guest of honour; the closest answers win.
Backyard cricket|k,w,e,a|o|45|a bat, tennis ball, bin for stumps|Classic rules: one hand one bounce, over the fence is out.
Giant Jenga|k,w,e,a,s|o|30|giant timber blocks (hire or DIY)|Write dares or questions on blocks for a twist.
Cornhole / bean bag toss|k,w,e,a,s|o|30|boards and bean bags|Teams throw bean bags at a board with a hole; 3 points in, 1 on the board.
Ring toss|t,k,s|b|15|rings, bottles or pegs|Toss rings onto pegs; score points.
Lawn bowls (backyard style)|e,a,s|o|30|a lawn bowls or boules set|Roll closest to the jack.
Two truths and a lie|e,a|i|20|none|Each person says three facts; others guess the lie.
Speed meet|a|i|20|a timer, question cards|Mingle in 2-minute pairs with fun question cards. Great for guests who don't know each other.
Name that tune|e,a,s|i|20|a playlist|Play 5 seconds of songs from the guest of honour's favourite eras.
Photo booth with props|k,w,e,a,s|i|60|a backdrop, props, a phone on a tripod|Self-serve photos all night.
Dance-off|w,e,a|i|20|music|Teams pick a song and do a dance; guests vote by cheering.
Murder mystery (family-friendly)|e,a|i|90|a printed kit or a homemade story|Guests get characters and clues to solve a playful mystery.
Silent disco|e,a|b|60|hired wireless headphones|Two or three music channels; great where noise rules apply.
Bingo|k,s,a|i|30|bingo cards, a caller|Use {theme}-themed bingo or classic numbers. Small prizes, no money.
Board game corner|w,e,a,s|i|60|a pile of board and card games|A quiet corner for guests who don't dance.
Paint and sip (mocktail-friendly)|e,a|i|60|small canvases, paints, aprons|Everyone paints the same {m1} picture; compare results.
Guess the baby photo|a,s|i|15|baby photos of guests|Match guests to their baby photos.
Advice cards|a,s|i|10|cards and pens|Guests write advice or wishes for the guest of honour.
Baby bingo|a,s|i|20|bingo cards of likely gifts|Tick off gifts as the parent-to-be opens them.
Guess the bump|a,s|i|10|ribbon or string|Guests cut string to the length they think fits around the bump.
Nappy race|a|i|10|dolls, nappies|Fastest to put a nappy on a doll wins.
Old and young tug of war|k,w,e,a|o|10|a long rope|Kids vs adults, on soft grass.
Lucky door prize|k,w,e,a,s|i|5|ticket numbers, a prize|Every guest gets a number at the door; draw at the end.
Eid gift hunt|t,k,w|b|20|small wrapped gifts or Eidi envelopes|Hide small gifts for children to find, then share sweets together.
Secret Santa|w,e,a,s|i|20|wrapped gifts with a price cap|Draw names a few weeks before with a set gift limit.
Midnight countdown|e,a|i|10|a big screen or clock|Everyone gathers for a 10-second countdown and a cheer.
Memory lane slideshow|a,s|i|15|a TV, photos|A slideshow of highlights while guests share stories.
Speeches and toasts (non-alcoholic option ready)|a,s|i|20|a mic|Two or three short speeches; keep each under 3 minutes.
`;
PP.AGE_GROUPS = {t:'Toddlers (1–4)',k:'Kids (5–8)',w:'Tweens (9–12)',e:'Teens (13–17)',a:'Adults',s:'Older guests'};
PP.GAMES = PP.GAME_SRC.trim().split('\n').map((l,i) => { const [n,a,w,m,nd,h] = l.split('|'); return {id:'g'+i,n,ages:a.split(','),w,mins:+m,needs:nd,how:h}; });
PP.GAME_TWISTS = ['Theme twist: hand out {m1} stickers as prizes instead of lollies.','Theme twist: dress the winners in a {c1} sash.','Theme twist: use {m2} cut-outs as score markers.','Theme twist: play it to {music}.','Theme twist: give each team a {theme} name.','Theme twist: decorate the finish line with {c2} streamers.'];
// checklist: bucket | text | condition (* = always; types=...; venue=...; alc; kids; theme)
PP.TASK_SRC = `
8|Lock in the date and a rough guest number|*
8|Set the total budget and agree who pays for what|*
8|Book the venue and pay the deposit|venue=hall,restaurant
8|Check the council rules and book a park area if needed|venue=park
8|Pick a backup indoor space in case of rain|venue=park,home
8|Choose the theme and colour palette|*
8|Start the guest list|*
8|Shortlist entertainment (DJ, band, entertainer, photo booth)|types=b18,b21,b30,b40,b50,b60,engagement,wedding,corporate,newyear,kidbday
8|Book a photographer if you want one|types=wedding,engagement,b21,b50,b60,christening
8|Book a celebrant, church or place of worship|types=wedding,christening
8|Check the event budget against the per-head estimate|*
6|Send save-the-dates|types=wedding,engagement,b21,b40,b50,b60,corporate,retirement
6|Book a caterer or decide what you will cook|*
6|Order the cake or book a baker|*
6|Book hire items: tables, chairs, marquee, glassware|venue=home,park
6|Arrange a photographer or ask a friend to cover photos|*
6|Plan the menu and check guests' dietary needs|*
6|Order any personalised items (signs, favours, banners)|*
6|Book halal-certified catering or butcher|types=eid
4|Send invitations with an RSVP date|*
4|Book the entertainer or DJ|*
4|Plan the games and activities list|*
4|Buy or make decorations|*
4|Plan outfits for the guest of honour|*
4|Arrange the photo backdrop and props|*
4|Check public liability or the venue's insurance requirements|venue=hall,park
4|Plan the gender reveal moment (no smoke, fireworks or flares)|types=genderreveal
4|Organise the Secret Santa draw and price cap|types=christmas,corporate
4|Ask someone to MC or give a speech|types=b21,b30,b40,b50,b60,engagement,wedding,retirement,corporate
3|Draft the run sheet for the day|*
3|Buy party supplies: plates, cups, napkins, bin bags|*
3|Plan a playlist for each part of the party|*
3|Choose favours and buy or make them|*
3|Book a cleaner or line up a pack-down crew|*
3|Arrange first-aid kit and know the nearest medical centre|kids
3|Order a slideshow or memory board photos|types=b18,b21,b40,b50,b60,retirement,graduation
3|Plan responsible serving: a non-drinking host, water stations, food all night and safe rides home|alc
2|Chase RSVPs and finalise numbers|*
2|Confirm the caterer, cake and entertainer|*
2|Write the shopping list for non-perishables|*
2|Make and freeze make-ahead food|*
2|Tell the neighbours about the party and the finish time|venue=home
2|Plan parking and send directions|*
2|Prepare speeches or a few words of thanks|*
2|Set up a seating plan|types=wedding,engagement,b50,b60,corporate,christening
1|Confirm the final numbers with the venue or caterer|*
1|Buy non-perishable food and drinks|*
1|Do a run-through of the run sheet with helpers|*
1|Charge the speaker, make the playlist offline|*
1|Prepare the kids' activity table and prizes|kids
1|Check the weather forecast and plan shade or heating|*
1|Get cash or a card for last-minute payments|*
1|Print signs, place cards and the menu|*
1|Check the kids' allergies with parents|kids
d3|Buy fresh food and flowers|*
d3|Clean the house and clear the party space|venue=home
d3|Make sauces, dips and desserts that keep|*
d3|Pack a party kit: tape, scissors, string, pens, lighter, first aid|*
d3|Confirm deliveries and pickups with times|*
d1|Set up decorations and the backdrop|venue=home,hall
d1|Pick up hire items and the cake (or confirm delivery)|*
d1|Chill drinks and make plenty of ice room|*
d1|Lay out serving platters with labels|*
d1|Pack the car for the park: shade, rugs, eskies, bins|venue=park
d1|Prep salads and cut vegetables|*
d1|Lay out outfits and charge phones|*
d0|Set up the food and drinks stations|*
d0|Collect bagged ice in the morning|*
d0|Check bathrooms: soap, towels, toilet paper|venue=home
d0|Welcome guests and enjoy it|*
d0|Hand out favours as guests leave|*
d0|Pack down, sort recycling, and take all rubbish home|venue=park
d0|Make sure everyone has a safe way home|alc
d0|Send a thank-you message to helpers|*
`;
PP.TASKS = PP.TASK_SRC.trim().split('\n').map((l,i) => { const [b,t,c] = l.split('|'); return {id:'t'+i,b,t,c}; });
PP.BUCKETS = [['8','8 weeks to go',56],['6','6 weeks to go',42],['4','4 weeks to go',28],['3','3 weeks to go',21],['2','2 weeks to go',14],['1','1 week to go',7],['d3','3 days to go',3],['d1','The day before',1],['d0','On the day',0]];
PP.INVITE = {
 tones:{fun:'Fun',elegant:'Elegant',casual:'Casual',heartfelt:'Heartfelt'},
 open:{
  fun:['Pop the date in your calendar,','Grab your party shoes,','Big news, party people:','Clear your diary,','Ready, set, celebrate:','Cue the confetti!'],
  elegant:['You are warmly invited','The pleasure of your company is requested','Please join us','We would be honoured by your presence','Kindly save the evening'],
  casual:['Come hang out!','Swing by,','Keen?','Pull up a chair,','Bring your appetite,'],
  heartfelt:['It would mean the world to have you there.','We would love to share this with you.','Some days are better with the people we love.','Your company is the best gift.'],
 },
 why:{
  kidbday:['{hon} is turning {age}!','It\'s {hon}\'s {ageth} birthday!','{hon} is {age} and ready to party!'],
  teenbday:['{hon} is turning {age}!','{hon}\'s {ageth} birthday is here.'],
  adultbday:['{hon} is celebrating another trip around the sun.','It\'s {hon}\'s birthday!','Help us celebrate {hon}\'s birthday.'],
  b18:['{hon} is turning 18!','18 years of {hon}!'],b21:['{hon} is turning 21!','21 years of {hon}: let\'s celebrate.'],b30:['{hon} is turning 30!','Thirty and thriving: it\'s {hon}\'s 30th.'],b40:['{hon} is turning 40!','Fabulous at forty: {hon}\'s 40th.'],b50:['{hon} is turning 50!','Half a century of {hon}!'],b60:['{hon} is turning 60!','Sixty years young: {hon}\'s 60th.'],
  engagement:['{hon} are engaged!','Celebrate the engagement of {hon}.'],
  wedding:['to celebrate the marriage of {hon}.','as {hon} celebrate their wedding.'],
  babyshower:['A little one is on the way for {hon}!','Shower {hon} with love before baby arrives.'],
  genderreveal:['Pink or blue? Find out with {hon}.','The big reveal for {hon}\'s little one.'],
  christening:['to celebrate the christening of {hon}.','as we welcome {hon} with family and friends.'],
  eid:['Eid Mubarak! Join us to celebrate Eid together.','Let\'s celebrate Eid with family, friends and plenty of sweets.'],
  christmas:['It\'s our Christmas get-together!','Celebrate the festive season with us.'],
  newyear:['Let\'s ring in the new year together.','Say goodbye to the old year and hello to the new.'],
  graduation:['{hon} has graduated!','Hats off to {hon}, the graduate!'],
  bbq:['The BBQ is on.','We\'re firing up the barbie.'],
  corporate:['Join the team to celebrate.','You\'re invited to our team celebration.'],
  housewarming:['{hon} have moved in: come see the new place!','Help us warm up our new home.'],
  retirement:['{hon} is retiring!','Celebrate {hon}\'s retirement with us.'],
 },
 close:{
  fun:['Come hungry, leave happy.','Dancing shoes optional, fun compulsory.','See you there!','It won\'t be the same without you.'],
  elegant:['We look forward to celebrating with you.','With warm regards.','Your presence is gift enough.'],
  casual:['No need to bring anything but yourself.','See you then!','Bring a chair if you have one.'],
  heartfelt:['With love.','We can\'t wait to see you.','Thank you for being part of our lives.'],
 },
 themeLine:['Theme: {theme}. {dress} encouraged.','Dress code: {dress}.','Come dressed for {theme}: {dress}.'],
};
