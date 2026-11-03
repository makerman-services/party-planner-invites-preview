/* My Party content library, part 1: party types, budget model, themes. Original content by Makerman Services. */
window.PP = window.PP || {};
// id, name, group, alcohol(0 none,1 allowed,2 allowed default off), kidsLikely, honoree label, default themes, typical guests, typical budget, food style, typical per-head A$ [low,high]
PP.TYPES = [
 ['kidbday',"Kids' birthday",'Birthdays',0,1,"Birthday child",['dino','space','unicorn','jungle','superhero','under-sea','rainbow','construction','fairy','pirate'],20,500,'grazing',[15,40]],
 ['teenbday',"Teen birthday (13–17)",'Birthdays',0,1,"Birthday teen",['neon','movie','gaming','festival','tropical','retro'],20,600,'grazing',[20,45]],
 ['adultbday',"Adult birthday",'Birthdays',1,0,"Birthday guest of honour",['cocktail','tropical','retro','garden','black-gold','boho'],30,1200,'grazing',[30,70]],
 ['b18',"18th birthday",'Milestones',2,0,"The 18-year-old",['neon','hollywood','festival','black-gold','y2k','casino'],50,2000,'grazing',[30,60]],
 ['b21',"21st birthday",'Milestones',1,0,"The 21-year-old",['black-gold','hollywood','neon','y2k','casino','garden'],60,2500,'buffet',[35,70]],
 ['b30',"30th birthday",'Milestones',1,0,"The birthday 30-year-old",['dirty-thirty','cocktail','disco','garden','black-gold','tropical'],40,2000,'grazing',[35,75]],
 ['b40',"40th birthday",'Milestones',1,0,"The birthday 40-year-old",['gatsby','disco','black-gold','garden','casino','cocktail'],50,3000,'buffet',[40,90]],
 ['b50',"50th birthday",'Milestones',1,0,"The birthday 50-year-old",['gold','gatsby','garden','retro','mediterranean','black-gold'],60,3500,'buffet',[45,100]],
 ['b60',"60th birthday",'Milestones',1,0,"The birthday 60-year-old",['diamond','garden','mediterranean','gold','retro','gatsby'],60,3500,'sitdown',[45,100]],
 ['engagement',"Engagement party",'Love & family',1,0,"The happy couple",['blush','garden','boho','mediterranean','black-gold','fairy-lights'],80,5000,'grazing',[45,100]],
 ['wedding',"Wedding reception",'Love & family',1,0,"The newlyweds",['blush','garden','boho','mediterranean','black-gold','classic-white','rustic'],100,20000,'sitdown',[100,250]],
 ['babyshower',"Baby shower",'Love & family',0,0,"The parent-to-be",['oh-baby','safari','clouds','garden','boho','teddy'],25,800,'brunch',[25,55]],
 ['genderreveal',"Gender reveal",'Love & family',0,1,"The parents-to-be",['he-or-she','clouds','oh-baby','garden','rainbow','teddy'],30,700,'grazing',[20,45]],
 ['christening',"Christening / baptism",'Love & family',0,1,"The little one",['classic-white','olive','clouds','garden','blush','teddy'],50,2000,'buffet',[30,70]],
 ['eid',"Eid celebration",'Cultural & seasonal',0,1,"Family & friends",['eid','lantern','gold','garden','mediterranean','emerald'],40,1500,'buffet',[25,60]],
 ['christmas',"Christmas party",'Cultural & seasonal',1,1,"Family & friends",['aussie-christmas','winter-wonderland','classic-christmas','tropical','gold','rustic'],30,1200,'buffet',[30,70]],
 ['newyear',"New Year's Eve",'Cultural & seasonal',1,0,"Everyone",['black-gold','disco','gatsby','neon','hollywood','silver'],40,1500,'grazing',[35,80]],
 ['graduation',"Graduation party",'Milestones',2,0,"The graduate",['grad','black-gold','garden','neon','retro','gold'],40,1200,'grazing',[25,55]],
 ['bbq',"Backyard BBQ",'Casual',1,1,"Mates & family",['aussie-summer','tropical','rustic','fiesta','retro','garden'],25,600,'bbq',[18,40]],
 ['corporate',"Corporate event",'Work',1,0,"The team",['corporate','black-gold','garden','retro','festival','cocktail'],80,6000,'grazing',[50,120]],
 ['housewarming',"Housewarming",'Casual',1,1,"The new home owners",['boho','garden','rustic','tropical','retro','mediterranean'],30,700,'grazing',[18,40]],
 ['retirement',"Retirement party",'Work',1,0,"The retiree",['gold','garden','tropical','travel','retro','gatsby'],40,2000,'buffet',[35,80]],
].map(a => ({id:a[0],name:a[1],group:a[2],alc:a[3],kids:a[4],hon:a[5],themes:a[6],guests:a[7],budget:a[8],style:a[9],ph:a[10]}));

