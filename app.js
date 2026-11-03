/* My Party: interactive party planner. Offline-first, localStorage only. (c) Makerman Services. */
(function () {
'use strict';
const KEY = 'partySorted.v1';
const CFG = Object.assign({ aiEndpoint: '', appName: 'My Party', brand: 'by Makerman Services' }, window.PP_CONFIG || {});
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const R = () => Math.random();
const pick = a => a[Math.floor(R() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uid = () => Math.random().toString(36).slice(2, 9);
const money = n => 'A$' + Math.round(n).toLocaleString('en-AU');
const TYPE = id => PP.TYPES.find(t => t.id === id) || PP.TYPES[0];
const ordinal = n => { n = +n; const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };

// ---------- state ----------
let S = load();
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.plans) return s; } catch (e) {} return { plans: {}, current: null, tab: 'plan', ai: false }; }
function save() { localStorage.setItem(KEY, JSON.stringify(S)); }
const P = () => S.plans[S.current];

const DEFAULT_TIMES = { kidbday: ['11:00', 2.5], teenbday: ['18:00', 4], babyshower: ['11:00', 3], genderreveal: ['14:00', 3], christening: ['12:00', 4], eid: ['11:00', 4], bbq: ['13:00', 5], housewarming: ['15:00', 4], corporate: ['17:30', 3.5], wedding: ['17:00', 6], newyear: ['20:00', 5] };
function newForm(typeId) {
  const t = TYPE(typeId || 'kidbday'); const tm = DEFAULT_TIMES[t.id] || ['19:00', 4];
  return { type: t.id, hon: '', age: t.id === 'kidbday' ? 6 : t.id === 'teenbday' ? 15 : t.id === 'adultbday' ? 35 : '', guests: t.guests, kids: t.kids ? Math.round(t.guests * .5) : 0, kidAge: 'k', budget: t.budget, date: '', time: tm[0], hours: tm[1], venue: 'home', theme: t.themes[0], custom: '', cc1: '#C2185B', cc2: '#FFC107', cuisine: t.id === 'eid' ? 'leb' : 'mix', style: t.style, alcohol: t.alc === 1, veg: 15, halal: t.id === 'eid', gf: false, nutfree: !!t.kids, name: '' };
}
function newPlan(typeId) {
  const id = uid(); const p = { id, created: Date.now(), updated: Date.now(), form: newForm(typeId), picks: {}, seen: {}, budgetOv: {}, done: {}, custom: [], guests: [], shopDone: {}, inviteTone: 'fun', fresh: true };
  S.plans[id] = p; S.current = id; return p;
}

// ---------- theme ----------
const NAMED = [['red', '#D32F2F'], ['crimson', '#B01E2D'], ['coral', '#F2836B'], ['orange', '#F28C38'], ['gold', '#D4AF37'], ['yellow', '#F5C518'], ['lime', '#B6FF3A'], ['green', '#3E8A4A'], ['emerald', '#1D6B4F'], ['teal', '#2A8C8C'], ['sky blue', '#7EC0EE'], ['blue', '#2E5AAC'], ['navy', '#1E2550'], ['purple', '#7A4FB5'], ['lilac', '#C9B6F2'], ['pink', '#F06292'], ['blush', '#F2C9C5'], ['magenta', '#C2185B'], ['brown', '#8B5E3C'], ['tan', '#D9B98A'], ['cream', '#F5EFE3'], ['white', '#FFFFFF'], ['silver', '#C0C4CA'], ['grey', '#808890'], ['black', '#1B1B1B']];
function nearest(hex) { const h = x => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16)); const a = h(hex); let best = NAMED[0], bd = 1e9; NAMED.forEach(n => { const b = h(n[1]); const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2; if (d < bd) { bd = d; best = n; } }); return best[0]; }
function themeOf(f) {
  if (f.theme !== 'custom') { const t = TYPE(f.type); if (t && hiddenTheme(t, f.theme)) return PP.THEMES[t.themes.find(id => !hiddenTheme(t, id))]; return PP.THEMES[f.theme] || PP.THEMES.garden; }
  const name = (f.custom || 'My own theme').trim().slice(0, 40);
  const low = name.toLowerCase();
  const match = Object.values(PP.THEMES).find(t => low.split(/\s+/).some(w => w.length > 3 && (t.name.toLowerCase().includes(w) || t.motifs.join(' ').toLowerCase().includes(w))));
  const base = match || PP.THEMES.festival;
  return { id: 'custom', name, emoji: '✨', custom: true, colours: [{ n: nearest(f.cc1), h: f.cc1 }, { n: nearest(f.cc2), h: f.cc2 }, { n: 'white', h: '#FFFFFF' }], motifs: match ? base.motifs : [name.toLowerCase() + ' cut-outs', 'stars', 'confetti dots', 'balloons', 'bunting'], mats: base.mats, light: base.light, music: base.music, dress: 'a ' + name.toLowerCase() + ' look', sig: 'a signature mocktail in ' + nearest(f.cc1) + ' and ' + nearest(f.cc2), backdrop: 'a ' + nearest(f.cc1) + ' and ' + nearest(f.cc2) + ' balloon wall with a big "' + name + '" sign' };
}
function fill(tpl, f, th) {
  const m = shuffle(th.motifs), c = shuffle(th.colours), mt = shuffle(th.mats);
  const spot = pick(PP.DECOR_SPOT[f.venue] || PP.DECOR_SPOT.home);
  return tpl.replace(/\{c1\}/g, c[0].n).replace(/\{c2\}/g, c[1].n).replace(/\{c3\}/g, c[2].n).replace(/\{m1\}/g, m[0]).replace(/\{m2\}/g, m[1]).replace(/\{m3\}/g, m[2] || m[0])
    .replace(/\{mat\}/g, mt[0]).replace(/\{mat2\}/g, mt[1] || mt[0]).replace(/\{light\}/g, th.light).replace(/\{backdrop\}/g, cap(th.backdrop)).replace(/\{music\}/g, th.music).replace(/\{spot\}/g, spot)
    .replace(/\{theme\}/g, th.name).replace(/\{age\}/g, f.age || '').replace(/\{dress\}/g, th.dress);
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- no-repeat picker ----------
function freshPick(p, key, pool, n, keyOf) {
  keyOf = keyOf || (x => x);
  p.seen[key] = p.seen[key] || [];
  let avail = pool.filter(x => !p.seen[key].includes(keyOf(x)));
  if (avail.length < n) { const keep = p.seen[key].slice(-Math.max(0, pool.length - n)); p.seen[key] = keep; avail = pool.filter(x => !keep.includes(keyOf(x))); if (avail.length < n) avail = pool.slice(); }
  const out = shuffle(avail).slice(0, n);
  out.forEach(x => p.seen[key].push(keyOf(x)));
  if (p.seen[key].length > 400) p.seen[key] = p.seen[key].slice(-400);
  return out;
}

// ---------- derived numbers ----------
function people(f) { const g = Math.max(1, +f.guests || 1); const k = Math.min(g, Math.max(0, +f.kids || 0)); return { g, k, a: g - k, eq: (g - k) + k * .6 }; }
const ADULT_THEMES = ['casino', 'cocktail', 'dirty-thirty'];
const hiddenTheme = (t, id) => (t.alc === 0 && ADULT_THEMES.includes(id)) || (['kidbday', 'teenbday'].includes(t.id) && id === 'black-gold');
const NEEDS18 = f => ['b18', 'graduation'].includes(f.type);
const hasKids = f => people(f).k > 0 || f.type === 'kidbday';
function alcOn(f) { const t = TYPE(f.type); return t.alc > 0 && !!f.alcohol; }
function ageGroups(f) {
  const t = TYPE(f.type), n = people(f), set = new Set();
  if (t.id === 'kidbday') { const a = +f.age || 6; set.add(a <= 4 ? 't' : a <= 8 ? 'k' : 'w'); if (n.a > 4) set.add('a'); }
  else if (t.id === 'teenbday') set.add('e');
  else { set.add('a'); if (n.k > 0) set.add(f.kidAge || 'k'); if (['b50', 'b60', 'retirement', 'christening', 'christmas', 'eid', 'wedding'].includes(t.id)) set.add('s'); if (t.id === 'b18') set.add('e'); }
  return [...set];
}

// ---------- budget ----------
function budgetPlan(p) {
  const f = p.form, n = people(f), tier = PP.COST[PP.TIER[f.type]] || PP.COST.party, vm = PP.VENUE_MOD[f.venue] || {};
  const typical = {};
  let tot = 0;
  ['venue', 'food', 'drinks', 'decor', 'ent', 'cake', 'invites'].forEach(c => {
    let [fx, ph] = tier[c]; const m = vm[c] || [1, 1]; fx *= m[0]; ph *= m[1];
    if (c === 'drinks' && !alcOn(f)) ph *= .55;
    if (c === 'food' || c === 'drinks') ph = ph * (n.eq / n.g);
    typical[c] = fx + ph * n.g; tot += typical[c];
  });
  const B = Math.max(0, +f.budget || 0), avail = B * .9;
  const lines = {};
  Object.keys(typical).forEach(c => lines[c] = p.budgetOv[c] != null ? +p.budgetOv[c] : avail * typical[c] / tot);
  const used = Object.values(lines).reduce((a, b) => a + b, 0);
  lines.buffer = B - used;
  const typicalTotal = tot / .9;
  const ratio = B / typicalTotal;
  const t = TYPE(f.type);
  return { lines, typical, typicalTotal, ratio, perHead: B / n.g, band: ratio < .65 ? 'tight' : ratio > 1.4 ? 'generous' : 'on track', n, t };
}

// ---------- food ----------
function dishPool(f, cat) {
  let pool = PP.DISHES.filter(d => d.c === cat);
  if (f.halal) pool = pool.filter(d => !d.t.includes('p'));
  if (f.nutfree) pool = pool.filter(d => !d.t.includes('n'));
  if (f.gf) pool = pool.filter(d => d.t.includes('gf') || d.c === 'd' && d.t.includes('gf'));
  if (+f.veg >= 100) pool = pool.filter(d => d.t.includes('v'));
  if (f.type === 'kidbday') pool.sort((a, b) => b.t.includes('k') - a.t.includes('k'));
  return pool;
}
function weightedPick(p, key, pool, n, f) {
  const want = f.cuisine === 'mix' ? null : f.cuisine;
  const pri = want ? pool.filter(d => d.cu.includes(want)) : pool;
  const kidsFirst = f.type === 'kidbday' ? pool.filter(d => d.t.includes('k')) : null;
  const main = kidsFirst && kidsFirst.length >= n ? kidsFirst.filter(d => !want || d.cu.includes(want)).concat(kidsFirst) : pri;
  const uniq = [...new Set(main.map(d => d.id))].map(id => pool.find(d => d.id === id));
  let out = freshPick(p, key, uniq.length >= n ? uniq : pool, Math.min(n, (uniq.length >= n ? uniq : pool).length), d => d.id);
  if (out.length < n) out = out.concat(freshPick(p, key + '-x', pool.filter(d => !out.includes(d)), n - out.length, d => d.id));
  // make sure there is at least one vegetarian option
  if (+f.veg > 0 && !out.some(d => d.t.includes('v'))) { const v = pool.find(d => d.t.includes('v') && !out.includes(d)); if (v) out[out.length - 1] = v; }
  return out.map(d => d.id);
}
function genFood(p) {
  const f = p.form, A = PP.STYLE_AMT[f.style] || PP.STYLE_AMT.grazing; const picks = {};
  ['f', 'm', 's', 'd', 'b'].forEach(c => { const n = A['n' + c] || 0; if (n && A[c]) picks[c] = weightedPick(p, 'food-' + c, dishPool(f, c), n, f); });
  p.picks.food = picks;
}
function swapDish(p, cat, id) {
  const f = p.form, pool = dishPool(f, cat).filter(d => !p.picks.food[cat].includes(d.id));
  const nd = weightedPick(p, 'food-' + cat, pool, 1, f)[0]; if (!nd) return toast('No other options with these filters');
  p.picks.food[cat] = p.picks.food[cat].map(x => x === id ? nd : x);
}
function foodPlan(p) {
  const f = p.form, n = people(f), A = PP.STYLE_AMT[f.style] || PP.STYLE_AMT.grazing, hours = +f.hours || 3;
  const longer = hours > 4 ? 1.15 : 1;
  const items = [];
  const kidShare = n.k / n.g, veg = (+f.veg || 0) / 100;
  const wt = d => 1 + (d.t.includes('k') ? kidShare * .6 : 0) + (d.t.includes('v') ? veg * .5 : 0) + (d.t.includes('se') ? -.25 : 0) + (d.t.includes('n') ? -.1 : 0);
  Object.entries(p.picks.food || {}).forEach(([c, ids]) => {
    const ds = ids.map(id => PP.DISHES.find(x => x.id === id)).filter(Boolean); const W = ds.reduce((a, d) => a + wt(d), 0);
    ds.forEach(d => items.push({ d, c, qty: Math.ceil(A[c] * n.eq * longer * wt(d) / W * 1.05) }));
  });
  // drinks
  const drinks = [];
  const waterL = Math.ceil(n.g * (0.4 + 0.25 * hours));
  drinks.push({ n: 'Water (jugs or a water station)', q: waterL + ' L', note: 'About ' + (0.4 + 0.25 * hours).toFixed(1) + ' L per person. Add more on hot days.' });
  const soft = Math.ceil(n.g * (1 + .6 * hours));
  drinks.push({ n: 'Soft drinks, juice and sparkling water', q: soft + ' cans or glasses', note: 'About ' + (1 + .6 * hours).toFixed(1) + ' per person; keep low-sugar options.' });
  const th = themeOf(f);
  drinks.push({ n: 'Signature mocktail: ' + th.sig, q: Math.ceil(n.g * 1.5) + ' cups', note: 'A jug serves about 8 cups.' });
  if (['brunch'].includes(f.style) || ['b50', 'b60', 'retirement', 'christening', 'babyshower', 'eid', 'corporate', 'wedding'].includes(f.type)) drinks.push({ n: 'Tea and coffee station', q: Math.ceil(n.a * .8) + ' cups', note: 'Plus milk, sugar and a plant milk.' });
  let alc = null;
  if (alcOn(f)) {
    const base = NEEDS18(f) ? Math.min(n.a, Math.max(0, +f.adults18 || 0)) : n.a; const drinkers = Math.round(base * .6); const std = Math.round(drinkers * (1 + Math.max(0, hours - 1) * .75));
    const toast = ['engagement', 'wedding', 'b21', 'b30', 'b40', 'b50', 'b60', 'newyear', 'retirement'].includes(f.type);
    const wineBtl = Math.ceil(std * .4 / 5), beerCans = Math.ceil(std * .45), sparkling = toast ? Math.ceil(n.a / 6) : Math.ceil(std * .15 / 6);
    alc = { drinkers, std, list: [{ n: 'Beer or cider (incl. mid-strength)', q: beerCans + ' cans or bottles' }, { n: 'Wine (red and white)', q: wineBtl + ' bottles' }, { n: toast ? 'Sparkling for the toast (plus a non-alcoholic sparkling)' : 'Sparkling', q: sparkling + ' bottles' }, { n: 'Non-alcoholic beer, wine or sparkling', q: Math.ceil(n.a * .3) + ' serves' }] };
  }
  const ice = Math.ceil(n.g * (f.venue === 'park' || hours > 4 ? .8 : .5));
  drinks.push({ n: 'Ice', q: ice + ' kg', note: 'Half a kilo per person, more outdoors in summer.' });
  const cake = { slices: Math.ceil(n.g * 1.1), note: n.g > 60 ? 'Order a cake for ' + Math.ceil(n.g * 1.1) + ' "finger" slices or add a matching sheet cake for the kitchen.' : 'A cake for about ' + Math.ceil(n.g * 1.1) + ' slices.' };
  return { items, drinks, alc, cake, n };
}
function shoppingList(p) {
  const fp = foodPlan(p), f = p.form, n = fp.n; const map = {};
  const add = (a, i, q, u, d) => { const k = a + '|' + i.toLowerCase() + '|' + u; if (!map[k]) map[k] = { a, i, q: 0, u, for: [] }; map[k].q += q; if (d && !map[k].for.includes(d)) map[k].for.push(d); };
  fp.items.forEach(it => it.d.shop.forEach(s => add(s.a, (f.halal && s.a === 'meat' ? s.i + ' (halal; check certification)' : s.i), s.q * it.qty / 10, s.u, it.d.n)));
  fp.drinks.forEach(d => add('drinks', d.n.replace(/^Signature mocktail: /, 'Mocktail: '), 0, d.q, ''));
  if (fp.alc) fp.alc.list.forEach(d => add('drinks', d.n, 0, d.q, ''));
  add('bakery', 'Celebration cake', 1, 'cake', 'about ' + fp.cake.slices + ' slices');
  const sup = [['Plates (main and dessert)', n.g * 2, 'plates'], ['Cups', n.g * 3, 'cups'], ['Napkins', n.g * 3, 'napkins'], ['Cutlery sets', Math.ceil(n.g * 1.3), 'sets'], ['Tablecloths', Math.ceil(n.g / 8), 'cloths'], ['Bin bags (rubbish and recycling)', Math.max(4, Math.ceil(n.g / 8)), 'bags'], ['Balloons', Math.min(150, 25 + n.g), 'balloons'], ['Candles and a cake knife', 1, 'set'], ['Foil and cling wrap for leftovers', 1, 'roll each'], ['Serving tongs and spoons', Math.ceil(fp.items.length / 2), 'each']];
  sup.forEach(s => add('party', s[0], s[1], s[2], ''));
  if (f.style === 'bbq') add('party', 'BBQ gas bottle (check it is full)', 1, 'bottle', '');
  if (f.venue === 'park') { add('party', 'Sunscreen and insect repellent', 1, 'each', ''); add('party', 'Esky and ice bricks', 2, 'each', ''); }
  return Object.values(map).map(x => ({ ...x, key: x.a + '|' + x.i + '|' + x.u }));
}
function fmtQ(q, u) {
  if (!q) return u;
  const kg = { kg: 1, L: 1 };
  let v = kg[u] ? Math.ceil(q * 10) / 10 : Math.ceil(q);
  if (u === 'kg' && v < 1) return Math.ceil(q * 1000 / 50) * 50 + ' g';
  if (u === 'L' && v < 1) return Math.ceil(q * 1000 / 50) * 50 + ' ml';
  if (u === 'each') return v + ' ×';
  return v + ' ' + u;
}

// ---------- decor / games / invites / runsheet ----------
function genDecor(p) {
  const f = p.form, th = themeOf(f); const out = [];
  Object.entries(PP.DECOR).forEach(([area, tpls]) => {
    const idx = freshPick(p, 'decor-' + area + '-' + th.id, tpls.map((_, i) => i), 2);
    out.push({ area, ideas: idx.map(i => fill(tpls[i], f, th)) });
  });
  const ex = PP.DECOR_TYPE[f.type] || PP.DECOR_TYPE[{ adultbday: 'b30', teenbday: 'teenbday' }[f.type]] || [];
  p.picks.decor = { areas: out, special: ex.map(t => fill(t, f, th)), themeId: th.id };
}
function genGames(p) {
  const f = p.form, th = themeOf(f), groups = ageGroups(f);
  const where = f.venue === 'park' ? ['o', 'b'] : f.venue === 'restaurant' ? ['i'] : ['i', 'o', 'b'];
  const special = { babyshower: ['Baby bingo', 'Guess the bump', 'Nappy race', 'Advice cards'], eid: ['Eid gift hunt'], christmas: ['Secret Santa'], corporate: ['Speed meet', 'Trivia quiz'], newyear: ['Midnight countdown'], retirement: ['Memory lane slideshow', 'Advice cards'] };
  const out = {};
  groups.forEach(g => {
    let pool = PP.GAMES.filter(x => x.ages.includes(g) && where.includes(x.w));
    const excl = ['Baby bingo', 'Guess the bump', 'Nappy race', 'Eid gift hunt', 'Secret Santa', 'Midnight countdown', 'Memory lane slideshow'];
    pool = pool.filter(x => !excl.includes(x.n) || (special[f.type] || []).includes(x.n));
    if (f.venue === 'restaurant') pool = pool.filter(x => !/dance|limbo|water|race/i.test(x.n));
    const must = pool.filter(x => (special[f.type] || []).includes(x.n));
    const rest = freshPick(p, 'games-' + g, pool.filter(x => !must.includes(x)), Math.max(1, 4 - must.length), x => x.id);
    out[g] = must.concat(rest).slice(0, 4).map(x => ({ id: x.id, twist: fill(pick(PP.GAME_TWISTS), f, th) }));
  });
  p.picks.games = out;
}
function genInvites(p) {
  const f = p.form, t = TYPE(f.type), th = themeOf(f), tone = p.inviteTone || 'fun';
  const n = people(f);
  const hon = f.hon.trim() || { kidbday: 'our birthday star', teenbday: 'our birthday star', engagement: 'the happy couple', wedding: 'the newlyweds', babyshower: 'the parents-to-be', genderreveal: 'the parents-to-be', christening: 'our little one', graduation: 'our graduate', housewarming: 'we', retirement: 'our retiree' }[f.type] || 'the guest of honour';
  const whys = PP.INVITE.why[f.type] || PP.INVITE.why.adultbday;
  const combos = [];
  PP.INVITE.open[tone].forEach((o, i) => whys.forEach((w, j) => PP.INVITE.close[tone].forEach((c, k) => combos.push([i, j, k]))));
  const chosen = freshPick(p, 'inv-' + f.type + '-' + tone, combos, 3, x => x.join('.'));
  const when = whenText(f); const where = PP.VENUES[f.venue].name.toLowerCase();
  const rsvpBy = f.date ? fmtDate(addDays(f.date, -14), true) : 'two weeks before';
  p.picks.invites = chosen.map(([i, j, k]) => {
    let why = whys[j].replace(/\{hon\}/g, hon).replace(/\{age\}/g, f.age || '').replace(/\{ageth\}/g, f.age ? ordinal(f.age) : '');
    if (hon === 'we') why = why.replace(/^we have/i, 'We have');
    why = cap(why.replace(/'s's/g, "'s"));
    const theme = pick(PP.INVITE.themeLine).replace('{theme}', th.name).replace('{dress}', cap(th.dress));
    const kids = n.k > 0 && !['kidbday', 'teenbday'].includes(f.type) ? ' Kids welcome.' : '';
    return PP.INVITE.open[tone][i] + '\n' + why + '\n\n🗓 ' + when + '\n📍 ' + cap(where) + ' (address on RSVP)\n' + theme + kids + '\n\nPlease RSVP by ' + rsvpBy + '.\n' + PP.INVITE.close[tone][k];
  });
}
const MOMENTS = {
  kid: [[0, ['Guests arrive: free play and the craft table', 'Arrivals: name stickers and the craft table open']], [20, ['Game time: {g1}', 'First game: {g1}']], [40, ['Second game: {g2}', 'Run around: {g2}']], [60, ['Party food is served (adults top up drinks)', 'Food time: kids sit down for party food']], [85, ['Sing "Happy Birthday" and cut the cake', 'Candles, cake and the birthday song']], [100, ['{g3} to finish', 'Last game: {g3}']], [-10, ['Favours handed out at the door', 'Goodbyes and favour bags']]],
  adult: [[0, ['Guests arrive: welcome drinks (mocktail ready) and nibbles', 'Doors open: drinks station and grazing']], [40, ['Icebreaker: {g1}', 'Get people mixing with {g1}']], [75, ['Food is served', 'Main food comes out']], [0.55, ['Speeches and a toast (keep each under 3 minutes)', 'A few words from family and friends']], [0.62, ['Cake cutting and dessert', 'Cake, song and dessert']], [0.7, ['Music up: dancing or {g2}', 'Party time: {g2}']], [-30, ['Tea, coffee and wind-down music', 'Last songs, coffee and goodbyes']]],
};
const SPECIAL = {
  b21: [[0.58, 'The 21st key moment and a toast']], engagement: [[0.5, 'Toast to the couple and the story of the proposal']], wedding: [[20, 'Grand entrance of the newlyweds'], [0.45, 'Speeches'], [0.6, 'First dance'], [0.68, 'Cake cutting'], [-20, 'Farewell tunnel for the couple']],
  babyshower: [[0.5, 'Gift opening while guests play baby bingo']], genderreveal: [[0.6, 'The big reveal: everyone gathers, phones out']], christening: [[-60, 'Ceremony at the church (allow travel time)'], [30, 'A blessing or a few words of welcome']],
  eid: [[0, 'Eid Mubarak greetings, dates and coffee'], [25, 'Eidi for the kids']], christmas: [[0.5, 'Secret Santa gift swap']], newyear: [['midnight', 'Countdown to midnight: cheers and noisemakers']], graduation: [[0.5, 'Toast to the graduate and the photo moment']], corporate: [[15, 'Welcome from the team leader'], [0.5, 'Thank-yous and awards']], housewarming: [[30, 'House tour every half hour']], retirement: [[0.5, 'Speeches and the memory slideshow']]
};
function genRun(p) { p.picks.run = { v: Math.floor(R() * 1000) }; }
function runSheet(p) {
  const f = p.form, t = TYPE(f.type), hours = +f.hours || 3, dur = hours * 60;
  const [hh, mm] = (f.time || '18:00').split(':').map(Number); const start = hh * 60 + mm;
  const v = (p.picks.run && p.picks.run.v) || 0;
  const gp = p.picks.games || {}; const firstG = ageGroups(f)[0]; const games = (t.id === 'kidbday' && gp[firstG] ? gp[firstG] : [].concat(...Object.values(gp))).map(x => PP.GAMES.find(g => g.id === x.id)).filter(Boolean);
  const gname = i => games.length ? games[i % games.length].n.toLowerCase() : 'a group game';
  const at = o => o === 'midnight' ? (24 * 60) : o < 0 ? start + dur + o : o < 1 && o > 0 ? start + Math.round(dur * o / 5) * 5 : start + o;
  const rows = [];
  rows.push([start - (f.venue === 'restaurant' ? 30 : f.venue === 'hall' ? 150 : 120), f.venue === 'restaurant' ? 'Arrive to set centrepieces and the cake' : 'Set up: decor, tables, food stations, playlist on']);
  const base = t.id === 'kidbday' ? MOMENTS.kid : MOMENTS.adult;
  base.forEach(([o, txts], i) => { if (t.id === 'wedding' && /Speeches|Cake/.test(txts[0])) return; if (typeof o === 'number' && o > 0 && o >= 1 && o > dur - 15) return; rows.push([at(o), txts[(v + i) % txts.length].replace('{g1}', gname(v)).replace('{g2}', gname(v + 1)).replace('{g3}', gname(v + 2))]); });
  (SPECIAL[t.id] || []).forEach(([o, txt]) => rows.push([at(o), txt]));
  rows.push([start + dur, 'Party ends: thank guests' + (alcOn(f) ? ' and check everyone has a safe ride home' : '')]);
  rows.push([start + dur + 15, f.venue === 'park' ? 'Pack down and take all rubbish home' : 'Pack down and pop leftovers in the fridge within 2 hours']);
  rows.sort((a, b) => a[0] - b[0]);
  return rows.map(([m, txt]) => ({ time: fmtTime(m), txt }));
}
function fmtTime(m) { m = ((m % 1440) + 1440) % 1440; let h = Math.floor(m / 60), mi = m % 60; const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; return h + ':' + String(mi).padStart(2, '0') + ' ' + ap; }

// ---------- dates ----------
function addDays(iso, n) { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function fmtDate(iso, short) { const d = new Date(iso + 'T12:00:00'); return d.toLocaleDateString('en-AU', short ? { weekday: 'short', day: 'numeric', month: 'short' } : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
function todayISO() { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); }
function daysTo(iso) { return Math.round((new Date(iso + 'T12:00:00') - new Date(todayISO() + 'T12:00:00')) / 864e5); }
function whenText(f) { const tm = f.time ? fmtTime(f.time.split(':').reduce((a, b) => a * 60 + +b)) : ''; return (f.date ? fmtDate(f.date) : 'Date to be confirmed') + (tm ? ', from ' + tm : ''); }

// ---------- checklist ----------
function tasks(p) {
  const f = p.form, n = people(f);
  const okc = c => { if (c === '*') return true; if (c === 'alc') return alcOn(f); if (c === 'kids') return n.k > 0 || f.type === 'kidbday'; const [k, v] = c.split('='); const vs = v.split(','); return k === 'types' ? vs.includes(f.type) : k === 'venue' ? vs.includes(f.venue) : true; };
  const list = PP.TASKS.filter(t => okc(t.c)).map(t => ({ ...t }));
  p.custom.forEach(c => list.push({ id: c.id, b: c.b, t: c.t, custom: true }));
  return list;
}

// ---------- generation ----------
function generateAll(p) { genFood(p); genDecor(p); genGames(p); genInvites(p); genRun(p); p.picks.tips = freshPick(p, 'tips', PP.SAVE_TIPS, 3); p.fresh = false; p.updated = Date.now(); }

// ---------- UI ----------
let toastT;
function toast(m) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2200); }
function render() {
  const p = P();
  $('#tabs').hidden = !p || p.fresh;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === S.tab));
  setPageBg(p && !p.fresh ? p.pageBg : '');
  if (!p || p.fresh) { $('#hdr').innerHTML = ''; return renderSetup(); }
  const f = p.form, t = TYPE(f.type), th = themeOf(f);
  document.documentElement.style.setProperty('--t1', th.colours[0].h); document.documentElement.style.setProperty('--t2', th.colours[1].h);
  const d = f.date ? daysTo(f.date) : null;
  $('#hdr').innerHTML = `<div class="ph"><div class="phl"><span class="em">${th.emoji}</span><div><b data-testid="plan-title">${esc(planName(p))}</b><small>${esc(whenText(f))} · ${people(f).g} guests</small></div></div>${d != null ? `<span class="dd" data-testid="days-to-go">${d > 0 ? d + ' days to go' : d === 0 ? 'Today!' : 'Done'}</span>` : ''}</div>`;
  ({ plan: renderPlan, todo: renderTodo, food: renderFood, day: renderDay, guests: renderGuests })[S.tab]();
  if (S.tab === 'plan') pageBgPicker(p);
  invitationsSection(p);
  bindCommon();
}
function planName(p) { const f = p.form, t = TYPE(f.type); return f.name || (f.hon ? f.hon + "'s " + t.name.replace(/^Kids' |^Teen |^Adult /, '').replace(/ \(.*\)/, '').toLowerCase() : t.name); }

function renderSetup() {
  const p = P() || newPlan('kidbday'); const f = p.form, t = TYPE(f.type);
  const groups = [...new Set(PP.TYPES.map(x => x.group))];
  const themeChips = t.themes.filter(id => !hiddenTheme(t, id)).map(id => { const th = PP.THEMES[id]; return `<button class="chip ${f.theme === id ? 'on' : ''}" data-theme="${id}" data-testid="theme-${id}">${th.emoji} ${esc(th.name)}</button>`; }).join('');
  const others = Object.values(PP.THEMES).filter(x => !t.themes.includes(x.id) && !hiddenTheme(t, x.id)).sort((a, b) => a.name.localeCompare(b.name));
  const showAge = ['kidbday', 'teenbday', 'adultbday'].includes(f.type);
  $('#app').innerHTML = `
  <section class="hero"><div class="confetti"></div><h1>Plan a party that feels like you.</h1><p>Tell us the basics and get a budget, countdown checklist, menu with quantities, decor, games, run sheet, guest list and invites. Every idea can be refreshed.</p></section>
  <div class="card">
    <label class="f" for="type">What are you celebrating?</label>
    <select id="type" data-testid="type">${groups.map(g => `<optgroup label="${g}">${PP.TYPES.filter(x => x.group === g).map(x => `<option value="${x.id}" ${x.id === f.type ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</optgroup>`).join('')}</select>
    <div class="grid2">
      <div><label class="f" for="hon">${esc(t.hon)} <small>(optional)</small></label><input id="hon" type="text" maxlength="40" placeholder="${t.id === 'engagement' || t.id === 'wedding' ? 'e.g. Sam & Alex' : 'e.g. Sam'}" value="${esc(f.hon)}" data-testid="hon"></div>
      ${showAge ? `<div><label class="f" for="age">Turning</label><input id="age" type="number" min="1" max="110" value="${esc(f.age)}" data-testid="age"></div>` : ''}
    </div>
    <div class="grid2">
      <div><label class="f" for="guests">Guests (total)</label><input id="guests" type="number" min="2" max="500" value="${f.guests}" data-testid="guests"></div>
      <div><label class="f" for="kids">How many are kids?</label><input id="kids" type="number" min="0" max="500" value="${f.kids}" data-testid="kids"></div>
    </div>
    ${f.kids > 0 && f.type !== 'kidbday' ? `<label class="f">Kids are mostly</label><div class="seg" id="kidAge">${['t', 'k', 'w', 'e'].map(k => `<button data-v="${k}" class="${f.kidAge === k ? 'on' : ''}">${PP.AGE_GROUPS[k].replace(/ \(.*/, '')}</button>`).join('')}</div>` : ''}
    <div class="grid2">
      <div><label class="f" for="budget">Total budget (A$)</label><input id="budget" type="number" min="0" step="50" value="${f.budget}" data-testid="budget"></div>
      <div><label class="f" for="date">Date <small>(optional)</small></label><input id="date" type="date" value="${esc(f.date)}" data-testid="date"></div>
    </div>
    <div class="grid2">
      <div><label class="f" for="time">Start time</label><input id="time" type="time" value="${esc(f.time)}" data-testid="time"></div>
      <div><label class="f" for="hours">How long (hours)</label><input id="hours" type="number" min="1" max="12" step=".5" value="${f.hours}" data-testid="hours"></div>
    </div>
    <label class="f">Where?</label>
    <div class="seg" id="venue">${Object.entries(PP.VENUES).map(([k, v]) => `<button data-v="${k}" class="${f.venue === k ? 'on' : ''}" data-testid="venue-${k}">${v.icon} ${v.name.split(' /')[0]}</button>`).join('')}</div>
    <label class="f">Theme</label>
    <div class="chips" id="themes">${themeChips}<button class="chip ${f.theme === 'custom' ? 'on' : ''}" data-theme="custom" data-testid="theme-custom">✏️ Custom…</button></div>
    <select id="moreThemes" data-testid="more-themes" class="mt"><option value="">More themes…</option>${others.map(x => `<option value="${x.id}" ${f.theme === x.id ? 'selected' : ''}>${x.emoji} ${esc(x.name)}</option>`).join('')}</select>
    ${f.theme === 'custom' ? `<div class="customth"><input id="custom" type="text" maxlength="40" placeholder="Your theme, e.g. Paris picnic" value="${esc(f.custom)}" data-testid="custom-theme"><label>Main <input id="cc1" type="color" value="${f.cc1}"></label><label>Accent <input id="cc2" type="color" value="${f.cc2}"></label></div>` : ''}
    <details class="more" id="prefs" ${S.prefsOpen || f.style !== t.style || f.cuisine !== 'mix' ? 'open' : ''}><summary>Food & drink preferences</summary>
      <div class="grid2"><div><label class="f" for="style">Food style</label><select id="style" data-testid="style">${Object.entries(PP.FOOD_STYLES).map(([k, v]) => `<option value="${k}" ${f.style === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
      <div><label class="f" for="cuisine">Cuisine</label><select id="cuisine" data-testid="cuisine">${Object.entries(PP.CUISINES).map(([k, v]) => `<option value="${k}" ${f.cuisine === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div></div>
      <div class="chips mt"><label class="chip tog"><input type="checkbox" id="halal" ${f.halal ? 'checked' : ''}> Halal-friendly (no pork or alcohol)</label><label class="chip tog"><input type="checkbox" id="nutfree" ${f.nutfree ? 'checked' : ''}> Nut-free</label><label class="chip tog"><input type="checkbox" id="gf" ${f.gf ? 'checked' : ''}> Gluten-free only</label>
      ${t.alc > 0 ? `<label class="chip tog"><input type="checkbox" id="alcohol" ${f.alcohol ? 'checked' : ''} data-testid="alcohol"> Serve alcohol to guests aged 18+ only</label>` : ''}</div>
      ${t.alc > 0 && f.alcohol && NEEDS18(f) ? `<label class="f" for="adults18">How many guests are 18 or over? (required)</label><input id="adults18" type="number" min="0" required value="${f.adults18 ?? ''}" data-testid="adults18">` : ''}
      <label class="f" for="veg">Vegetarian guests: <span id="vegv">${f.veg}%</span></label><input id="veg" type="range" min="0" max="100" step="5" value="${f.veg}">
    </details>
    <button class="btn block big" id="go" data-testid="make-plan">${p.picks.food ? 'Update my plan' : 'Make my party plan'} 🎉</button>
    ${Object.keys(S.plans).length > 1 || p.picks.food ? `<button class="btn ghost block" id="cancelEdit">${p.picks.food ? 'Cancel' : 'My saved plans'}</button>` : ''}
  </div>`;
  const F = P().form;
  const num = (id, k, min) => { const el = $('#' + id); if (el) el.onchange = () => { F[k] = el.value === '' ? '' : Math.max(min, +el.value); if (k === 'guests' && F.kids > F.guests) F.kids = F.guests; save(); if (k === 'kids') renderSetup(); }; };
  $('#type').onchange = e => { const keep = { date: F.date, hon: F.hon }; Object.assign(F, newForm(e.target.value), keep); save(); renderSetup(); };
  $('#hon').oninput = e => { F.hon = e.target.value; save(); };
  num('age', 'age', 1); num('guests', 'guests', 1); num('kids', 'kids', 0); num('budget', 'budget', 0); num('hours', 'hours', 1);
  $('#date').onchange = e => { F.date = e.target.value; save(); };
  $('#time').onchange = e => { F.time = e.target.value; save(); };
  document.querySelectorAll('#venue button').forEach(b => b.onclick = () => { F.venue = b.dataset.v; if (F.venue === 'park' && F.style === 'sitdown') F.style = 'bbq'; save(); renderSetup(); });
  document.querySelectorAll('#kidAge button').forEach(b => b.onclick = () => { F.kidAge = b.dataset.v; save(); renderSetup(); });
  document.querySelectorAll('#themes [data-theme]').forEach(b => b.onclick = () => { F.theme = b.dataset.theme; save(); renderSetup(); });
  $('#moreThemes').onchange = e => { if (e.target.value) { F.theme = e.target.value; save(); renderSetup(); } };
  if ($('#custom')) { $('#custom').oninput = e => { F.custom = e.target.value; save(); }; $('#cc1').onchange = e => { F.cc1 = e.target.value; save(); }; $('#cc2').onchange = e => { F.cc2 = e.target.value; save(); }; }
  ['style', 'cuisine'].forEach(k => $('#' + k).onchange = e => { F[k] = e.target.value; save(); });
  ['halal', 'nutfree', 'gf', 'alcohol'].forEach(k => { const el = $('#' + k); if (el) el.onchange = () => { F[k] = el.checked; save(); if (k === 'alcohol') { S.prefsOpen = true; renderSetup(); const a = $('#adults18'); if (a) { a.scrollIntoView({ block: 'center' }); a.focus(); } } }; });
  if ($('#prefs')) $('#prefs').ontoggle = e => { S.prefsOpen = e.target.open; };
  if ($('#adults18')) $('#adults18').oninput = e => { F.adults18 = e.target.value === '' ? '' : Math.max(0, +e.target.value); save(); };
  $('#veg').oninput = e => { F.veg = +e.target.value; $('#vegv').textContent = F.veg + '%'; save(); };
  $('#go').onclick = () => { const pl = P(); if (!(+F.guests > 0)) return toast('Add how many guests'); if (alcOn(F) && NEEDS18(F) && (F.adults18 === '' || F.adults18 == null)) { toast('Add how many guests are 18 or over'); return; } if (F.theme === 'custom' && !F.custom.trim()) F.custom = 'My own theme'; generateAll(pl); S.tab = 'plan'; save(); render(); window.scrollTo(0, 0); toast('Plan ready. Tap ↻ on any section for fresh ideas.'); };
  if ($('#cancelEdit')) $('#cancelEdit').onclick = () => { const pl = P(); if (pl.picks.food) { pl.fresh = false; save(); render(); } else openPlans(); };
}

function sec(title, id, body, opts = {}) {
  return `<section class="card sec" id="sec-${id}"><div class="sech"><h2>${title}</h2><div class="row">${opts.ai && CFG.aiEndpoint && S.ai ? `<button class="ib" data-ai="${id}" title="AI ideas">✨</button>` : ''}${opts.regen ? `<button class="btn small alt" data-regen="${id}" data-testid="regen-${id}">↻ Fresh ideas</button>` : ''}</div></div>${body}<div class="ai-out" id="ai-${id}"></div></section>`;
}
function renderPlan() {
  const p = P(), f = p.form, b = budgetPlan(p), th = themeOf(f);
  const max = Math.max(...Object.values(b.lines), 1);
  const bandTxt = { tight: `That's ${money(b.perHead)} a guest, which is tight for a ${b.t.name.toLowerCase()} (most land around ${money(b.t.ph[0])}–${money(b.t.ph[1])}). Lean on the money-savers below or trim the guest list.`, 'on track': `That's ${money(b.perHead)} a guest, within our rough guide range for this kind of party.`, generous: `That's ${money(b.perHead)} a guest: room for a few extras, like an entertainer or a photo booth.` }[b.band];
  const lines = PP.BUDGET_CATS.map(([k, nm, ic]) => {
    const v = b.lines[k]; const covers = k === 'venue' ? PP.BUDGET_COVERS.venue[f.venue] : PP.BUDGET_COVERS[k];
    const cv = (k === 'drinks' && !alcOn(f) ? covers : covers).slice(0, 4).join(', ');
    return `<div class="bl ${k === 'buffer' && v < 0 ? 'neg' : ''}" data-testid="bl-${k}"><div class="blh"><span>${ic} ${nm}</span>${k === 'buffer' ? `<b>${money(v)}</b>` : `<span class="amt">A$<input type="number" min="0" step="10" data-bl="${k}" value="${Math.round(v)}" aria-label="${nm} amount"></span>`}</div><div class="bar"><i style="width:${Math.max(2, Math.abs(v) / max * 100)}%"></i></div><small>${Math.round(v / Math.max(1, +f.budget) * 100)}% · ${money(v / b.n.g)} a guest · ${esc(cv)}</small></div>`;
  }).join('');
  $('#app').innerHTML = `
  <section class="card summary-card"><div class="row spread"><div><div class="pill">${th.emoji} ${esc(th.name)}</div><div class="pill">${PP.VENUES[f.venue].icon} ${PP.VENUES[f.venue].name}</div><div class="pill">${PP.FOOD_STYLES[f.style]}</div>${alcOn(f) ? '<div class="pill">Alcohol served (18+)</div>' : '<div class="pill">Alcohol-free</div>'}</div></div>
  <div class="swatch">${th.colours.map(c => `<span style="background:${c.h}" title="${esc(c.n)}"></span>`).join('')}<small>${th.colours.map(c => esc(c.n)).join(' · ')}</small></div>
  <div class="row mt"><button class="btn small" data-act="edit" data-testid="edit-plan">✏️ Edit details</button><button class="btn small alt" data-act="print" data-testid="print">🖨 Print / PDF</button><button class="btn small alt" data-act="plans" data-testid="my-plans">📁 My plans</button></div></section>
  ${sec('Budget breakdown', 'budget', `<div class="bigtot"><b data-testid="budget-total">${money(+f.budget || 0)}</b><span class="band ${b.band.replace(' ', '-')}">${b.band}</span></div><p class="hint">${bandTxt}</p><p class="hint" data-testid="budget-disclaimer">Rough guide only, based on typical costs we've estimated. Not a quote. Prices vary a lot by area, season and supplier.</p>${lines}<div class="row mt"><button class="btn small ghost" data-act="resetbudget">Reset split</button></div>`)}
  ${sec('Money-savers', 'tips', `<ul class="ideas">${(p.picks.tips || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>`, { regen: 1 })}
  ${sec('At a glance', 'glance', glance(p))}
  ${aiCard()}`;
  document.querySelectorAll('[data-bl]').forEach(i => i.onchange = () => { p.budgetOv[i.dataset.bl] = Math.max(0, +i.value || 0); save(); render(); });
}
function glance(p) {
  const tl = tasks(p), done = tl.filter(t => p.done[t.id]).length, g = p.guests, yes = g.filter(x => x.rsvp === 'yes').reduce((a, x) => a + (+x.adults || 0) + (+x.kids || 0), 0);
  const fp = foodPlan(p);
  return `<div class="glance"><button data-tab="todo"><b>${done}/${tl.length}</b><span>to-dos done</span></button><button data-tab="food"><b>${fp.items.length}</b><span>dishes planned</span></button><button data-tab="guests"><b>${yes}</b><span>said yes</span></button><button data-tab="day"><b>${runSheet(p).length}</b><span>run-sheet steps</span></button></div>`;
}
function aiCard() {
  if (!CFG.aiEndpoint) return `<section class="card muted"><h3>✨ AI ideas</h3><p class="hint">Optional AI mode isn't switched on. Everything here runs in your browser on your device.</p></section>`;
  return `<section class="card"><label class="row spread"><span><b>✨ AI ideas</b><br><small class="hint">Sends your party basics (no guest names) to the AI service for extra ideas.</small></span><input type="checkbox" id="aiToggle" ${S.ai ? 'checked' : ''}></label></section>`;
}
function renderTodo() {
  const p = P(), f = p.form, list = tasks(p); const d = f.date ? daysTo(f.date) : null;
  let html = f.date ? `<p class="hint">Dates count back from ${esc(fmtDate(f.date))}.${d != null && d < 56 && d >= 0 ? ` You're ${d} days out, so earlier tasks are marked "catch up".` : ''}</p>` : `<p class="hint">Add a party date to see real dates on every step. <button class="linkb" data-act="edit">Add date</button></p>`;
  const total = list.length, done = list.filter(t => p.done[t.id]).length;
  html += `<div class="prog"><i style="width:${total ? done / total * 100 : 0}%"></i></div><p class="hint">${done} of ${total} done</p>`;
  PP.BUCKETS.forEach(([b, label, days]) => {
    const items = list.filter(t => t.b === b); if (!items.length) return;
    const dt = f.date ? addDays(f.date, -days) : null; const overdue = dt && d != null && d >= 0 && days > d;
    html += `<div class="bucket ${overdue ? 'late' : ''}"><h3>${label}${dt ? `<small>${esc(fmtDate(dt, true))}${overdue ? ' · catch up' : ''}</small>` : ''}</h3>${items.map(t => `<label class="item ${p.done[t.id] ? 'done' : ''}"><input type="checkbox" data-task="${t.id}" ${p.done[t.id] ? 'checked' : ''}><span class="t">${esc(t.t)}</span>${t.custom ? `<button class="x2" data-deltask="${t.id}" aria-label="Remove">×</button>` : ''}</label>`).join('')}</div>`;
  });
  html += `<div class="addrow"><select id="nb">${PP.BUCKETS.map(([b, l]) => `<option value="${b}">${l}</option>`).join('')}</select><input id="nt" type="text" placeholder="Add your own task" maxlength="100"><button class="btn small" id="addTask">Add</button></div>`;
  $('#app').innerHTML = sec('Countdown checklist', 'todo', html);
  document.querySelectorAll('[data-task]').forEach(c => c.onchange = () => { p.done[c.dataset.task] = c.checked; save(); render(); });
  document.querySelectorAll('[data-deltask]').forEach(c => c.onclick = e => { e.preventDefault(); p.custom = p.custom.filter(x => x.id !== c.dataset.deltask); save(); render(); });
  $('#addTask').onclick = () => { const t = $('#nt').value.trim(); if (!t) return; p.custom.push({ id: 'c' + uid(), b: $('#nb').value, t }); save(); render(); };
}
const CAT_N = { f: 'Nibbles & finger food', m: 'Mains', s: 'Sides & salads', d: 'Sweets', b: 'Brunch' };
function renderFood() {
  const p = P(), f = p.form, fp = foodPlan(p), list = shoppingList(p);
  const tg = d => [d.t.includes('v') ? '<span class="tag v">V</span>' : '', d.t.includes('gf') ? '<span class="tag">GF</span>' : '', d.t.includes('n') ? '<span class="tag n">Nuts</span>' : '', d.t.includes('se') ? '<span class="tag">Seafood</span>' : '', d.t.includes('p') ? '<span class="tag">Pork</span>' : ''].join('');
  let menu = `<p class="hint">For ${fp.n.a} adults${fp.n.k ? ' and ' + fp.n.k + ' kids (kids count as about 0.6 of an adult)' : ''} over ${f.hours} hours, ${PP.FOOD_STYLES[f.style].toLowerCase()}.</p>`;
  Object.keys(CAT_N).forEach(c => { const its = fp.items.filter(x => x.c === c); if (!its.length) return; menu += `<h3>${CAT_N[c]}</h3>` + its.map(x => `<div class="dish" data-testid="dish-${x.d.id}"><div><b>${esc(x.d.n)}</b> ${tg(x.d)}<small>${x.qty} ${x.d.u === 'pcs' ? 'pieces' : 'serves'} · about ${(x.qty / fp.n.g).toFixed(1)} per guest</small></div><button class="ib" data-swap="${c}:${x.d.id}" title="Swap this dish" aria-label="Swap ${esc(x.d.n)}">↻</button></div>`).join(''); });
  menu += `<h3>Cake</h3><div class="dish"><div><b>Celebration cake</b><small>${esc(fp.cake.note)}</small></div></div>`;
  if (f.halal) menu += `<p class="note" data-testid="halal-note">Halal-friendly ideas only. ${CFG.appName} doesn't certify anything, so check halal certification with your butcher or supplier, and check stocks, sauces and sweets for gelatine and alcohol-based flavourings.</p>`;
  menu += `<p class="note safe" data-testid="food-safety">Food safety: cook mince, sausages, burgers and chicken until the centre reaches 75°C (no pink, juices run clear). Keep cold food in the fridge or on ice until serving, and don't leave platters out for more than 2 hours (1 hour on hot days). Allergens: always check ingredient labels, ask guests about allergies, and label dishes that contain nuts, peanuts, sesame, milk, egg, soy, wheat/gluten, fish, shellfish or lupin. Diet options here are a guide only.</p>`;
  if (hasKids(f)) menu += `<p class="note warm" data-testid="kids-safety">Kids' safety: Burst or uninflated balloons are a choking risk for under-8s, so pick up balloon pieces straight away and never let small children blow up balloons. For under-5s, cut grapes, cherry tomatoes and mini sausages lengthways, and skip popcorn, whole nuts and hard lollies. Keep button batteries (in LED candles, remotes and toys) out of reach, and only use products with a screw-secured battery compartment. If you suspect a child has swallowed one, call the Poisons Information Centre on 13 11 26 straight away. Water: active adult supervision at all times near pools, spas, paddling pools and buckets, with the pool gate shut.</p>`;
  let drinks = fp.drinks.map(d => `<div class="dish"><div><b>${esc(d.n)}</b><small>${esc(d.q)}${d.note ? ' · ' + esc(d.note) : ''}</small></div></div>`).join('');
  if (fp.alc) drinks += `<h3>For guests 18+ <small>(about ${fp.alc.std} standard drinks across ${fp.alc.drinkers} drinking guests)</small></h3>` + fp.alc.list.map(d => `<div class="dish"><div><b>${esc(d.n)}</b><small>${esc(d.q)}</small></div></div>`).join('') + `<p class="note warm" data-testid="rsa-note"><b>Serve responsibly.</b> Never serve alcohol to anyone under 18, or to anyone who is intoxicated. Have food out all night, water at every station, alcohol-free options that look as good, a non-drinking host, and safe rides home. Rules on supplying alcohol differ by state and territory, so check yours.${fp.n.k ? ' Keep drinks away from the kids\' area.' : ''}</p>` + (NEEDS18(f) ? `<p class="note warm" data-testid="under18-note"><b>Guests under 18:</b> Many guests at 18ths and graduations are under 18. Don't serve them alcohol. In NSW and most states, only a parent or guardian, or someone they've authorised, can supply alcohol to a minor at a private party, and only with responsible supervision. Check ID, keep alcohol-free drinks just as good-looking, and keep the bar supervised by a sober adult.</p>` : '');
  else if (TYPE(f.type).alc === 0) drinks += `<p class="hint">This plan is alcohol-free.</p>`;
  const groups = {}; list.forEach(x => (groups[x.a] = groups[x.a] || []).push(x));
  const done = list.filter(x => p.shopDone[x.key]).length;
  let shop = `<p class="hint">${done} of ${list.length} ticked. Quantities are rounded up.</p><div class="row"><button class="btn small alt" data-act="copyshop" data-testid="copy-shop">📋 Copy list</button></div>`;
  Object.keys(PP.AISLES).forEach(a => { if (!groups[a]) return; shop += `<h3>${PP.AISLES[a]}</h3>` + groups[a].map(x => `<label class="item ${p.shopDone[x.key] ? 'done' : ''}"><input type="checkbox" data-shop="${esc(x.key)}" ${p.shopDone[x.key] ? 'checked' : ''}><span class="t"><span class="q">${esc(fmtQ(x.q, x.u))}</span> ${esc(x.i)}${x.for.length ? `<span class="for">for ${esc(x.for.slice(0, 3).join(', '))}${x.for.length > 3 ? ' +' + (x.for.length - 3) : ''}</span>` : ''}</span></label>`).join(''); });
  $('#app').innerHTML = sec('Menu & quantities', 'food', menu, { regen: 1, ai: 1 }) + sec('Drinks', 'drinks', drinks) + sec('Shopping list', 'shop', shop);
  document.querySelectorAll('[data-swap]').forEach(b => b.onclick = () => { const [c, id] = b.dataset.swap.split(':'); swapDish(p, c, id); save(); render(); });
  document.querySelectorAll('[data-shop]').forEach(c => c.onchange = () => { p.shopDone[c.dataset.shop] = c.checked; save(); render(); });
}
function renderDay() {
  const p = P(), f = p.form, th = themeOf(f);
  if (!p.picks.decor || p.picks.decor.themeId !== th.id) { genDecor(p); save(); }
  const dec = p.picks.decor;
  let decor = `<div class="swatch">${th.colours.map(c => `<span style="background:${c.h}"></span>`).join('')}<small>${esc(th.name)}: ${th.colours.map(c => esc(c.n)).join(', ')}</small></div>`;
  if (dec.special.length) decor += `<h3>Made for this party</h3><ul class="ideas">${dec.special.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  decor += dec.areas.map(a => `<h3>${esc(a.area)}</h3><ul class="ideas">${a.ideas.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`).join('');
  if (th.id === 'casino') decor += `<p class="note" data-testid="casino-note">Play money only. Everyone gets the same free stack of chips. Chips can't be bought, topped up with real money, or swapped for cash, vouchers or prizes. Want a winner? Give a fun title like "High Roller of the Night", not money.</p>`;
  decor += `<h3>For your venue</h3><ul class="ideas">${(PP.DECOR_VENUE[f.venue] || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="hint">Dress code idea: ${esc(th.dress)}. Music: ${esc(th.music)}.</p>`;
  let games = '';
  Object.entries(p.picks.games || {}).forEach(([g, arr]) => { games += `<h3>${PP.AGE_GROUPS[g]}</h3>` + arr.map(x => { const gm = PP.GAMES.find(y => y.id === x.id); if (!gm) return ''; return `<details class="game"><summary><b>${esc(gm.n)}</b><small>${gm.mins} min · ${{ i: 'indoors', o: 'outdoors', b: 'in or out' }[gm.w]}</small></summary><p>${esc(fill(gm.how, f, th))}</p><p class="hint">You'll need: ${esc(gm.needs)}.</p><p class="twist">${esc(x.twist)}</p></details>`; }).join(''); });
  if (th.id === 'casino') games += `<p class="note" data-testid="casino-games-note">Play money only. Everyone gets the same free stack of chips. Chips can't be bought, topped up with real money, or swapped for cash, vouchers or prizes. Want a winner? Give a fun title like "High Roller of the Night", not money.</p>`;
  if (hasKids(f)) games += `<p class="note warm">Kids' safety: Burst or uninflated balloons are a choking risk for under-8s, so pick up balloon pieces straight away and never let small children blow up balloons. For under-5s, cut grapes, cherry tomatoes and mini sausages lengthways, and skip popcorn, whole nuts and hard lollies. Keep button batteries (in LED candles, remotes and toys) out of reach, and only use products with a screw-secured battery compartment. If you suspect a child has swallowed one, call the Poisons Information Centre on 13 11 26 straight away. Water: active adult supervision at all times near pools, spas, paddling pools and buckets, with the pool gate shut.</p>`;
  const rs = runSheet(p);
  const run = `<p class="hint">From ${esc(whenText(f))} for ${f.hours} hours.</p><ol class="run" data-testid="runsheet">${rs.map(r => `<li><b>${r.time}</b><span>${esc(r.txt)}</span></li>`).join('')}</ol>`;
  const E = window.PP_ENT; p.ent = p.ent || {};
  const ent = E ? `<p class="note warm" data-testid="ent-note">${esc(E.hostNote)}</p>` + E.items.map(it => `<div class="guest"><label class="row"><input type="checkbox" data-ent="${it.id}" ${p.ent[it.id] ? 'checked' : ''} data-testid="ent-${it.id}"> ${it.emoji} <b>${esc(it.name)}</b></label>${it.line ? `<small class="hint">${esc(it.line)}</small>` : ''}${it.note ? `<br><small class="hint"><i>${esc(it.note)}</i></small>` : ''}${it.id === 'other' && p.ent.other ? `<input class="diet" data-entother maxlength="160" value="${esc(p.entOther || '')}" placeholder="Your own idea" data-testid="ent-other-text"><p class="hint small" data-testid="ent-other-terms">${esc(E.otherTerms)}</p>` : ''}</div>`).join('') + (Object.keys(p.ent).some(k => p.ent[k]) ? `<p class="note safe" data-testid="ent-tip">${esc(E.tip)}</p>` : '') : '';
  $('#app').innerHTML = sec('Decor ideas', 'decor', decor, { regen: 1, ai: 1 }) + sec('Games & activities', 'games', games, { regen: 1, ai: 1 }) + (E ? sec('Entertainment ideas', 'ent', ent) : '') + sec('Run sheet for the day', 'run', run, { regen: 1 });
  document.querySelectorAll('[data-ent]').forEach(i => i.onchange = () => { if (i.checked) p.ent[i.dataset.ent] = true; else delete p.ent[i.dataset.ent]; save(); render(); });
  const eo = document.querySelector('[data-entother]'); if (eo) eo.onchange = () => { p.entOther = eo.value.trim(); save(); };
}
function renderGuests() {
  const p = P(), f = p.form, g = p.guests;
  const sum = k => g.filter(x => x.rsvp === k).reduce((a, x) => a + (+x.adults || 0) + (+x.kids || 0), 0);
  const tot = g.reduce((a, x) => a + (+x.adults || 0) + (+x.kids || 0), 0);
  let html = `<div class="glance"><div><b data-testid="rsvp-yes">${sum('yes')}</b><span>yes</span></div><div><b>${sum('maybe')}</b><span>maybe</span></div><div><b>${sum('no')}</b><span>can't come</span></div><div><b>${sum('invited')}</b><span>waiting</span></div></div>`;
  html += `<p class="hint">${g.length} invites, ${tot} people. Your plan is set for ${f.guests}.${sum('yes') + sum('maybe') && sum('yes') + sum('maybe') !== +f.guests ? ` <button class="linkb" data-act="usersvp" data-testid="use-rsvp">Use ${sum('yes') + sum('maybe')} (yes + maybe)</button>` : ''}</p>`;
  html += `<div class="addguest"><input id="gn" type="text" placeholder="Name or family" maxlength="60" data-testid="guest-name"><input id="ga" type="number" min="0" value="1" title="Adults" aria-label="Adults"><input id="gk" type="number" min="0" value="0" title="Kids" aria-label="Kids"><button class="btn small" id="addGuest" data-testid="add-guest">Add</button></div><p class="hint small">Adults · kids. Paste a list of names (one per line) to add many at once.</p>`;
  html += g.map(x => `<div class="guest" data-testid="guest-${x.id}"><div class="gtop"><b>${esc(x.name)}</b><small>${x.adults} adult${x.adults == 1 ? '' : 's'}${+x.kids ? ', ' + x.kids + ' kid' + (x.kids == 1 ? '' : 's') : ''}</small><button class="x2" data-delguest="${x.id}" aria-label="Remove">×</button></div><div class="seg sm">${[['invited', 'Invited'], ['yes', 'Yes'], ['maybe', 'Maybe'], ['no', 'No']].map(([k, l]) => `<button data-rsvp="${x.id}:${k}" class="${x.rsvp === k ? 'on ' + k : ''}">${l}</button>`).join('')}</div><input class="diet" data-diet="${x.id}" placeholder="Dietary needs or notes" value="${esc(x.diet || '')}" maxlength="80"></div>`).join('');
  if (g.length) html += `<div class="row mt"><button class="btn small alt" data-act="csv">⬇ Download CSV</button></div>`;
  html += `<p class="hint small">Guest details stay on this device only.</p>`;
  const tone = p.inviteTone || 'fun';
  let inv = `<div class="seg" id="tone">${Object.entries(PP.INVITE.tones).map(([k, l]) => `<button data-v="${k}" class="${tone === k ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  inv += (p.picks.invites || []).map((t, i) => `<div class="invite"><pre data-testid="invite-${i}">${esc(t)}</pre><button class="btn small alt" data-copyinv="${i}">📋 Copy</button></div>`).join('');
  const invApp = CFG.inviteAppUrl ? `<section class="card" data-testid="invite-app-card"><h2>💌 Send digital invites</h2><p class="hint">Email invitations with RSVP links and bar drink coupons, from your own Gmail. Opens our separate invitations app.</p><button class="btn" id="openInviteApp" data-testid="open-invite-app">Open the invitations app ↗</button></section>` : '';
  $('#app').innerHTML = invApp + sec('Guest list & RSVPs', 'guests', html) + sec('Invite wording', 'invites', inv, { regen: 1, ai: 1 });
  const oia = $('#openInviteApp'); if (oia) oia.onclick = () => window.open(inviteUrl(p), '_blank', 'noopener'); // event details only (no guest list, no emails)
  const addG = () => { const raw = $('#gn').value.trim(); if (!raw) return; raw.split(/\n|;/).map(s => s.trim()).filter(Boolean).forEach(n => g.push({ id: uid(), name: n, adults: Math.max(0, +$('#ga').value || 0), kids: Math.max(0, +$('#gk').value || 0), rsvp: 'invited', diet: '' })); save(); render(); setTimeout(() => $('#gn') && $('#gn').focus(), 0); };
  $('#addGuest').onclick = addG; $('#gn').onkeydown = e => { if (e.key === 'Enter') addG(); };
  $('#gn').onpaste = e => { const t = (e.clipboardData || {}).getData ? e.clipboardData.getData('text') : ''; if (t && t.includes('\n')) { e.preventDefault(); $('#gn').value = t; addG(); } };
  document.querySelectorAll('[data-rsvp]').forEach(b => b.onclick = () => { const [id, k] = b.dataset.rsvp.split(':'); g.find(x => x.id === id).rsvp = k; save(); render(); });
  document.querySelectorAll('[data-delguest]').forEach(b => b.onclick = () => { if (!confirm('Remove this guest?')) return; p.guests = g.filter(x => x.id !== b.dataset.delguest); save(); render(); });
  document.querySelectorAll('[data-diet]').forEach(i => i.onchange = () => { g.find(x => x.id === i.dataset.diet).diet = i.value; save(); });
  document.querySelectorAll('#tone button').forEach(b => b.onclick = () => { p.inviteTone = b.dataset.v; genInvites(p); save(); render(); });
  document.querySelectorAll('[data-copyinv]').forEach(b => b.onclick = () => copy(p.picks.invites[+b.dataset.copyinv]));
}
function copy(t) { (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Copied'), () => { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); toast('Copied'); }); }
function download(name, text, type) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }

function bindCommon() {
  const p = P();
  document.querySelectorAll('[data-regen]').forEach(b => b.onclick = () => {
    const k = b.dataset.regen;
    ({ food: genFood, decor: genDecor, games: genGames, invites: genInvites, run: genRun, tips: pp => pp.picks.tips = freshPick(pp, 'tips', PP.SAVE_TIPS, 3) })[k](p);
    p.updated = Date.now(); save(); render(); toast('Fresh ideas');
  });
  document.querySelectorAll('#app [data-tab]').forEach(b => b.onclick = () => { S.tab = b.dataset.tab; save(); render(); window.scrollTo(0, 0); });
  document.querySelectorAll('[data-act]').forEach(b => b.onclick = () => act(b.dataset.act));
  document.querySelectorAll('[data-ai]').forEach(b => b.onclick = () => aiIdeas(b.dataset.ai));
  const at = $('#aiToggle'); if (at) at.onchange = () => { S.ai = at.checked; save(); };
}
function act(a) {
  const p = P();
  if (a === 'edit') { p.fresh = true; save(); render(); window.scrollTo(0, 0); }
  if (a === 'print') printPlan();
  if (a === 'plans') openPlans();
  if (a === 'resetbudget') { p.budgetOv = {}; save(); render(); }
  if (a === 'usersvp') { const y = p.guests.filter(x => x.rsvp === 'yes' || x.rsvp === 'maybe'); p.form.guests = y.reduce((s, x) => s + (+x.adults || 0) + (+x.kids || 0), 0); p.form.kids = y.reduce((s, x) => s + (+x.kids || 0), 0); save(); render(); toast('Plan updated to ' + p.form.guests + ' guests'); }
  if (a === 'copyshop') { const l = shoppingList(p); copy(planName(p) + ' shopping list\n' + Object.keys(PP.AISLES).map(k => { const it = l.filter(x => x.a === k && !p.shopDone[x.key]); return it.length ? '\n' + PP.AISLES[k] + '\n' + it.map(x => '- ' + fmtQ(x.q, x.u) + ' ' + x.i).join('\n') : ''; }).join('')); }
  if (a === 'csv') { const q = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"'; download('guest-list.csv', 'Name,Adults,Kids,RSVP,Notes\n' + p.guests.map(x => [x.name, x.adults, x.kids, x.rsvp, x.diet].map(q).join(',')).join('\n'), 'text/csv'); }
}
function openPlans() {
  const list = Object.values(S.plans).filter(x => x.picks.food || x.id === S.current).sort((a, b) => b.updated - a.updated);
  $('#modalBody').innerHTML = `<h2>My plans</h2><p class="hint">Saved on this device.</p>${list.map(x => `<div class="planrow ${x.id === S.current ? 'cur' : ''}"><button class="pr" data-open="${x.id}"><b>${esc(planName(x))}</b><small>${esc(whenText(x.form))}</small></button><button class="ib" data-dup="${x.id}" title="Duplicate" aria-label="Duplicate">⧉</button><button class="ib" data-del="${x.id}" title="Delete" aria-label="Delete">🗑</button></div>`).join('')}<button class="btn block mt" id="newPlan" data-testid="new-plan">＋ Plan another party</button>`;
  $('#modal').hidden = false;
  document.querySelectorAll('[data-open]').forEach(b => b.onclick = () => { S.current = b.dataset.open; S.tab = 'plan'; save(); closeModal(); render(); });
  document.querySelectorAll('[data-dup]').forEach(b => b.onclick = () => { const src = S.plans[b.dataset.dup]; const c = JSON.parse(JSON.stringify(src)); c.id = uid(); c.form.name = planName(src) + ' (copy)'; c.updated = Date.now(); S.plans[c.id] = c; S.current = c.id; save(); openPlans(); render(); toast('Copied plan'); });
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (!confirm('Delete this plan from this device?')) return; delete S.plans[b.dataset.del]; if (S.current === b.dataset.del) S.current = Object.keys(S.plans)[0] || null; save(); if (!S.current) newPlan('kidbday'); openPlans(); render(); });
  $('#newPlan').onclick = () => { newPlan('kidbday'); save(); closeModal(); render(); window.scrollTo(0, 0); };
}
function closeModal() { $('#modal').hidden = true; }
function printPlan() {
  const p = P(), f = p.form, th = themeOf(f), b = budgetPlan(p), fp = foodPlan(p), list = shoppingList(p);
  if (!p.picks.decor || p.picks.decor.themeId !== th.id) genDecor(p);
  const h = [`<p class="pbrand" data-testid="print-brand"><b>${esc(CFG.appName + ' ' + CFG.brand)}</b></p>`];
  h.push(`<h1>${esc(planName(p))}</h1><p>${esc(whenText(f))} · ${PP.VENUES[f.venue].name} · ${people(f).g} guests · Theme: ${esc(th.name)} · Budget ${money(+f.budget || 0)}</p>`);
  h.push(`<h2>Budget</h2><table>${PP.BUDGET_CATS.map(([k, n]) => `<tr><td>${n}</td><td>${money(b.lines[k])}</td></tr>`).join('')}</table>`);
  if (window.PP_ENT && p.ent && Object.keys(p.ent).length) h.push(`<h2>Entertainment ideas</h2><ul>${PP_ENT.items.filter(it => p.ent[it.id]).map(it => `<li><b>${esc(it.name)}</b>${it.id === 'other' ? (p.entOther ? ': ' + esc(p.entOther) : '') : ''}</li>`).join('')}</ul><p><i>${esc(PP_ENT.hostNote)} ${esc(PP_ENT.tip)}</i></p>`);
  h.push(`<h2>Run sheet</h2><table>${runSheet(p).map(r => `<tr><td>${r.time}</td><td>${esc(r.txt)}</td></tr>`).join('')}</table>`);
  h.push(`<h2>Checklist</h2>` + PP.BUCKETS.map(([bk, l, d]) => { const it = tasks(p).filter(t => t.b === bk); return it.length ? `<h3>${l}${f.date ? ' (' + esc(fmtDate(addDays(f.date, -d), true)) + ')' : ''}</h3><ul class="ck">${it.map(t => `<li>${p.done[t.id] ? '☑' : '☐'} ${esc(t.t)}</li>`).join('')}</ul>` : ''; }).join(''));
  h.push(`<h2>Menu</h2><ul>${fp.items.map(x => `<li>${esc(x.d.n)}: ${x.qty} ${x.d.u === 'pcs' ? 'pieces' : 'serves'}</li>`).join('')}<li>Celebration cake: about ${fp.cake.slices} slices</li></ul><h3>Drinks</h3><ul>${fp.drinks.concat(fp.alc ? fp.alc.list : []).map(d => `<li>${esc(d.n)}: ${esc(d.q)}</li>`).join('')}</ul>${fp.alc ? '<p><i>Serve responsibly: no alcohol to anyone under 18 or intoxicated; food, water and alcohol-free options all night; safe rides home. Rules on supplying alcohol differ by state and territory, so check yours.</i></p>' : ''}${fp.alc && NEEDS18(f) ? `<p data-testid="print-under18"><i><b>Guests under 18:</b> Many guests at 18ths and graduations are under 18. Don't serve them alcohol. In NSW and most states, only a parent or guardian, or someone they've authorised, can supply alcohol to a minor at a private party, and only with responsible supervision. Check ID, keep alcohol-free drinks just as good-looking, and keep the bar supervised by a sober adult. Rules on supplying alcohol differ by state and territory, so check yours.</i></p>` : ''}${f.halal ? `<p data-testid="print-halal"><i>Halal-friendly ideas only. ${CFG.appName} doesn't certify anything, so check halal certification with your butcher or supplier, and check stocks, sauces and sweets for gelatine and alcohol-based flavourings.</i></p>` : ''}<p><i>Food safety: cook mince, sausages, burgers and chicken until the centre reaches 75°C (no pink, juices run clear). Keep cold food in the fridge or on ice until serving, and don't leave platters out for more than 2 hours (1 hour on hot days). Allergens: always check ingredient labels, ask guests about allergies, and label dishes that contain nuts, peanuts, sesame, milk, egg, soy, wheat/gluten, fish, shellfish or lupin. Diet options here are a guide only.</i></p>${hasKids(f) ? `<p><i>Kids' safety: Burst or uninflated balloons are a choking risk for under-8s, so pick up balloon pieces straight away and never let small children blow up balloons. For under-5s, cut grapes, cherry tomatoes and mini sausages lengthways, and skip popcorn, whole nuts and hard lollies. Keep button batteries (in LED candles, remotes and toys) out of reach, and only use products with a screw-secured battery compartment. If you suspect a child has swallowed one, call the Poisons Information Centre on 13 11 26 straight away. Water: active adult supervision at all times near pools, spas, paddling pools and buckets, with the pool gate shut.</i></p>` : ''}`);
  h.push(`<h2>Shopping list</h2>` + Object.keys(PP.AISLES).map(k => { const it = list.filter(x => x.a === k); return it.length ? `<h3>${PP.AISLES[k]}</h3><ul class="ck">${it.map(x => `<li>☐ ${esc(fmtQ(x.q, x.u))} ${esc(x.i)}</li>`).join('')}</ul>` : ''; }).join(''));
  h.push(`<h2>Decor</h2>` + p.picks.decor.areas.map(a => `<h3>${esc(a.area)}</h3><ul>${a.ideas.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join(''));
  h.push(`<h2>Games</h2>` + Object.entries(p.picks.games || {}).map(([g, arr]) => `<h3>${PP.AGE_GROUPS[g]}</h3><ul>${arr.map(x => { const gm = PP.GAMES.find(y => y.id === x.id); return gm ? `<li><b>${esc(gm.n)}</b>: ${esc(fill(gm.how, f, th))}</li>` : ''; }).join('')}</ul>`).join(''));
  if (p.guests.length) h.push(`<h2>Guest list</h2><table>${p.guests.map(x => `<tr><td>${esc(x.name)}</td><td>${x.adults}+${x.kids}</td><td>${x.rsvp}</td><td>${esc(x.diet || '')}</td></tr>`).join('')}</table>`);
  if (p.picks.invites && p.picks.invites[0]) h.push(`<h2>Invite</h2><pre>${esc(p.picks.invites[0])}</pre>`);
  h.push(`<p class="pfoot">Made with ${CFG.appName} · Makerman Services. Ideas and estimates only; check prices, venue rules and allergens. Written with Grok for Makerman Services.</p>`);
  $('#print').innerHTML = h.join('');
  setTimeout(() => window.print(), 50);
}
async function aiIdeas(sec) {
  const p = P(), f = p.form, out = $('#ai-' + sec); if (!CFG.aiEndpoint) return;
  out.innerHTML = '<p class="hint">Thinking…</p>';
  try {
    const r = await fetch(CFG.aiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: sec, party: { type: TYPE(f.type).name, guests: f.guests, kids: f.kids, budget: f.budget, venue: f.venue, theme: themeOf(f).name, style: f.style, cuisine: f.cuisine, alcohol: alcOn(f) }, avoid: (p.seen['ai-' + sec] || []).slice(-30) }) });
    const j = await r.json(); const ideas = (j.ideas || []).slice(0, 6).map(String);
    p.seen['ai-' + sec] = (p.seen['ai-' + sec] || []).concat(ideas); save();
    out.innerHTML = `<h3>✨ AI ideas</h3><ul class="ideas">${ideas.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  } catch (e) { out.innerHTML = '<p class="hint">AI ideas are unavailable right now. Everything else still works in your browser.</p>'; }
}

// ---------- boot ----------
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { S.tab = b.dataset.tab; save(); render(); window.scrollTo(0, 0); });
$('#modal').onclick = e => { if (e.target.id === 'modal' || e.target.hasAttribute('data-close')) closeModal(); };
document.title = CFG.appName + ' ' + CFG.brand + ': Interactive Party Planner'; { const b = document.querySelector('#brand strong'); if (b) b.textContent = CFG.appName; const s2 = document.querySelector('#brand span'); if (s2) s2.textContent = CFG.brand; }
$('#brand').onclick = () => { if (P() && P().picks.food) { openPlans(); } };
if (!S.current || !S.plans[S.current]) { newPlan('kidbday'); save(); }
render();
window.PartySorted = { state: () => S, P, budgetPlan, foodPlan, shoppingList, runSheet, tasks, themeOf, invitePrefill: p => invitePrefill(p) };
/* Full-page background. Fixed layer z-index -1 behind everything, pointer-events none; content stays on top. */
function PAGE_BGS() { return CFG.pageBgs || []; }
function pageBgOf(id) { return PAGE_BGS().find(x => x.id === id) || null; }
function setPageBg(id) {
  const a = pageBgOf(id), bg = $('#pageBg'), on = !!(a && a.src); if (!bg) return;
  bg.hidden = !on; $('#pageFade').hidden = !on; bg.style.backgroundImage = on ? `url('${a.src}')` : 'none';
  document.body.classList.toggle('has-pagebg', on);
  const lab = $('#pageArtLabel'), no = $('#pageArtNotice'), cap = $('#pageCap');
  lab.hidden = !(on && a.ai); lab.textContent = 'Background: ' + ((a && a.label) || CFG.pageArtLabel);
  no.hidden = !(on && a.notice); no.textContent = (on && a.notice) || '';
  cap.hidden = !(on && a.ai); cap.textContent = on ? (a.label || CFG.pageArtLabel) + (a.notice ? ' · ' + a.notice : '') : '';
}
function pageBgPicker(p) {
  if (!PAGE_BGS().length) return; const a = pageBgOf(p.pageBg);
  $('#app').insertAdjacentHTML('beforeend', `<section class="card" data-testid="page-bg-card"><h2>🖼️ Page background</h2><p class="hint">Photo backgrounds for your planner page. Text and buttons stay on top.</p><select id="pageBgSel" data-testid="page-bg" aria-label="Page background"><option value="">Plain</option>${PAGE_BGS().map(x => `<option value="${x.id}" ${p.pageBg === x.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select>${a && a.notice ? `<p class="hint" data-testid="page-bg-notice">${esc(a.notice)}</p>` : ''}${a && a.ai ? `<p class="hint small" data-testid="page-bg-label">${esc(a.label || CFG.pageArtLabel)}</p>` : ''}</section>`);
  $('#pageBgSel').onchange = e => { p.pageBg = e.target.value; save(); render(); };
}


/* Invitations at the bottom of every tab: uses what the host entered above. Event details go in the URL hash (never sent to a
   server, no guest emails); guest NAMES go only by postMessage to the embedded invitations app. Everything stays editable there. */
function addMins(hm, mins) { const [h, m] = String(hm || '').split(':').map(Number); if (isNaN(h)) return ''; const t = ((h * 60 + (m || 0) + Math.round(mins)) % 1440 + 1440) % 1440; return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); }
function invitePrefill(p) {
  const f = p.form, t = TYPE(f.type), th = themeOf(f), kids = ['kidbday', 'teenbday'].includes(f.type);
  return { v: 1, pid: p.id, name: planName(p), type: t.name, host: p.hostName || '', date: f.date || '', time: f.time || '', endTime: f.time && f.hours ? addMins(f.time, f.hours * 60) : '', venue: (PP.VENUES[f.venue] || {}).name || '', theme: th.name, kids, child: kids ? (f.hon || '') : '', age: kids ? (f.age || '') : '', alcohol: !kids && alcOn(f) };
}
function b64url(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function inviteUrl(p) { return CFG.inviteAppUrl + '#prefill=' + b64url(JSON.stringify(invitePrefill(p))); }
var invFrameFor = null; // eslint-disable-line no-var (used during the first render)
function invitationsSection(p) {
  if (!CFG.inviteAppUrl || !p || p.fresh) return;
  const d = invitePrefill(p), names = (p.guests || []).map(g => g.name).filter(Boolean);
  const row = (k, v) => `<li><b>${k}:</b> ${esc(v || 'not set yet')}</li>`;
  $('#app').insertAdjacentHTML('beforeend', `<section class="card" id="invitations" data-testid="invitations"><h2>💌 Invitations</h2>
    <p class="hint">Uses what you entered above. Check it here, then change anything inside the invitations app.</p>
    <label class="f" for="invHost">Your name (host)</label><input id="invHost" type="text" maxlength="60" value="${esc(p.hostName || '')}" data-testid="inv-host">
    <p class="hint small" data-testid="inv-host-hint">Shown to your guests. A first name or nickname is fine.</p>
    <ul class="invsum" data-testid="inv-summary">${row('Event', d.name)}${row('Type', d.type)}${row('When', [d.date, d.time].filter(Boolean).join(' at '))}${row('Venue', d.venue)}${row('Theme', d.theme)}${row('Party', d.kids ? "Kids' party: mocktail coupons only" : 'Adults')}${row('Guests', names.length ? names.length + ': ' + names.slice(0, 6).join(', ') + (names.length > 6 ? '…' : '') : '')}</ul>
    <div class="row mt"><button class="btn" id="invEmbed" data-testid="inv-embed">${p.invOpen ? '↻ Refresh with my latest details' : 'Start invitations here'}</button><button class="btn small alt" id="invTab" data-testid="inv-open">Open in a new tab ↗</button></div>
    <p class="hint small">Guest names are passed to the invitations app on this page only. Email addresses are never put in a link.</p>
    <div id="invWrap" data-testid="inv-wrap"></div></section>`);
  const h = $('#invHost'); h.onchange = () => { p.hostName = h.value.trim(); save(); render(); };
  $('#invTab').onclick = () => window.open(inviteUrl(p), '_blank', 'noopener');
  const show = () => { const w = $('#invWrap'), fr = document.createElement('iframe'); fr.title = 'Invitations'; fr.className = 'invframe'; fr.setAttribute('data-testid', 'inv-frame'); fr.src = inviteUrl(p); w.innerHTML = ''; w.appendChild(fr); invFrameFor = fr; };
  $('#invEmbed').onclick = () => { p.invOpen = true; save(); render(); setTimeout(() => { show(); const s = $('#invitations'); if (s) s.scrollIntoView({ block: 'start' }); }, 0); };
  if (p.invOpen) show();
}
window.addEventListener('message', e => {
  const p = P(); if (!p || !invFrameFor || e.source !== invFrameFor.contentWindow || !CFG.inviteAppUrl) return;
  const origin = new URL(CFG.inviteAppUrl, location.href).origin; if (e.origin !== origin) return;
  if (e.data && e.data.type === 'ie-ready') e.source.postMessage({ type: 'mp-prefill', event: invitePrefill(p), guests: (p.guests || []).map(g => g.name).filter(Boolean) }, origin);
});
})();
