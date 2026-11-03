/* Food library. cat: f finger (pieces), m main (serves), s side (serves), d sweet (pieces), b brunch (serves).
   tags: v vegetarian, gf gluten-free, h no pork/alcohol, k kid favourite, n contains nuts, p pork, se seafood.
   shop: item:qty per 10 units:unit:aisle */
PP.DISH_SRC = `
sliders|Mini beef sliders with cheese and pickles|f|aus,mex|h,k|pcs|slider buns:10:buns:bakery;beef mince:.6:kg:meat;cheese slices:10:slices:dairy;pickles:.2:jar:pantry
sausrolls|Bite-size sausage rolls with tomato relish|f|aus|k|pcs|puff pastry:1.5:sheets:frozen;sausage mince:.35:kg:meat;tomato relish:.15:jar:pantry
pies|Party pies with sauce|f|aus|k,h|pcs|party pies (beef):10:pies:frozen;tomato sauce:.1:bottle:pantry
chickskew|Honey-soy chicken skewers|f|aus,asia|h,k,gf|pcs|chicken thigh:.5:kg:meat;honey:.05:jar:pantry;tamari (gluten-free soy):.05:bottle:intl;skewers:10:sticks:party
prawns|Prawn cocktail cups|f|aus|gf,h,se|pcs|cooked prawns:.4:kg:seafood;cos lettuce:.3:heads:produce;seafood sauce:.1:bottle:pantry
caprese|Cherry tomato, basil and bocconcini skewers|f|med|v,gf,h|pcs|cherry tomatoes:.25:kg:produce;bocconcini:.2:kg:dairy;basil:.3:bunch:produce;balsamic glaze:.05:bottle:pantry
bruschetta|Tomato and basil bruschetta|f|med|v,h|pcs|baguette:.7:loaf:bakery;tomatoes:.4:kg:produce;garlic:2:cloves:produce;basil:.3:bunch:produce
arancini|Mushroom arancini balls|f|med|v,h|pcs|arancini (mushroom):10:pcs:frozen;aioli:.1:jar:pantry
spanakopita|Spinach and feta triangles|f|med,leb|v,h|pcs|filo pastry:.3:packet:frozen;spinach:.25:kg:produce;feta:.15:kg:dairy
kibbeh|Fried kibbeh with garlic yoghurt|f|leb|h|pcs|kibbeh (ready to fry or homemade):10:pcs:deli;Greek yoghurt:.2:kg:dairy;garlic:2:cloves:produce
fatayer|Spinach fatayer|f|leb|v,h,k|pcs|pizza dough:.5:kg:bakery;spinach:.3:kg:produce;onion:.5:each:produce;sumac:.02:jar:spice;lemons:1:each:produce
sambousek|Meat sambousek with pine nuts|f|leb|h,n|pcs|pastry rounds:10:pcs:frozen;lamb mince:.25:kg:meat;pine nuts:.03:kg:pantry;onion:.5:each:produce
falafel|Falafel with tahini sauce|f|leb|v,vg,h|pcs|falafel mix:.2:kg:intl;tahini:.08:jar:intl;lemons:1:each:produce;parsley:.3:bunch:produce
mezze|Hummus, baba ghanouj and labneh dip trio with pita|f|leb,med|v,h|pcs|hummus:.25:kg:deli;baba ghanouj:.2:kg:deli;labneh:.2:kg:dairy;Lebanese bread:1:packet:bakery
mananeesh|Mini za'atar manakish|f|leb|v,vg,h|pcs|pizza dough:.5:kg:bakery;za'atar:.05:kg:spice;olive oil:.08:L:pantry
grazing|Cheese, cracker and fruit grazing board|f|aus,med|v,h|pcs|cheese (3 kinds):.35:kg:dairy;crackers:1:box:pantry;grapes:.3:kg:produce;dried apricots:.08:kg:pantry
antipasto|Antipasto platter|f|med|gf|pcs|salami and prosciutto:.2:kg:deli;marinated olives:.15:kg:deli;grilled capsicum:.15:kg:deli;artichokes:.1:kg:deli
dumplings|Steamed dumplings with dipping sauce|f|asia|h|pcs|dumplings (chicken or veg):10:pcs:frozen;soy sauce:.05:bottle:intl;chilli oil:.02:jar:intl
springrolls|Vegetable spring rolls with sweet chilli|f|asia|v,vg,h,k|pcs|spring rolls (veg):10:pcs:frozen;sweet chilli sauce:.1:bottle:intl
ricepaper|Fresh rice paper rolls|f|asia|gf,h|pcs|rice paper:.2:packet:intl;vermicelli:.1:kg:intl;cooked chicken or tofu:.25:kg:meat;lettuce:.3:heads:produce;mint:.3:bunch:produce
satay|Chicken satay sticks|f|asia|gf,h,n|pcs|chicken thigh:.5:kg:meat;satay sauce:.15:jar:intl;skewers:10:sticks:party
sushi|Sushi hand rolls (cucumber, tuna, teriyaki chicken)|f|asia|h,se|pcs|sushi rolls (assorted):10:pcs:deli;pickled ginger:.05:jar:intl
nachos|Loaded nacho cups|f|mex|v,gf,h,k|pcs|corn chips:.25:kg:pantry;cheese:.15:kg:dairy;salsa:.1:jar:pantry;sour cream:.1:tub:dairy
taquitos|Chicken taquitos with guacamole|f|mex|h|pcs|small tortillas:10:pcs:bakery;cooked chicken:.3:kg:meat;avocados:1:each:produce;limes:1:each:produce
quesadilla|Cheese and bean quesadilla wedges|f|mex|v,h,k|pcs|tortillas:2.5:pcs:bakery;cheese:.15:kg:dairy;black beans:.5:can:pantry
fairybread|Fairy bread triangles|f|aus|v,h,k|pcs|white bread:.4:loaf:bakery;butter:.05:kg:dairy;hundreds and thousands:.05:jar:pantry
cocktailfranks|Mini hot dogs|f|aus|k|pcs|cocktail frankfurts:10:pcs:deli;mini hot dog rolls:10:rolls:bakery;tomato sauce:.1:bottle:pantry
cheesestraws|Cheesy puff-pastry twists|f|aus|v,h,k|pcs|puff pastry:1:sheets:frozen;parmesan:.06:kg:dairy
vegsticks|Veggie sticks with dips|f|aus,med|v,gf,h,k|pcs|carrots:.3:kg:produce;cucumbers:1:each:produce;capsicum:1:each:produce;tzatziki:.2:kg:dairy
watermelon|Watermelon and feta bites with mint|f|med|v,gf,h|pcs|watermelon:.15:each:produce;feta:.1:kg:dairy;mint:.2:bunch:produce
popcornchicken|Popcorn chicken cones|f|aus,asia|h,k|pcs|chicken breast:.4:kg:meat;breadcrumbs:.1:kg:pantry;mayo:.1:jar:pantry;paper cones:10:pcs:party
mushtarts|Mushroom and thyme tartlets|f|med|v,h|pcs|tart shells:10:pcs:bakery;mushrooms:.25:kg:produce;cream:.1:L:dairy;thyme:.2:bunch:produce
smokedsalmon|Smoked salmon blini with crème fraîche|f|med|h,se|pcs|blini:10:pcs:bakery;smoked salmon:.15:kg:seafood;crème fraîche:.1:tub:dairy;dill:.2:bunch:produce
lambcutlets|Lamb cutlets with mint yoghurt|f|aus,med|gf,h|pcs|lamb cutlets:10:pcs:meat;Greek yoghurt:.15:kg:dairy;mint:.3:bunch:produce
koftabites|Kafta bites with tahini|f|leb|gf,h|pcs|lamb or beef mince:.4:kg:meat;parsley:.3:bunch:produce;onion:.5:each:produce;tahini:.05:jar:intl;seven spice:.01:jar:spice
bbqsnags|Snags in bread with onions|m|aus|k|serves|BBQ sausages:15:snags:meat;white bread:1:loaf:bakery;onions:2:each:produce;tomato sauce:.15:bottle:pantry
bbqburgers|Beef burgers with the lot|m|aus|h,k|serves|burger patties:10:patties:meat;burger buns:10:buns:bakery;lettuce:.5:heads:produce;tomatoes:.3:kg:produce;cheese slices:10:slices:dairy;beetroot slices:.5:can:pantry
bbqchicken|Lemon-garlic BBQ chicken thighs|m|aus,med|gf,h|serves|chicken thigh:1.8:kg:meat;lemons:2:each:produce;garlic:4:cloves:produce;oregano:.02:jar:spice
lambskewers|Lamb souvlaki skewers|m|med|gf,h|serves|lamb leg diced:1.6:kg:meat;lemons:2:each:produce;oregano:.02:jar:spice;skewers:20:sticks:party
shishtawook|Shish tawook with garlic toum|m|leb|gf,h|serves|chicken breast:1.6:kg:meat;garlic toum:.3:jar:deli;Greek yoghurt:.2:kg:dairy;paprika:.02:jar:spice;skewers:20:sticks:party
kaftaskew|Lamb kafta skewers|m|leb|gf,h|serves|lamb mince:1.6:kg:meat;parsley:1:bunch:produce;onion:2:each:produce;seven spice:.02:jar:spice
shawarma|Chicken shawarma wrap station|m|leb|h,k|serves|chicken thigh:1.6:kg:meat;Lebanese bread:2:packet:bakery;garlic toum:.3:jar:deli;pickled turnips:.3:jar:intl;shawarma spice:.03:jar:spice
lambshoulder|Slow-roast lamb shoulder with rice|m|leb,med,aus|gf,h|serves|lamb shoulder:2.2:kg:meat;long-grain rice:.8:kg:pantry;vermicelli noodles:.1:kg:intl;almonds (flaked):.05:kg:pantry
roastchicken|Roast chicken platters|m|aus|gf,h,k|serves|whole chickens:2:birds:meat;lemons:2:each:produce;garlic:4:cloves:produce
ham|Glazed leg ham|m|aus|gf,p|serves|leg ham (half):1.6:kg:deli;orange marmalade:.2:jar:pantry;Dijon mustard:.1:jar:pantry
turkey|Roast turkey breast with cranberry|m|aus|gf,h|serves|turkey breast roll:1.8:kg:meat;cranberry sauce:.3:jar:pantry
salmon|Baked side of salmon with herbs|m|aus,med|gf,h,se|serves|salmon side:1.8:kg:seafood;lemons:2:each:produce;dill:.5:bunch:produce
barra|Grilled barramundi with lemon|m|aus|gf,h,se|serves|barramundi fillets:10:fillets:seafood;lemons:3:each:produce
pastabake|Baked pasta with tomato and ricotta|m|med|v,h,k|serves|penne:1:kg:pantry;passata:1.4:L:pantry;ricotta:.5:kg:dairy;mozzarella:.4:kg:dairy;basil:.5:bunch:produce
lasagne|Beef lasagne trays|m|med|h,k|serves|lasagne sheets:.5:kg:pantry;beef mince:1.4:kg:meat;passata:1.4:L:pantry;mozzarella:.4:kg:dairy
chickparma|Mini chicken parmigiana|m|aus,med|h,k|serves|chicken schnitzels:10:pcs:meat;passata:.7:L:pantry;mozzarella:.4:kg:dairy
moussaka|Eggplant and lamb moussaka|m|med|gf,h|serves|eggplant:4:each:produce;lamb mince:1.2:kg:meat;milk:.8:L:dairy;cinnamon:.01:jar:spice
paella|Chicken and chorizo paella|m|med|gf,p|serves|paella rice:.8:kg:pantry;chicken thigh:1:kg:meat;chorizo:.4:kg:deli;saffron or paprika:.01:jar:spice;frozen peas:.3:kg:frozen
butterchicken|Butter chicken with rice|m|asia|gf,h,k|serves|chicken thigh:1.6:kg:meat;butter chicken sauce:1:jar:intl;basmati rice:.8:kg:pantry;naan:5:pcs:bakery
greencurry|Thai green chicken curry|m|asia|gf,h|serves|chicken thigh:1.5:kg:meat;green curry paste:.2:jar:intl;coconut milk:2:can:intl;jasmine rice:.8:kg:pantry
teriyaki|Teriyaki chicken rice bowls|m|asia|h,k|serves|chicken thigh:1.5:kg:meat;teriyaki sauce:.3:bottle:intl;rice:.8:kg:pantry;edamame:.3:kg:frozen
friedrice|Special fried rice|m|asia|h,k|serves|rice:.8:kg:pantry;eggs:6:each:dairy;frozen peas and corn:.4:kg:frozen;spring onions:1:bunch:produce;soy sauce:.1:bottle:intl
noodles|Hokkien noodle stir-fry with vegetables|m|asia|v,h|serves|hokkien noodles:1.5:kg:intl;mixed stir-fry vegetables:1:kg:produce;oyster or mushroom sauce:.2:bottle:intl
tacos|Build-your-own tacos|m|mex|h,k|serves|beef mince:1.4:kg:meat;taco shells:30:shells:pantry;lettuce:.5:heads:produce;cheese:.4:kg:dairy;salsa:.3:jar:pantry
burritobowls|Chicken burrito bowl bar|m|mex|gf,h|serves|chicken thigh:1.4:kg:meat;rice:.8:kg:pantry;black beans:2:can:pantry;corn kernels:1:can:pantry;avocados:3:each:produce
pulledpork|Pulled pork rolls with slaw|m|aus,mex|p,k|serves|pork shoulder:2:kg:meat;brioche rolls:10:rolls:bakery;coleslaw mix:.5:kg:produce;BBQ sauce:.3:bottle:pantry
veglasagne|Roast vegetable lasagne|m|med|v,h|serves|lasagne sheets:.5:kg:pantry;pumpkin:1:kg:produce;zucchini:3:each:produce;ricotta:.5:kg:dairy;passata:1.4:L:pantry
mujadara|Mujadara (lentils and rice with crispy onions)|m|leb|v,vg,gf,h|serves|brown lentils:.5:kg:pantry;long-grain rice:.5:kg:pantry;onions:4:each:produce;cumin:.02:jar:spice
pizzas|Tray pizzas (margherita and pepperoni)|m|med|k|serves|pizza bases:4:bases:bakery;pizza sauce:.3:jar:pantry;mozzarella:.6:kg:dairy;pepperoni:.15:kg:deli
greensalad|Garden salad|s|aus,med|v,vg,gf,h|serves|mixed leaves:.4:kg:produce;cucumbers:2:each:produce;cherry tomatoes:.3:kg:produce;dressing:.2:bottle:pantry
tabbouleh|Tabbouleh|s|leb|v,vg,h|serves|parsley:4:bunch:produce;tomatoes:.4:kg:produce;fine burghul:.1:kg:intl;lemons:3:each:produce;mint:1:bunch:produce
fattoush|Fattoush with crispy pita|s|leb|v,vg,h|serves|cos lettuce:1:heads:produce;cucumbers:2:each:produce;radishes:1:bunch:produce;Lebanese bread:.5:packet:bakery;sumac:.02:jar:spice
greek|Greek salad|s|med|v,gf,h|serves|tomatoes:.6:kg:produce;cucumbers:2:each:produce;feta:.25:kg:dairy;kalamata olives:.15:kg:deli;red onion:1:each:produce
potato|Potato salad with herbs|s|aus|v,gf,h,k|serves|potatoes:1.5:kg:produce;mayo:.25:jar:pantry;spring onions:1:bunch:produce;chives:.5:bunch:produce
coleslaw|Crunchy coleslaw|s|aus,mex|v,gf,h,k|serves|coleslaw mix:.8:kg:produce;mayo:.2:jar:pantry
pastasalad|Pesto pasta salad|s|med|v,h,n,k|serves|spiral pasta:.5:kg:pantry;basil pesto:.2:jar:pantry;cherry tomatoes:.3:kg:produce;baby spinach:.15:kg:produce
rice|Lebanese rice with vermicelli|s|leb|v,h,k|serves|long-grain rice:.6:kg:pantry;vermicelli noodles:.1:kg:intl;butter:.05:kg:dairy
roastveg|Honey roast vegetables|s|aus|v,gf,h,k|serves|potatoes:1:kg:produce;pumpkin:.8:kg:produce;carrots:.5:kg:produce;honey:.05:jar:pantry
corn|Corn cobs with butter|s|aus,mex|v,gf,h,k|serves|corn cobs:10:cobs:produce;butter:.1:kg:dairy
garlicbread|Garlic bread|s|aus,med|v,h,k|serves|baguettes:2:loaf:bakery;butter:.15:kg:dairy;garlic:4:cloves:produce
rocket|Rocket, pear and parmesan salad|s|med|v,gf,h|serves|rocket:.3:kg:produce;pears:3:each:produce;parmesan:.1:kg:dairy
asianslaw|Asian slaw with sesame|s|asia|v,vg,gf,h|serves|wombok cabbage:.5:each:produce;carrots:2:each:produce;spring onions:1:bunch:produce;sesame dressing:.2:bottle:intl
mexicorn|Mexican street corn salad|s|mex|v,gf,h|serves|corn kernels:3:can:pantry;feta:.15:kg:dairy;limes:2:each:produce;coriander:1:bunch:produce
pitaplatter|Bread basket with dips and pickles|s|leb,med|v,h,k|serves|Lebanese bread:1:packet:bakery;pickles:.3:jar:intl;hummus:.3:kg:deli
cupcakes|Mini cupcakes|d|aus|v,h,k|pcs|mini cupcakes:10:pcs:bakery;sprinkles:.05:jar:pantry
brownies|Chocolate fudge brownie bites|d|aus|v,h,k|pcs|brownie mix (or homemade):.3:box:pantry;eggs:1:each:dairy
pavlova|Mini pavlovas with cream and berries|d|aus|v,gf,h|pcs|meringue nests:10:pcs:bakery;thickened cream:.2:L:dairy;mixed berries:.25:kg:produce
lamingtons|Lamington fingers|d|aus|v,h,k|pcs|lamington fingers:10:pcs:bakery
baklava|Baklava pieces|d|leb,med|v,h,n|pcs|baklava (assorted):.25:kg:intl
maamoul|Maamoul date cookies|d|leb|v,h,k|pcs|maamoul (date):10:pcs:intl
knafeh|Knafeh tray, sliced|d|leb|v,h,n|pcs|knafeh pastry and cheese:.6:kg:intl;sugar syrup:.1:L:pantry;pistachios:.03:kg:pantry
fruitplatter|Fresh fruit platter|d|aus,med,asia|v,vg,gf,h,k|pcs|watermelon:.2:each:produce;rockmelon:.3:each:produce;grapes:.3:kg:produce;strawberries:.25:kg:produce
tiramisu|Tiramisu cups|d|med|v,h|pcs|savoiardi biscuits:.1:packet:pantry;mascarpone:.15:kg:dairy;espresso (cold):.15:L:pantry;cocoa:.02:jar:pantry
cannoli|Mini cannoli|d|med|v,h|pcs|mini cannoli:10:pcs:bakery
churros|Churros with chocolate dip|d|mex|v,h,k|pcs|churros:10:pcs:frozen;chocolate sauce:.1:bottle:pantry
mochi|Mochi ice cream bites|d|asia|v,gf,h,k|pcs|mochi ice cream:10:pcs:frozen
mango|Mango pudding cups|d|asia|v,gf,k|pcs|mango pulp:.3:can:intl;cream:.1:L:dairy;gelatine:.02:packet:pantry
chocfruit|Chocolate-dipped strawberries|d|aus|v,gf,h,k|pcs|strawberries:.25:kg:produce;dark chocolate:.1:kg:pantry
icecream|Ice-cream cone station|d|aus|v,h,k|pcs|ice cream:1:L:frozen;cones:10:cones:pantry;sprinkles:.05:jar:pantry
macarons|Macarons|d|med|v,gf,h,n|pcs|macarons:10:pcs:bakery
avotoast|Smashed avo on sourdough|b|aus|v,vg,h|serves|sourdough:1:loaf:bakery;avocados:5:each:produce;lemons:2:each:produce;feta:.15:kg:dairy
eggsbene|Mini bacon and egg rolls|b|aus|p,k|serves|brioche rolls:10:rolls:bakery;eggs:10:each:dairy;bacon:.5:kg:deli;tomato relish:.2:jar:pantry
frittata|Vegetable frittata squares|b|aus,med|v,gf,h,k|serves|eggs:12:each:dairy;zucchini:2:each:produce;spinach:.2:kg:produce;feta:.15:kg:dairy
granola|Yoghurt, granola and berry cups|b|aus|v,h,k|serves|Greek yoghurt:1:kg:dairy;granola:.4:kg:pantry;mixed berries:.4:kg:produce
pancakes|Pancake stack station|b|aus|v,h,k|serves|pancake mix:.5:kg:pantry;maple syrup:.25:bottle:pantry;berries:.3:kg:produce;eggs:2:each:dairy
croissants|Ham-and-cheese or plain croissants|b|med|k|serves|croissants:10:pcs:bakery;ham:.2:kg:deli;cheese slices:10:slices:dairy
foul|Foul and fatteh brunch spread|b|leb|v,h|serves|fava beans:2:can:intl;chickpeas:2:can:pantry;Greek yoghurt:.5:kg:dairy;Lebanese bread:1:packet:bakery;cumin:.02:jar:spice
manakishb|Manakish za'atar and cheese|b|leb|v,h,k|serves|pizza dough:1:kg:bakery;za'atar:.08:kg:spice;akkawi or mozzarella:.4:kg:dairy;tomatoes:.4:kg:produce;mint:1:bunch:produce
shakshuka|Shakshuka with crusty bread|b|leb,med|v,h|serves|eggs:12:each:dairy;crushed tomatoes:3:can:pantry;capsicum:2:each:produce;cumin:.02:jar:spice;crusty bread:1:loaf:bakery
scones|Scones with jam and cream|b|aus|v,h,k|serves|scones:15:pcs:bakery;jam:.3:jar:pantry;thickened cream:.3:L:dairy
quiche|Mini quiche Lorraine|b|med|k|serves|mini quiches:20:pcs:frozen
sandwiches|Ribbon sandwiches (egg, chicken, cucumber)|b|aus|h,k|serves|sandwich bread:1:loaf:bakery;eggs:6:each:dairy;cooked chicken:.3:kg:meat;cucumbers:1:each:produce;mayo:.15:jar:pantry
`;
PP.DISHES = PP.DISH_SRC.trim().split('\n').map(l => { const [id,n,c,cu,tg,u,sh] = l.split('|'); return {id,n,c,cu:cu.split(','),t:tg?tg.split(','):[],u,shop:sh.split(';').map(s=>{const [i,q,un,a]=s.split(':');return {i,q:+q,u:un,a};})}; });
PP.CUISINES = {aus:'Aussie favourites',leb:'Lebanese',med:'Mediterranean',asia:'Asian',mex:'Mexican',mix:'A bit of everything'};
PP.FOOD_STYLES = {grazing:'Finger food & grazing',bbq:'BBQ',buffet:'Buffet',sitdown:'Sit-down meal',brunch:'Brunch / morning tea',dessert:'Dessert & sweets only'};
// adult-equivalent amounts per guest by style: f pieces, m serves, s serves, d pieces, b serves
PP.STYLE_AMT = {
 grazing:{f:12,m:0,s:0,d:3,b:0,nf:8,nd:3},
 bbq:{f:4,m:1.4,s:1.6,d:2,b:0,nf:2,nm:3,ns:3,nd:2},
 buffet:{f:4,m:1.3,s:1.5,d:2,b:0,nf:3,nm:3,ns:3,nd:2},
 sitdown:{f:3,m:1.1,s:1.2,d:1.5,b:0,nf:3,nm:2,ns:3,nd:2},
 brunch:{f:3,m:0,s:0,d:2.5,b:1.4,nf:3,nb:4,nd:3},
 dessert:{f:2,m:0,s:0,d:6,b:0,nf:2,nd:6},
};
PP.AISLES = {produce:'Fruit & veg',meat:'Meat & poultry',seafood:'Seafood',deli:'Deli',dairy:'Dairy & eggs',bakery:'Bakery',pantry:'Pantry',intl:'International foods',spice:'Herbs & spices',frozen:'Frozen',drinks:'Drinks & ice',party:'Party supplies'};