PP.VENUES = {
 home:{name:'At home',icon:'🏡'}, park:{name:'Park / outdoors',icon:'🌳'}, hall:{name:'Hired hall',icon:'🏛️'}, restaurant:{name:'Restaurant / function room',icon:'🍽️'}
};
// Budget model: typical cost = fixed + perHead * guests. Venue changes the venue line and food style.
PP.BUDGET_CATS = [
 ['venue','Venue & hire','🏛️'],['food','Food','🍢'],['drinks','Drinks','🥤'],['decor','Decor','🎈'],['ent','Entertainment','🎶'],['cake','Cake & sweets','🎂'],['invites','Invitations & stationery','✉️'],['buffer','Buffer (just in case)','🛟']
];
PP.COST = { // per type tier: [fixed, perHead] per category (excluding buffer)
 kid:   {venue:[60,1],food:[30,9],drinks:[10,2.5],decor:[60,2.5],ent:[120,2],cake:[60,1.2],invites:[10,.5]},
 casual:{venue:[80,1.5],food:[40,14],drinks:[30,8],decor:[60,2],ent:[60,1.5],cake:[40,1],invites:[0,.4]},
 party: {venue:[200,4],food:[80,22],drinks:[60,12],decor:[150,4],ent:[300,3],cake:[80,2],invites:[20,1]},
 formal:{venue:[600,15],food:[200,55],drinks:[150,25],decor:[400,10],ent:[800,6],cake:[200,5],invites:[60,4]},
 work:  {venue:[400,10],food:[150,35],drinks:[100,18],decor:[200,4],ent:[400,4],cake:[60,1.5],invites:[0,.5]},
};
PP.TIER = {kidbday:'kid',teenbday:'kid',genderreveal:'casual',babyshower:'casual',bbq:'casual',housewarming:'casual',adultbday:'party',b18:'party',b21:'party',b30:'party',b40:'party',b50:'party',b60:'party',graduation:'party',christmas:'party',newyear:'party',eid:'party',christening:'party',retirement:'party',engagement:'formal',wedding:'formal',corporate:'work'};
PP.VENUE_MOD = { // multipliers on [fixed, perHead] for the venue line, plus shift in others
 home:{venue:[.35,.25],food:[1,.9],drinks:[1,.9]},
 park:{venue:[.45,.3],food:[1,.95],drinks:[1,.95],decor:[.8,.8]},
 hall:{venue:[1.6,1],food:[1,1],drinks:[1,1]},
 restaurant:{venue:[1.2,.4],food:[.5,1.6],drinks:[.6,1.3],decor:[.5,.5],ent:[.6,.6]},
};
PP.BUDGET_COVERS = {
 venue:{home:['table and chair hire','a marquee or shade sail','extra bins and a post-party clean','festoon or fairy-light hire','a portable toilet hire if numbers are big','glassware hire'],park:['council booking or shelter fee','portable shade or gazebo','folding tables and chairs','a picnic rug stack','a portable speaker battery pack','bin bags and a water container'],hall:['hall hire for setup to packdown','bond (usually refunded)','table and chair setup','cleaning fee','kitchen use','public liability check'],restaurant:['room hire or minimum spend','deposit to hold the date','cakeage fee','private room for speeches','AV hire for a playlist or slideshow']},
 food:['nibbles and platters','mains that suit the crowd','sides and salads','bread and dips','a kids\' plate','dietary options','serving platters and tongs'],
 drinks:['water stations and ice','soft drinks and juice','sparkling water and mocktails','tea and coffee','cups and a drinks tub'],
 decor:['balloons and a garland','table styling','a photo backdrop','lighting','flowers or greenery','signage','take-home favours'],
 ent:['a playlist and speaker','games and prizes','a DJ or live act','a photo booth','an activity host or entertainer','a craft or activity table'],
 cake:['the main cake','cupcakes or a dessert table','candles and cake topper','a cake knife and serviettes'],
 invites:['digital invites (often free)','printed invites and postage','place cards and a welcome sign','thank-you cards'],
 buffer:['last-minute top-ups','extra ice on a hot day','a forgotten item run','weather backup']
};
PP.SAVE_TIPS = [
 'Borrow trestle tables and eskies from family before you hire.','Buy bagged ice on the morning so none of it melts before guests arrive.','Make one dish the hero and keep the sides simple.','A grazing table looks generous with fewer, bigger platters.','Buy party supplies in one colour so leftovers suit the next party.','Ask the venue what is already included before you hire extras.','A playlist on a good speaker beats a cheap DJ.','Use digital invites and spend the saving on food.','Buy fruit and veg that is in season this month.','Get one large cake and a tray of plain cupcakes rather than a tiered cake.','Collect jars over a few weeks for candle holders.','Use greenery from the garden instead of a florist arrangement.','Hire glassware instead of buying plastic: often similar cost, far less rubbish.','Shop the cash-and-carry or wholesale market for bulk nibbles.','Freeze make-ahead items two weeks out to spread the cost.','Put a cap on helium balloons: air-filled garlands look fuller for less.','Swap paid entertainment for a games captain from the family.','Print signs at home on card stock.','Ask guests to bring a plate for dessert at casual parties.','Set a per-person cap for favours and stick to it.','Order cake a few weeks out to avoid rush fees.','Check if the hall bond is refundable and diarise the date.','Get two quotes for anything over A$300.','Keep receipts in one envelope so returns are easy.'];
