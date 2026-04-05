'use strict';

// ============================================================
// 1. CONFIG
// ============================================================
const CFG = {
  gridSize:      36,
  gridCols:      6,
  daysPerSeason: 60,
  saveKey:       'farmingGame_v2',
  startCoins:    100,
  maxLog:        30,
};

// ============================================================
// 2. CROP DEFINITIONS
// ============================================================
const CROP_RARITY_LABEL = { common:'普通', rare:'稀有', premium:'高級', legendary:'傳奇', mythic:'神話' };
const CROP_RARITY_COLOR = { common:'#ccc', rare:'#64b5f6', premium:'#81c784', legendary:'#ffd700', mythic:'#e040fb' };

const CROPS = {
  // ── 普通 ────────────────────────────────────────────────────────
  broccoli:    { id:'broccoli',    name:'花椰菜',   emoji:'🥦', rarity:'common',    seedCost:8,    sellPrice:20,   growDays:2,  seasons:null,                     unlockLevel:1  },
  radish:      { id:'radish',      name:'蘿蔔',     emoji:'🥬', rarity:'common',    seedCost:10,   sellPrice:28,   growDays:2,  seasons:null,                     unlockLevel:1  },
  onion:       { id:'onion',       name:'洋蔥',     emoji:'🧅', rarity:'common',    seedCost:14,   sellPrice:38,   growDays:3,  seasons:null,                     unlockLevel:5  },
  carrot:      { id:'carrot',      name:'胡蘿蔔',   emoji:'🥕', rarity:'common',    seedCost:18,   sellPrice:50,   growDays:3,  seasons:['spring','autumn'],       unlockLevel:10 },
  cucumber:    { id:'cucumber',    name:'小黃瓜',   emoji:'🥒', rarity:'common',    seedCost:24,   sellPrice:70,   growDays:4,  seasons:['summer'],                unlockLevel:15 },
  strawberry:  { id:'strawberry',  name:'草莓',     emoji:'🍓', rarity:'common',    seedCost:22,   sellPrice:65,   growDays:3,  seasons:['spring'],                unlockLevel:18 },
  tomato:      { id:'tomato',      name:'番茄',     emoji:'🍅', rarity:'common',    seedCost:28,   sellPrice:80,   growDays:5,  seasons:['summer'],                unlockLevel:20 },
  corn:        { id:'corn',        name:'玉米',     emoji:'🌽', rarity:'common',    seedCost:35,   sellPrice:100,  growDays:6,  seasons:['summer'],                unlockLevel:22 },
  pumpkin:     { id:'pumpkin',     name:'南瓜',     emoji:'🎃', rarity:'common',    seedCost:40,   sellPrice:130,  growDays:7,  seasons:['autumn'],                unlockLevel:25 },
  // ── 稀有 ────────────────────────────────────────────────────────
  mushroom:    { id:'mushroom',    name:'蘑菇',     emoji:'🍄', rarity:'rare',      seedCost:45,   sellPrice:140,  growDays:5,  seasons:['autumn'],                unlockLevel:30 },
  sunflower:   { id:'sunflower',   name:'向日葵',   emoji:'🌻', rarity:'rare',      seedCost:55,   sellPrice:180,  growDays:10, seasons:null,                     unlockLevel:35 },
  watermelon:  { id:'watermelon',  name:'西瓜',     emoji:'🍉', rarity:'rare',      seedCost:60,   sellPrice:200,  growDays:9,  seasons:['summer'],                unlockLevel:40 },
  grape:       { id:'grape',       name:'葡萄',     emoji:'🍇', rarity:'rare',      seedCost:70,   sellPrice:250,  growDays:12, seasons:['autumn'],                unlockLevel:45 },
  cherry:      { id:'cherry',      name:'櫻桃',     emoji:'🍒', rarity:'rare',      seedCost:85,   sellPrice:290,  growDays:11, seasons:['spring'],                unlockLevel:50 },
  blueberry:   { id:'blueberry',   name:'藍莓',     emoji:'🫐', rarity:'rare',      seedCost:95,   sellPrice:320,  growDays:13, seasons:['summer'],                unlockLevel:55 },
  // ── 高級（收穫必為高級品質）──────────────────────────────────────
  peach:       { id:'peach',       name:'水蜜桃',   emoji:'🍑', rarity:'premium',   seedCost:140,  sellPrice:460,  growDays:15, seasons:['spring'],  unlockLevel:60, alwaysExcellent:true },
  coconut:     { id:'coconut',     name:'椰子',     emoji:'🥥', rarity:'premium',   seedCost:300,  sellPrice:950,  growDays:20, seasons:['summer'],  unlockLevel:65, alwaysExcellent:true },
  rose:        { id:'rose',        name:'玫瑰',     emoji:'🌹', rarity:'premium',   seedCost:220,  sellPrice:700,  growDays:17, seasons:['spring'],  unlockLevel:70, alwaysExcellent:true },
  // ── 傳奇（收穫必為高級品質）──────────────────────────────────────
  lotus:       { id:'lotus',       name:'蓮花',     emoji:'🪷', rarity:'legendary', seedCost:500,  sellPrice:1600, growDays:22, seasons:null,        unlockLevel:75, alwaysExcellent:true },
  crystalHerb: { id:'crystalHerb', name:'幻晶草',   emoji:'🔮', rarity:'legendary', seedCost:700,  sellPrice:2200, growDays:28, seasons:null,        unlockLevel:80, alwaysExcellent:true },
  starBlossom: { id:'starBlossom', name:'星辰花',   emoji:'🌠', rarity:'legendary', seedCost:950,  sellPrice:3000, growDays:34, seasons:['winter'],  unlockLevel:85, alwaysExcellent:true },
  sacredBamboo:{ id:'sacredBamboo',name:'仙竹',     emoji:'🎋', rarity:'legendary', seedCost:1200, sellPrice:4200, growDays:40, seasons:null,        unlockLevel:90, alwaysExcellent:true },
  // ── 神話（收穫必為高級品質）──────────────────────────────────────
  rainbowFruit:{ id:'rainbowFruit',name:'彩虹果',   emoji:'🌈', rarity:'mythic',    seedCost:3000, sellPrice:12000,growDays:55, seasons:null,        unlockLevel:100,alwaysExcellent:true },
};

// ============================================================
// 2.5  PET DEFINITIONS
// ============================================================
const PETS = {
  // ── Common (weight:50) ──────────────────────────────────────────────
  chick:       { id:'chick',       name:'雞仔',    emoji:'🐔', rarity:'common',    weight:50,
                 buffDesc:'每次收穫 +5💰',                buff:{ type:'harvest_coins', amount:5 } },
  caterpillar: { id:'caterpillar', name:'毛毛蟲',  emoji:'🐛', rarity:'common',    weight:50,
                 buffDesc:'每次澆水 +2 XP',               buff:{ type:'water_xp', amount:2 } },
  ladybug:     { id:'ladybug',     name:'瓢蟲',    emoji:'🐞', rarity:'common',    weight:50,
                 buffDesc:'收穫品質提升機率 +15%',         buff:{ type:'quality_chance', bonus:0.15 } },
  bee:         { id:'bee',         name:'小蜜蜂',  emoji:'🐝', rarity:'common',    weight:50,
                 buffDesc:'種子費用 -10%',                 buff:{ type:'plant_discount', pct:0.10 } },
  fish:        { id:'fish',        name:'小魚',    emoji:'🐟', rarity:'common',    weight:50,
                 buffDesc:'每天獲得 +8💰',                 buff:{ type:'daily_coins', amount:8 } },
  mouse:       { id:'mouse',       name:'小鼠',    emoji:'🐭', rarity:'common',    weight:50,
                 buffDesc:'收穫 XP +20%',                  buff:{ type:'harvest_xp', pct:0.20 } },
  butterfly:   { id:'butterfly',   name:'蝴蝶',    emoji:'🦋', rarity:'common',    weight:50,
                 buffDesc:'春季收穫額外 +15💰',            buff:{ type:'spring_coins', amount:15 } },
  turtle:      { id:'turtle',      name:'烏龜',    emoji:'🐢', rarity:'common',    weight:50,
                 buffDesc:'作物可多耐 1 天缺水',           buff:{ type:'wilt_resist' } },
  frog:        { id:'frog',        name:'青蛙',    emoji:'🐸', rarity:'common',    weight:50,
                 buffDesc:'下雨天收穫必為優良品質',        buff:{ type:'rain_quality' } },
  hamster:     { id:'hamster',     name:'倉鼠',    emoji:'🐹', rarity:'common',    weight:50,
                 buffDesc:'所有出售價格 +8%',              buff:{ type:'sell_bonus', pct:0.08 } },
  rabbit:      { id:'rabbit',      name:'兔子',    emoji:'🐇', rarity:'common',    weight:50,
                 buffDesc:'作物每天額外生長 +0.15 天',     buff:{ type:'grow_speed', bonus:0.15 } },
  squirrel:    { id:'squirrel',    name:'松鼠',    emoji:'🐿️', rarity:'common',    weight:50,
                 buffDesc:'秋季收穫額外 +18💰',            buff:{ type:'autumn_coins', amount:18 } },
  duck:        { id:'duck',        name:'小鴨',    emoji:'🦆', rarity:'common',    weight:50,
                 buffDesc:'下雨天每天額外 +12💰',          buff:{ type:'rain_coins', amount:12 } },
  rooster:     { id:'rooster',     name:'公雞',    emoji:'🐓', rarity:'common',    weight:50,
                 buffDesc:'每天開始獲得 +6💰',             buff:{ type:'daily_coins', amount:6 } },
  sheep:       { id:'sheep',       name:'小羊',    emoji:'🐑', rarity:'common',    weight:50,
                 buffDesc:'種子費用 -8%',                  buff:{ type:'plant_discount', pct:0.08 } },
  ant:         { id:'ant',         name:'螞蟻',    emoji:'🐜', rarity:'common',    weight:50,
                 buffDesc:'每次收穫 +3💰',                 buff:{ type:'harvest_coins', amount:3 } },
  blowfish:    { id:'blowfish',    name:'河豚',    emoji:'🐡', rarity:'common',    weight:50,
                 buffDesc:'出售價格 +6%',                  buff:{ type:'sell_bonus', pct:0.06 } },
  parrot:      { id:'parrot',      name:'鸚鵡',    emoji:'🦜', rarity:'common',    weight:50,
                 buffDesc:'每次收穫 +3 XP',                buff:{ type:'harvest_xp_flat', amount:3 } },
  sparrow:     { id:'sparrow',     name:'小麻雀',  emoji:'🐦', rarity:'common',    weight:50,
                 buffDesc:'每次澆水 +3 XP',                buff:{ type:'water_xp', amount:3 } },
  cricket:     { id:'cricket',     name:'蟋蟀',    emoji:'🦗', rarity:'common',    weight:50,
                 buffDesc:'夏季收穫額外 +14💰',            buff:{ type:'summer_coins', amount:14 } },
  snail:       { id:'snail',       name:'蝸牛',    emoji:'🐌', rarity:'common',    weight:50,
                 buffDesc:'每次種植 +5 XP',                buff:{ type:'plant_xp', amount:5 } },
  bear:        { id:'bear',        name:'小熊',    emoji:'🐻', rarity:'common',    weight:50,
                 buffDesc:'冬季收穫額外 +22💰',            buff:{ type:'winter_coins', amount:22 } },
  hedgehog:    { id:'hedgehog',    name:'刺蝟',    emoji:'🦔', rarity:'common',    weight:50,
                 buffDesc:'收穫 XP +10%',                  buff:{ type:'harvest_xp', pct:0.10 } },
  crab:        { id:'crab',        name:'螃蟹',    emoji:'🦀', rarity:'common',    weight:50,
                 buffDesc:'收穫品質提升機率 +10%',         buff:{ type:'quality_chance', bonus:0.10 } },
  penguin:     { id:'penguin',     name:'企鵝',    emoji:'🐧', rarity:'common',    weight:50,
                 buffDesc:'出售價格 +7%',                  buff:{ type:'sell_bonus', pct:0.07 } },
  // ── Rare (weight:12) ────────────────────────────────────────────────
  fox:         { id:'fox',         name:'小狐狸',  emoji:'🦊', rarity:'rare',      weight:12,
                 buffDesc:'所有出售收入 +20%',             buff:{ type:'sell_bonus', pct:0.20 } },
  raccoon:     { id:'raccoon',     name:'浣熊',    emoji:'🦝', rarity:'rare',      weight:12,
                 buffDesc:'每次收穫 +5 XP',                buff:{ type:'harvest_xp_flat', amount:5 } },
  wolf:        { id:'wolf',        name:'小狼',    emoji:'🐺', rarity:'rare',      weight:12,
                 buffDesc:'每天開始獲得 +25💰',            buff:{ type:'daily_coins', amount:25 } },
  eagle:       { id:'eagle',       name:'老鷹',    emoji:'🦅', rarity:'rare',      weight:12,
                 buffDesc:'收穫時 30% 機率獲得雙倍作物',   buff:{ type:'double_harvest', chance:0.30 } },
  lizard:      { id:'lizard',      name:'小蜥蜴',  emoji:'🦎', rarity:'rare',      weight:12,
                 buffDesc:'作物每天額外生長 +0.3 天',      buff:{ type:'grow_speed', bonus:0.30 } },
  deer:        { id:'deer',        name:'小鹿',    emoji:'🦌', rarity:'rare',      weight:12,
                 buffDesc:'每次收穫 +15💰',                buff:{ type:'harvest_coins', amount:15 } },
  owl:         { id:'owl',         name:'貓頭鷹',  emoji:'🦉', rarity:'rare',      weight:12,
                 buffDesc:'每次收穫 +10 XP',               buff:{ type:'harvest_xp_flat', amount:10 } },
  tiger:       { id:'tiger',       name:'小老虎',  emoji:'🐯', rarity:'rare',      weight:12,
                 buffDesc:'收穫時 20% 機率獲得雙倍作物',   buff:{ type:'double_harvest', chance:0.20 } },
  dolphin:     { id:'dolphin',     name:'海豚',    emoji:'🐬', rarity:'rare',      weight:12,
                 buffDesc:'出售收入 +15%',                  buff:{ type:'sell_bonus', pct:0.15 } },
  panda:       { id:'panda',       name:'貓熊',    emoji:'🐼', rarity:'rare',      weight:12,
                 buffDesc:'作物每天額外生長 +0.4 天',      buff:{ type:'grow_speed', bonus:0.40 } },
  elephant:    { id:'elephant',    name:'大象',    emoji:'🐘', rarity:'rare',      weight:12,
                 buffDesc:'每天開始獲得 +35💰',            buff:{ type:'daily_coins', amount:35 } },
  horse:       { id:'horse',       name:'駿馬',    emoji:'🐴', rarity:'rare',      weight:12,
                 buffDesc:'作物每天額外生長 +0.5 天',      buff:{ type:'grow_speed', bonus:0.50 } },
  whale:       { id:'whale',       name:'鯨魚',    emoji:'🐋', rarity:'rare',      weight:12,
                 buffDesc:'出售收入 +25%',                  buff:{ type:'sell_bonus', pct:0.25 } },
  gorilla:     { id:'gorilla',     name:'大猩猩',  emoji:'🦍', rarity:'rare',      weight:12,
                 buffDesc:'每次收穫 +20💰',                buff:{ type:'harvest_coins', amount:20 } },
  peacock:     { id:'peacock',     name:'孔雀',    emoji:'🦚', rarity:'rare',      weight:12,
                 buffDesc:'收穫品質提升機率 +25%',         buff:{ type:'quality_chance', bonus:0.25 } },
  // ── Legendary (weight:3) ────────────────────────────────────────────
  unicorn:     { id:'unicorn',     name:'獨角獸',  emoji:'🦄', rarity:'legendary', weight:3,
                 buffDesc:'所有 XP +50%，出售收入 +25%',
                 buff:{ type:'legendary_unicorn', xp_pct:0.50, sell_pct:0.25 } },
  dragon:      { id:'dragon',      name:'金龍',    emoji:'🐉', rarity:'legendary', weight:3,
                 buffDesc:'每天 +50💰，收穫 40% 機率為高級',
                 buff:{ type:'legendary_dragon', daily_coins:50 } },
  lion:        { id:'lion',        name:'獅王',    emoji:'🦁', rarity:'legendary', weight:3,
                 buffDesc:'出售收入 +50%，每次收穫 +30💰',
                 buff:{ type:'legendary_lion', sell_pct:0.50, harvest_coins:30 } },
  moonrabbit:  { id:'moonrabbit',  name:'月兔',    emoji:'🌙', rarity:'legendary', weight:3,
                 buffDesc:'所有 XP +50%，種子費用 -25%',
                 buff:{ type:'legendary_moonrabbit', xp_pct:0.50, plant_pct:0.25 } },
  stormdrake:  { id:'stormdrake',  name:'暴風龍',  emoji:'🌪️', rarity:'legendary', weight:3,
                 buffDesc:'生長 +0.8天/天，每天 +60💰',
                 buff:{ type:'legendary_storm', grow_bonus:0.80, daily_coins:60 } },
  // ── Mythic (weight:0.5) ─────────────────────────────────────────────
  cosmos:      { id:'cosmos',      name:'宇宙靈',  emoji:'🌌', rarity:'mythic',    weight:0.5,
                 buffDesc:'出售 +60%，XP +80%，每天 +100💰，生長 +0.5天',
                 buff:{ type:'mythic_cosmos', sell_pct:0.60, xp_pct:0.80, daily_coins:100, grow_bonus:0.50 } },
  worldtree:   { id:'worldtree',   name:'世界樹精', emoji:'🌳', rarity:'mythic',   weight:0.5,
                 buffDesc:'每次收穫 +50💰，品質 +50%，種子 -30%',
                 buff:{ type:'mythic_worldtree', harvest_coins:50, quality_bonus:0.50, plant_pct:0.30 } },
};

// ── Pet helpers ──────────────────────────────────────────────────────
function generateDailyPets() {
  const pool  = Object.values(PETS);
  const total = pool.reduce((s, p) => s + p.weight, 0);
  const selected = [];
  const used = new Set();
  let attempts = 0;
  while (selected.length < 3 && attempts < 200) {
    attempts++;
    let r = Math.random() * total;
    const pet = pool.find(p => (r -= p.weight) < 0) || pool[0];
    if (!used.has(pet.id)) { used.add(pet.id); selected.push(pet.id); }
  }
  return selected;
}

function getActivePet() {
  // kept for HUD badge only — buff logic uses getMyPets()
  if (!state || !state.pets || !state.pets.activePetId) return null;
  return PETS[state.pets.activePetId] || null;
}

function getMyPets() {
  if (!state || !state.pets || !state.pets.myPets) return [];
  return state.pets.myPets.map(p => PETS[p.petId]).filter(Boolean);
}

// Sum a numeric field across all pets that have a given buff type
function getPetBuffTotal(type, field) {
  return getMyPets()
    .filter(p => p.buff.type === type)
    .reduce((sum, p) => sum + (p.buff[field] || 0), 0);
}

// True if any owned pet has the given buff type
function hasPetBuff(type) {
  return getMyPets().some(p => p.buff.type === type);
}

function getSellMultiplier() {
  let mult = 1;
  mult += getPetBuffTotal('sell_bonus', 'pct');
  mult += getPetBuffTotal('legendary_unicorn', 'sell_pct');
  mult += getPetBuffTotal('legendary_lion', 'sell_pct');
  mult += getPetBuffTotal('mythic_cosmos', 'sell_pct');
  return mult;
}

// ============================================================
// 3. SEASON & WEATHER
// ============================================================
const SEASONS_ORDER = ['spring','summer','autumn','winter'];
const SEASON_INFO = {
  spring: { name:'春', icon:'🌸', growthRate:1.2,  deathChance:0 },
  summer: { name:'夏', icon:'☀️', growthRate:1.0,  deathChance:0 },
  autumn: { name:'秋', icon:'🍂', growthRate:1.0,  deathChance:0 },
  winter: { name:'冬', icon:'❄️', growthRate:0.5,  deathChance:0.15 },
};
const WEATHER_POOL = [
  { type:'sunny',   name:'晴天',  icon:'☀️', weight:40, effect:null },
  { type:'rain',    name:'下雨',  icon:'🌧️', weight:25, effect:'auto_water' },
  { type:'storm',   name:'暴風雨', icon:'⛈️', weight:10, effect:'damage_30' },
  { type:'fog',     name:'霧天',  icon:'🌫️', weight:15, effect:'slow_50' },
  { type:'rainbow', name:'彩虹',  icon:'🌈', weight:10, effect:'coin_x2' },
];

function rollWeather() {
  const total = WEATHER_POOL.reduce((s,e) => s + e.weight, 0);
  let r = Math.random() * total;
  return WEATHER_POOL.find(e => (r -= e.weight) < 0) || WEATHER_POOL[0];
}

function getSeasonByDay(day) {
  return SEASONS_ORDER[Math.floor((day - 1) / CFG.daysPerSeason) % 4];
}

// ============================================================
// 4. LEVEL CONFIG
// ============================================================
// XP formula: cumulative xp(n) = (n-1) * (200 + 75*(n-2)),  level 100 ≈ 747,450 XP
const LEVELS = [
  { level:1,   xp:0,      title:'新農夫' },
  { level:2,   xp:200,    title:'新農夫二段' },
  { level:3,   xp:550,    title:'菜鳥農民' },
  { level:4,   xp:1050,   title:'菜鳥農民二段' },
  { level:5,   xp:1700,   title:'見習農',     unlocks:['onion'] },
  { level:6,   xp:2500,   title:'見習農二段' },
  { level:7,   xp:3450,   title:'見習農三段' },
  { level:8,   xp:4550,   title:'初級農夫' },
  { level:9,   xp:5800,   title:'初級農夫二段' },
  { level:10,  xp:7200,   title:'老農',       unlocks:['carrot'] },
  { level:11,  xp:8750,   title:'老農二段' },
  { level:12,  xp:10450,  title:'老農三段' },
  { level:13,  xp:12300,  title:'熟練農夫' },
  { level:14,  xp:14300,  title:'熟練農夫二段' },
  { level:15,  xp:16450,  title:'農場工',     unlocks:['cucumber'] },
  { level:16,  xp:18750,  title:'農場工二段' },
  { level:17,  xp:21200,  title:'農場工三段' },
  { level:18,  xp:23800,  title:'農場工四段',  unlocks:['strawberry'] },
  { level:19,  xp:26550,  title:'農場工五段' },
  { level:20,  xp:29450,  title:'農場主',     unlocks:['tomato'] },
  { level:21,  xp:32500,  title:'農場主二段' },
  { level:22,  xp:35700,  title:'農場主三段',  unlocks:['corn'] },
  { level:23,  xp:39050,  title:'農場主四段' },
  { level:24,  xp:42550,  title:'農場主五段' },
  { level:25,  xp:46200,  title:'農業師',     unlocks:['pumpkin'] },
  { level:26,  xp:50000,  title:'農業師二段' },
  { level:27,  xp:53950,  title:'農業師三段' },
  { level:28,  xp:58050,  title:'農業師四段' },
  { level:29,  xp:62300,  title:'農業師五段' },
  { level:30,  xp:66700,  title:'資深農師',   unlocks:['mushroom'] },
  { level:31,  xp:71250,  title:'資深農師二段' },
  { level:32,  xp:75950,  title:'資深農師三段' },
  { level:33,  xp:80800,  title:'資深農師四段' },
  { level:34,  xp:85800,  title:'資深農師五段' },
  { level:35,  xp:90950,  title:'農業專家',   unlocks:['sunflower'] },
  { level:36,  xp:96250,  title:'農業專家二段' },
  { level:37,  xp:101700, title:'農業專家三段' },
  { level:38,  xp:107300, title:'農業專家四段' },
  { level:39,  xp:113050, title:'農業專家五段' },
  { level:40,  xp:118950, title:'農業達人',   unlocks:['watermelon'] },
  { level:41,  xp:125000, title:'農業達人二段' },
  { level:42,  xp:131200, title:'農業達人三段' },
  { level:43,  xp:137550, title:'農業達人四段' },
  { level:44,  xp:144050, title:'農業達人五段' },
  { level:45,  xp:150700, title:'農業宗師',   unlocks:['grape'] },
  { level:46,  xp:157500, title:'農業宗師二段' },
  { level:47,  xp:164450, title:'農業宗師三段' },
  { level:48,  xp:171550, title:'農業宗師四段' },
  { level:49,  xp:178800, title:'農業宗師五段' },
  { level:50,  xp:186200, title:'農地領主',   unlocks:['cherry'] },
  { level:51,  xp:193750, title:'農地領主二段' },
  { level:52,  xp:201450, title:'農地領主三段' },
  { level:53,  xp:209300, title:'農地領主四段' },
  { level:54,  xp:217300, title:'農地領主五段' },
  { level:55,  xp:225450, title:'農業大師',   unlocks:['blueberry'] },
  { level:56,  xp:233750, title:'農業大師二段' },
  { level:57,  xp:242200, title:'農業大師三段' },
  { level:58,  xp:250800, title:'農業大師四段' },
  { level:59,  xp:259550, title:'農業大師五段' },
  { level:60,  xp:268450, title:'農耕先鋒',   unlocks:['peach'] },
  { level:61,  xp:277500, title:'農耕先鋒二段' },
  { level:62,  xp:286700, title:'農耕先鋒三段' },
  { level:63,  xp:296050, title:'農耕先鋒四段' },
  { level:64,  xp:305550, title:'農耕先鋒五段' },
  { level:65,  xp:315200, title:'豐收之王',   unlocks:['coconut'] },
  { level:66,  xp:325000, title:'豐收之王二段' },
  { level:67,  xp:334950, title:'豐收之王三段' },
  { level:68,  xp:345050, title:'豐收之王四段' },
  { level:69,  xp:355300, title:'豐收之王五段' },
  { level:70,  xp:365700, title:'神農',       unlocks:['rose'] },
  { level:71,  xp:376250, title:'神農二段' },
  { level:72,  xp:386950, title:'神農三段' },
  { level:73,  xp:397800, title:'神農四段' },
  { level:74,  xp:408800, title:'神農五段' },
  { level:75,  xp:419950, title:'大地守護者',  unlocks:['lotus'] },
  { level:76,  xp:431250, title:'大地守護者二段' },
  { level:77,  xp:442700, title:'大地守護者三段' },
  { level:78,  xp:454300, title:'大地守護者四段' },
  { level:79,  xp:466050, title:'大地守護者五段' },
  { level:80,  xp:477950, title:'四季農仙',   unlocks:['crystalHerb'] },
  { level:81,  xp:490000, title:'四季農仙二段' },
  { level:82,  xp:502200, title:'四季農仙三段' },
  { level:83,  xp:514550, title:'四季農仙四段' },
  { level:84,  xp:527050, title:'四季農仙五段' },
  { level:85,  xp:539700, title:'穀物聖者',   unlocks:['starBlossom'] },
  { level:86,  xp:552500, title:'穀物聖者二段' },
  { level:87,  xp:565450, title:'穀物聖者三段' },
  { level:88,  xp:578550, title:'穀物聖者四段' },
  { level:89,  xp:591800, title:'穀物聖者五段' },
  { level:90,  xp:605200, title:'萬物耕者',   unlocks:['sacredBamboo'] },
  { level:91,  xp:618750, title:'萬物耕者二段' },
  { level:92,  xp:632450, title:'萬物耕者三段' },
  { level:93,  xp:646300, title:'萬物耕者四段' },
  { level:94,  xp:660300, title:'萬物耕者五段' },
  { level:95,  xp:674450, title:'傳說農夫' },
  { level:96,  xp:688750, title:'傳說農夫二段' },
  { level:97,  xp:703200, title:'傳說農夫三段' },
  { level:98,  xp:717800, title:'傳說農夫四段' },
  { level:99,  xp:732550, title:'傳說農夫五段' },
  { level:100, xp:747450, title:'永恆神農',   unlocks:['rainbowFruit'] },
];

const XP_FOR = { plant:5, water:2, harvest:15, quest:50, login:10 };

function getLevelData(level) {
  let data = LEVELS[0];
  for (const l of LEVELS) { if (l.level <= level) data = l; else break; }
  return data;
}
function getNextLevelData(level) {
  return LEVELS.find(l => l.level > level) || null;
}
function xpForLevel(level) {
  const next = getNextLevelData(level);
  return next ? next.xp : Infinity;
}

// ============================================================
// 5. ACHIEVEMENTS
// ============================================================
const ACHIEVEMENTS = {
  first_plant:   { name:'🌱 初次種植', desc:'種下第一顆種子',        xp:10,  check: s => s.stats.totalPlanted >= 1 },
  rich_farmer:   { name:'💰 富農',     desc:'持有超過 1000 金幣',     xp:20,  check: s => s.coins >= 1000 },
  harvest_king:  { name:'🌾 豐收王',   desc:'同一天收穫超過 10 格',   xp:30,  check: s => s.stats.todayHarvest >= 10 },
  rain_harvest:  { name:'☔ 雨天農夫', desc:'在下雨天收穫作物',        xp:20,  check: s => s.stats.rainHarvest >= 1 },
  level_5:       { name:'⭐ 農場主',   desc:'達到 Lv.5',              xp:50,  check: s => s.player.level >= 5 },
  legend_farmer: { name:'🏆 傳奇農夫', desc:'達到 Lv.20',             xp:200, check: s => s.player.level >= 20 },
  first_pet:     { name:'🐾 初次收養', desc:'第一次收養寵物',           xp:20,  check: s => !!(s.pets && s.pets.myPets && s.pets.myPets.length > 0) },
  legend_pet:    { name:'🐉 傳說馴獸師', desc:'收養一隻傳奇寵物',       xp:100, check: s => !!(s.pets && s.pets.myPets && s.pets.myPets.some(p => PETS[p.petId] && PETS[p.petId].rarity === 'legendary')) },
  full_house:    { name:'🏠 滿員農場', desc:'同時飼養 5 隻寵物',        xp:60,  check: s => !!(s.pets && s.pets.myPets && s.pets.myPets.length >= 5) },
};

// ============================================================
// 6. NPC CONFIG
// ============================================================
const NPCS = {
  old_farmer: {
    name:'老農伯', emoji:'🧓',
    greeting:'年輕人，我有些好種子，算你便宜！',
    triggerFn: (s) => Math.random() < 0.28 && s.day > 2,
    offerFn: (s) => {
      const ids = Object.keys(CROPS).filter(id => s.player.level >= CROPS[id].unlockLevel);
      const id = ids[Math.floor(Math.random() * ids.length)];
      const crop = CROPS[id];
      const discountCost = Math.ceil(crop.seedCost * 0.7);
      return { cropId: id, originalCost: crop.seedCost, discountCost, qty: 3,
               desc: `${crop.emoji} ${crop.name} 種子 ×3（原價 ${crop.seedCost*3}💰）` };
    },
  },
  mystery_merchant: {
    name:'神秘行商', emoji:'👻',
    greeting:'嘿嘿，難得一見的寶物，錯過就沒了...',
    triggerFn: (s) => s.day % 10 === 0,
    offerFn: () => {
      const rewards = [
        { type:'coins', amount: Math.floor(Math.random()*200+100), desc:null },
        { type:'xp',    amount: Math.floor(Math.random()*80+50),   desc:null },
      ];
      const r = rewards[Math.floor(Math.random()*rewards.length)];
      r.desc = r.type === 'coins' ? `獲得 ${r.amount} 💰` : `獲得 ${r.amount} XP`;
      return r;
    },
  },
};

// ============================================================
// 7. DAILY QUEST TEMPLATES
// ============================================================
function generateQuests(day) {
  const d = ((day - 1) % 7) + 1; // vary quests
  // Rotate quest sets so each day feels different
  const set = ((day - 1) % 3); // 0, 1, or 2
  const base = [
    { id:'plant',    type:'plant',     desc:`今天種植 ${2+d%3} 格作物`,   target:2+d%3,   reward:{ coins:30,  xp:10 }, progress:0, done:false },
    { id:'harvest',  type:'harvest',   desc:`今天收穫 ${2+d%3} 格作物`,   target:2+d%3,   reward:{ coins:50,  xp:20 }, progress:0, done:false },
    { id:'earn',     type:'earn',      desc:`今天賺取 ${50+d*10} 金幣`,    target:50+d*10, reward:{ xp:25 },            progress:0, done:false },
    { id:'waterAll', type:'water_all', desc:'替所有作物澆水',               target:1,       reward:{ xp:15 },            progress:0, done:false },
  ];
  const extras = [
    // Set 0
    [
      { id:'water5',   type:'water',     desc:`今天澆水 ${4+d} 次`,          target:4+d,     reward:{ coins:20,  xp:12 }, progress:0, done:false },
      { id:'harvest5', type:'harvest',   desc:`今天收穫 ${4+d} 格作物`,      target:4+d,     reward:{ coins:80,  xp:30 }, progress:0, done:false },
    ],
    // Set 1
    [
      { id:'plant8',   type:'plant',     desc:`今天種植 ${5+d%4} 格作物`,    target:5+d%4,   reward:{ coins:50,  xp:20 }, progress:0, done:false },
      { id:'earn2',    type:'earn',      desc:`今天賺取 ${120+d*15} 金幣`,   target:120+d*15,reward:{ coins:40,  xp:30 }, progress:0, done:false },
    ],
    // Set 2
    [
      { id:'water3',   type:'water',     desc:`今天澆水 ${3+d%3} 次`,        target:3+d%3,   reward:{ coins:15,  xp:10 }, progress:0, done:false },
      { id:'plant5',   type:'plant',     desc:`今天種植 ${3+d%4} 格作物`,    target:3+d%4,   reward:{ coins:35,  xp:15 }, progress:0, done:false },
    ],
  ];
  return [...base, ...extras[set]];
}

// ============================================================
// 8. STATE
// ============================================================
let state = null;

function emptyTile() {
  return { state:'empty', crop:null, growthDay:0, watered:false, isReady:false, wiltedDays:0, hp:100 };
}

function freshState() {
  return {
    day:       1,
    coins:     CFG.startCoins,
    season:    'spring',
    weather:   'sunny',
    weatherEffect: null,
    player:    { level:1, xp:0, title:'新農夫' },
    grid:      Array.from({ length: CFG.gridSize }, emptyTile),
    inventory: [],
    seedStash:  {},   // { cropId: quantity } — seeds from NPC purchases
    dailyQuests: generateQuests(1),
    achievements: {},
    selectedSeed: null,
    activeTool:   'seed',
    activeTab:    'shop',
    log:          ['🌾 歡迎來到農場！'],
    stats: {
      totalPlanted:0, totalHarvested:0, totalCoinsEarned:0,
      todayHarvest:0, rainHarvest:0,
    },
    questProgress:  { earn:0 },
    dayTimeLeft:    120,   // seconds remaining to plant this day (2 minutes)
    pets: {
      myPets:      [],    // [{ petId }] — max 5
      activePetId: null,  // which myPet is currently providing buff
      dailyPets:   [],    // filled after freshState() in initGame
      newPets:     false,
      feeding:     {},    // { petId: fedCount } — reset each day
    },
    usedCodes: [],
  };
}

// ============================================================
// 9. SAVE / LOAD
// ============================================================
function saveGame() {
  localStorage.setItem(CFG.saveKey, JSON.stringify(state));
}
function loadGame() {
  try {
    const raw = localStorage.getItem(CFG.saveKey);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (!s.grid || s.grid.length !== CFG.gridSize) return false;
    // Migrate: ensure new fields exist
    if (!s.inventory)      s.inventory = [];
    if (!s.seedStash)      s.seedStash  = {};
    if (!s.dailyQuests)    s.dailyQuests = generateQuests(s.day);
    if (!s.achievements)   s.achievements = {};
    if (!s.weatherEffect)  s.weatherEffect = null;
    if (!s.questProgress)  s.questProgress = { earn: 0 };
    if (!s.stats.todayHarvest)       s.stats.todayHarvest = 0;
    if (!s.stats.rainHarvest)        s.stats.rainHarvest  = 0;
    if (s.dayTimeLeft === undefined)  s.dayTimeLeft = 120;
    if (!s.pets) s.pets = { myPets: [], activePetId: null, dailyPets: [], newPets: false, feeding: {} };
    if (!s.pets.myPets)   s.pets.myPets   = [];
    if (!s.pets.feeding)  s.pets.feeding  = {};
    if (!s.pets.dailyPets) s.pets.dailyPets = [];
    if (!s.usedCodes) s.usedCodes = [];
    // migrate: old single-pet activePetId → myPets array
    if (s.pets.activePetId && s.pets.myPets.length === 0) {
      s.pets.myPets = [{ petId: s.pets.activePetId }];
    }
    state = s;
    return true;
  } catch { return false; }
}

// ============================================================
// 10. DAY TIMER ENGINE
// ============================================================
const DAY_PLANTING_SECONDS = 120; // 2 minutes
let dayTimerInterval = null;

function startDayTimer() {
  clearInterval(dayTimerInterval);
  if (state.dayTimeLeft <= 0) { renderTimer(); return; }
  dayTimerInterval = setInterval(() => {
    state.dayTimeLeft = Math.max(0, state.dayTimeLeft - 1);
    saveGame();
    renderTimer();
    if (state.dayTimeLeft === 0) {
      clearInterval(dayTimerInterval);
      addLog('⏰ 今日種植時間已到！無法再種植作物。', 'warn');
      renderLog();
      renderShopIfActive();
    }
  }, 1000);
}

function renderShopIfActive() {
  if (state.activeTab === 'shop') renderShop();
}

function renderTimer() {
  const el = document.getElementById('day-timer');
  if (!el) return;
  const t   = state.dayTimeLeft;
  const min = Math.floor(t / 60);
  const sec = String(t % 60).padStart(2, '0');

  if (t <= 0) {
    el.textContent = '⏰ 時間到';
    el.className   = 'day-timer timer-done';
  } else if (t <= 20) {
    el.textContent = `⏱️ ${min}:${sec}`;
    el.className   = 'day-timer timer-danger';
  } else if (t <= 60) {
    el.textContent = `⏱️ ${min}:${sec}`;
    el.className   = 'day-timer timer-warn';
  } else {
    el.textContent = `⏱️ ${min}:${sec}`;
    el.className   = 'day-timer timer-ok';
  }
}

// ============================================================
// 11. LEVEL ENGINE  (was 10)
// ============================================================
let pendingLevelUps = [];
let isAnimating = false;

function addXP(amount, source) {
  // All XP% boosts stacked
  const xpPct = getPetBuffTotal('legendary_unicorn', 'xp_pct')
              + getPetBuffTotal('legendary_moonrabbit', 'xp_pct')
              + getPetBuffTotal('mythic_cosmos', 'xp_pct');
  if (xpPct > 0) amount = Math.round(amount * (1 + xpPct));
  // Harvest XP % and flat bonuses
  if (source === 'harvest') {
    const harvestPct = getPetBuffTotal('harvest_xp', 'pct');
    if (harvestPct > 0) amount = Math.round(amount * (1 + harvestPct));
    amount += getPetBuffTotal('harvest_xp_flat', 'amount');
  }
  // Plant XP flat bonus
  if (source === 'plant') {
    amount += getPetBuffTotal('plant_xp', 'amount');
  }
  state.player.xp += amount;
  checkLevelUp();
}

function checkLevelUp() {
  let changed = true;
  while (changed) {
    changed = false;
    const nextData = getNextLevelData(state.player.level);
    if (nextData && state.player.xp >= nextData.xp) {
      state.player.level = nextData.level;
      state.player.title = nextData.title;
      const unlocks = nextData.unlocks || [];
      pendingLevelUps.push({ level: nextData.level, title: nextData.title, unlocks });
      changed = true;
    }
  }
}

function xpProgress() {
  const cur  = LEVELS.find(l => l.level === state.player.level);
  const next = getNextLevelData(state.player.level);
  if (!next) return 1;
  const base = cur ? cur.xp : 0;
  const span = next.xp - base;
  return Math.min((state.player.xp - base) / span, 1);
}

// ============================================================
// 11. ACHIEVEMENT ENGINE
// ============================================================
function checkAchievements() {
  let any = false;
  for (const [id, def] of Object.entries(ACHIEVEMENTS)) {
    if (!state.achievements[id] && def.check(state)) {
      state.achievements[id] = true;
      addXP(def.xp, 'achievement');
      addLog(`🏆 成就解鎖：${def.name}`, 'good');
      any = true;
    }
  }
  return any;
}

// ============================================================
// 12. QUEST ENGINE
// ============================================================
function updateQuestProgress(type, amount = 1) {
  const q = state.dailyQuests.find(q => q.type === type && !q.done);
  if (!q) return;
  q.progress = Math.min(q.progress + amount, q.target);
  if (q.progress >= q.target) {
    q.done = true;
    const r = q.reward;
    if (r.coins) { state.coins += r.coins; addLog(`✅ 任務完成：${q.desc} → +${r.coins}💰`, 'good'); }
    if (r.xp)    { addXP(r.xp, 'quest'); addLog(`✅ 任務完成：${q.desc} → +${r.xp} XP`, 'good'); }
  }
}

function checkWaterAllQuest() {
  const planted = state.grid.filter(t => ['planted','growing'].includes(t.state));
  if (planted.length === 0) return;
  if (planted.every(t => t.watered)) {
    updateQuestProgress('water_all', 1);
  }
}

// ============================================================
// 13. INVENTORY ENGINE
// ============================================================
function addToInventory(cropId, quality = 'normal') {
  const existing = state.inventory.find(i => i.cropId === cropId && i.quality === quality);
  const crop = CROPS[cropId];
  const sellPrice = quality === 'excellent' ? crop.sellPrice * 2
                  : quality === 'good'      ? Math.round(crop.sellPrice * 1.5)
                  : crop.sellPrice;
  if (existing) {
    existing.quantity++;
    existing.sellPrice = sellPrice; // update in case price changed
  } else {
    state.inventory.push({
      id: `${cropId}_${quality}_${Date.now()}`,
      cropId, quality,
      name:  crop.name,
      emoji: crop.emoji,
      quantity: 1,
      sellPrice,
    });
  }
}

function sellInventoryItem(cropId, quality, qty = 1) {
  const item = state.inventory.find(i => i.cropId === cropId && i.quality === quality);
  if (!item) return;
  const sellQty = Math.min(qty, item.quantity);
  const earned  = Math.round(item.sellPrice * sellQty * getSellMultiplier());
  state.coins += earned;
  state.stats.totalCoinsEarned += earned;
  state.questProgress.earn += earned;
  updateQuestProgress('earn', earned);
  item.quantity -= sellQty;
  if (item.quantity <= 0) {
    state.inventory = state.inventory.filter(i => !(i.cropId === cropId && i.quality === quality));
  }
  addLog(`💰 出售 ${CROPS[cropId].emoji} ${CROPS[cropId].name} ×${sellQty}，獲得 ${earned}💰`, 'good');
  checkAchievements();
  saveGame();
  renderAll();
}

function sellAllInventory() {
  if (state.inventory.length === 0) return;
  let totalEarned = 0;
  const sellMult = getSellMultiplier();
  state.inventory.forEach(item => {
    const earned = Math.round(item.sellPrice * item.quantity * sellMult);
    totalEarned += earned;
    state.stats.totalCoinsEarned += earned;
    state.questProgress.earn += earned;
  });
  state.coins += totalEarned;
  updateQuestProgress('earn', totalEarned);
  state.inventory = [];
  addLog(`💰 全部出售！共獲得 ${totalEarned}💰`, 'good');
  checkAchievements();
  saveGame();
  renderAll();
}

// ============================================================
// 14. CROP / FARM ENGINE
// ============================================================
function plantSeed(idx) {
  const tile = state.grid[idx];
  if (state.dayTimeLeft <= 0) { addLog('⏰ 今日種植時間已到，無法繼續種植！'); return; }
  if (tile.state !== 'empty') { addLog('⚠️ 這塊土地已有作物！'); return; }
  if (!state.selectedSeed)    { addLog('⚠️ 請先選擇種子！'); return; }
  const crop    = CROPS[state.selectedSeed];
  const inStash = (state.seedStash[state.selectedSeed] || 0) > 0;

  // Apply pet seed-discount buff (all pets stacked)
  let actualCost = crop.seedCost;
  const totalDiscount = getPetBuffTotal('plant_discount', 'pct')
                      + getPetBuffTotal('legendary_moonrabbit', 'plant_pct')
                      + getPetBuffTotal('mythic_worldtree', 'plant_pct');
  if (!inStash && totalDiscount > 0) {
    actualCost = Math.max(1, Math.floor(actualCost * (1 - totalDiscount)));
  }

  if (!inStash && state.coins < actualCost) {
    addLog(`⚠️ 金幣不足（需要 ${actualCost}💰）`); return;
  }

  if (inStash) {
    state.seedStash[state.selectedSeed]--;
    if (state.seedStash[state.selectedSeed] <= 0) delete state.seedStash[state.selectedSeed];
    addLog(`🌱 使用囤積種子種下 ${crop.emoji} ${crop.name}`);
  } else {
    state.coins -= actualCost;
    const discountNote = actualCost < crop.seedCost ? ` 🐝折扣` : '';
    addLog(`🌱 種下 ${crop.emoji} ${crop.name}（-${actualCost}💰${discountNote}）`);
  }

  tile.state     = 'planted';
  tile.crop      = state.selectedSeed;
  tile.growthDay = 0;
  tile.watered   = false;
  tile.wiltedDays = 0;
  tile.isReady   = false;
  tile.hp        = 100;

  state.stats.totalPlanted++;
  updateQuestProgress('plant', 1);
  addXP(XP_FOR.plant, 'plant');
  checkAchievements();
  saveGame();
  renderAll();
}

function waterTile(idx) {
  const tile = state.grid[idx];
  if (!['planted','growing','wilted'].includes(tile.state)) { addLog('⚠️ 只能對已種植的作物澆水！'); return; }
  if (tile.watered) { addLog('⚠️ 今天已澆過水了！'); return; }

  tile.watered = true;
  if (tile.state === 'wilted') {
    tile.state      = tile.growthDay > 0 ? 'growing' : 'planted';
    tile.wiltedDays = 0;
    addLog(`💧 救活了枯萎的 ${CROPS[tile.crop].emoji} ${CROPS[tile.crop].name}！`);
  } else {
    addLog(`💧 澆水：${CROPS[tile.crop].emoji} ${CROPS[tile.crop].name}`);
  }

  addXP(XP_FOR.water, 'water');
  const waterXpBonus = getPetBuffTotal('water_xp', 'amount');
  if (waterXpBonus > 0) addXP(waterXpBonus, 'water_bonus');
  updateQuestProgress('water', 1);
  checkWaterAllQuest();
  saveGame();
  renderAll();
}

function harvestTile(idx, silent = false) {
  const tile = state.grid[idx];
  if (tile.state !== 'ready') { if (!silent) addLog('⚠️ 作物尚未成熟！'); return; }

  const crop = CROPS[tile.crop];

  // Determine quality
  let quality = 'normal';
  if (crop.alwaysExcellent || state.weatherEffect === 'coin_x2' ||
      (hasPetBuff('legendary_dragon') && Math.random() < 0.40)) {
    quality = 'excellent';
  } else {
    let goodChance = (state.season === 'autumn') ? 0.3 : 0;
    goodChance = Math.min(1, goodChance
      + getPetBuffTotal('quality_chance', 'bonus')
      + getPetBuffTotal('mythic_worldtree', 'quality_bonus'));
    if (hasPetBuff('rain_quality') && state.weather === 'rain') goodChance = 1;
    if (Math.random() < goodChance) quality = 'good';
  }

  addToInventory(tile.crop, quality);

  // Pet: double harvest — stack chances, cap at 95%
  const doubleChance = Math.min(0.95, getPetBuffTotal('double_harvest', 'chance'));
  if (doubleChance > 0 && Math.random() < doubleChance) {
    addToInventory(tile.crop, quality);
    addLog(`🦅 雙倍收穫！獲得額外 ${crop.emoji}！`, 'good');
  }
  // Pet: harvest coins (all sources stacked)
  const harvestCoins = getPetBuffTotal('harvest_coins', 'amount')
                     + getPetBuffTotal('legendary_lion', 'harvest_coins')
                     + getPetBuffTotal('mythic_worldtree', 'harvest_coins');
  if (harvestCoins > 0) state.coins += harvestCoins;
  // Seasonal bonus coins
  const seasonBonus =
    (state.season === 'spring'  ? getPetBuffTotal('spring_coins',  'amount') : 0) +
    (state.season === 'summer'  ? getPetBuffTotal('summer_coins',  'amount') : 0) +
    (state.season === 'autumn'  ? getPetBuffTotal('autumn_coins',  'amount') : 0) +
    (state.season === 'winter'  ? getPetBuffTotal('winter_coins',  'amount') : 0);
  if (seasonBonus > 0) state.coins += seasonBonus;

  if (state.weather === 'rain') state.stats.rainHarvest++;

  state.stats.totalHarvested++;
  state.stats.todayHarvest++;
  updateQuestProgress('harvest', 1);
  addXP(XP_FOR.harvest, 'harvest');

  const qualLabel = quality === 'excellent' ? '✨ 高級' : quality === 'good' ? '⭐ 優良' : '';
  addLog(`🌾 收穫 ${crop.emoji} ${crop.name} ${qualLabel}→ 進倉庫`, 'good');

  state.grid[idx] = emptyTile();
  checkAchievements();
  if (!silent) { saveGame(); renderAll(); }
}

// ============================================================
// 15. DAY PROGRESSION
// ============================================================
function advanceDay() {
  showModal({
    emoji: '🌅',
    title: '結束今天？',
    body:  `確定要結束第 ${state.day} 天嗎？<br>未澆水的作物會枯萎或失去進度。`,
    buttons: [
      { text:'結束今天', cls:'mbtn-primary', cb: doAdvanceDay },
      { text:'取消',    cls:'mbtn-cancel',  cb: hideModal },
    ],
  });
}

function doAdvanceDay() {
  // Reset today stats + timer
  state.stats.todayHarvest   = 0;
  state.questProgress        = { earn: 0 };
  state.dayTimeLeft          = DAY_PLANTING_SECONDS;

  // Advance day
  state.day++;
  state.season  = getSeasonByDay(state.day);

  // Generate new daily pets & reset feeding progress
  state.pets.dailyPets = generateDailyPets();
  state.pets.feeding   = {};
  state.pets.newPets   = true;

  // All pets: daily-coins buff (stacked)
  let totalDailyCoins = getPetBuffTotal('daily_coins', 'amount')
                      + getPetBuffTotal('legendary_dragon', 'daily_coins')
                      + getPetBuffTotal('legendary_storm', 'daily_coins')
                      + getPetBuffTotal('mythic_cosmos', 'daily_coins');
  // rain_coins: bonus when today's weather is rain (rolled just after this)
  const newWeather = rollWeather();
  state.weather       = newWeather.type;
  state.weatherEffect = newWeather.effect;
  if (state.weather === 'rain') {
    totalDailyCoins += getPetBuffTotal('rain_coins', 'amount');
  }
  if (totalDailyCoins > 0) {
    state.coins += totalDailyCoins;
    addLog(`🐾 寵物們帶來 ${totalDailyCoins}💰！`, 'good');
  }

  const seasonInfo = SEASON_INFO[state.season];

  // Process weather pre-effects
  if (state.weatherEffect === 'auto_water') {
    state.grid.forEach(t => {
      if (['planted','growing'].includes(t.state)) t.watered = true;
    });
    addLog(`🌧️ 下雨了！所有作物自動澆水`, 'good');
  }
  if (state.weatherEffect === 'damage_30') {
    addLog(`⛈️ 暴風雨！部分作物受損`, 'warn');
  }
  if (state.weatherEffect === 'slow_50') {
    addLog(`🌫️ 濃霧！今天生長速度減半`, 'warn');
  }
  if (state.weatherEffect === 'coin_x2') {
    addLog(`🌈 出現彩虹！今天收穫品質提升為高級`, 'good');
  }

  // Track summary
  let grew = 0, readyNow = 0, wilted = 0, died = 0;

  state.grid = state.grid.map(tile => {
    if (tile.state === 'empty' || tile.state === 'ready') return tile;

    const crop = tile.crop ? CROPS[tile.crop] : null;

    // Winter: outdoor crops might die
    if (state.season === 'winter' && crop && Math.random() < seasonInfo.deathChance) {
      died++;
      addLog(`❄️ ${crop.emoji} ${crop.name} 在寒冬中枯死了！`, 'bad');
      return emptyTile();
    }

    // Storm damage
    if (state.weatherEffect === 'damage_30') {
      tile.hp = Math.max(0, (tile.hp || 100) - 30);
      if (tile.hp <= 0) {
        died++;
        addLog(`⛈️ ${crop.emoji} ${crop.name} 被暴風雨摧毀了！`, 'bad');
        return emptyTile();
      }
    }

    if (tile.state === 'planted' || tile.state === 'growing') {
      if (tile.watered) {
        // Compute growth increment
        let inc = seasonInfo.growthRate;
        if (state.weatherEffect === 'slow_50') inc *= 0.5;
        // Pet: grow speed bonus (all pets stacked)
        inc += getPetBuffTotal('grow_speed', 'bonus')
             + getPetBuffTotal('legendary_storm', 'grow_bonus')
             + getPetBuffTotal('mythic_cosmos', 'grow_bonus');
        tile.growthDay += inc;
        tile.watered    = false;
        tile.wiltedDays = 0;

        if (tile.growthDay >= crop.growDays) {
          tile.state   = 'ready';
          tile.isReady = true;
          readyNow++;
        } else {
          tile.state = 'growing';
          grew++;
        }
      } else {
        tile.wiltedDays = (tile.wiltedDays || 0) + 1;
        tile.growthDay  = Math.max(0, tile.growthDay - 0.5);
        const wiltLimitA = hasPetBuff('wilt_resist') ? 3 : 2;
        if (tile.wiltedDays >= wiltLimitA) {
          died++;
          addLog(`💀 ${crop.emoji} ${crop.name} 因缺水枯死了！`, 'bad');
          return emptyTile();
        }
        tile.state = 'wilted';
        wilted++;
      }
    } else if (tile.state === 'wilted') {
      if (tile.watered) {
        tile.growthDay++;
        tile.watered    = false;
        tile.wiltedDays = 0;
        tile.state      = tile.growthDay > 0 ? 'growing' : 'planted';
        grew++;
      } else {
        tile.wiltedDays = (tile.wiltedDays || 0) + 1;
        const wiltLimitB = hasPetBuff('wilt_resist') ? 3 : 2;
        if (tile.wiltedDays >= wiltLimitB) {
          died++;
          addLog(`💀 ${crop.emoji} ${crop.name} 因缺水枯死了！`, 'bad');
          return emptyTile();
        }
      }
    }
    return tile;
  });

  // Generate new daily quests
  state.dailyQuests = generateQuests(state.day);

  saveGame();
  renderAll();
  startDayTimer();

  // Check for NPC events then show summary
  checkNPCEvent(() => showDaySummary(grew, readyNow, wilted, died));
}

// ============================================================
// 16. NPC ENGINE
// ============================================================
function checkNPCEvent(callback) {
  for (const [id, npc] of Object.entries(NPCS)) {
    if (npc.triggerFn(state)) {
      showNPCEvent(npc, callback);
      return;
    }
  }
  callback();
}

function showNPCEvent(npc, callback) {
  const offer = npc.offerFn(state);
  let bodyHtml = `<p style="margin-bottom:10px">"${npc.greeting}"</p>`;

  if (offer.type === 'coins') {
    bodyHtml += `<div class="srow">🎁 贈送 <span class="sgood">${offer.desc}</span></div>`;
    showModal({
      emoji: npc.emoji,
      title: npc.name + ' 到訪！',
      body: bodyHtml,
      buttons: [
        { text:'接受',   cls:'mbtn-gold',   cb: () => { state.coins += offer.amount; addLog(`${npc.emoji} ${npc.name} 贈送 ${offer.amount}💰！`, 'good'); saveGame(); renderAll(); callback(); } },
        { text:'拒絕',   cls:'mbtn-cancel', cb: callback },
      ],
    });
  } else if (offer.type === 'xp') {
    bodyHtml += `<div class="srow">🎁 贈送 <span class="sgood">${offer.desc}</span></div>`;
    showModal({
      emoji: npc.emoji,
      title: npc.name + ' 到訪！',
      body: bodyHtml,
      buttons: [
        { text:'接受',   cls:'mbtn-gold',   cb: () => { addXP(offer.amount, 'npc'); addLog(`${npc.emoji} ${npc.name} 贈送 ${offer.amount} XP！`, 'good'); saveGame(); renderAll(); callback(); } },
        { text:'拒絕',   cls:'mbtn-cancel', cb: callback },
      ],
    });
  } else if (offer.cropId) {
    // Seed offer
    const crop = CROPS[offer.cropId];
    bodyHtml += `<div class="srow">🌱 <span class="sgood">${offer.desc}</span></div>`;
    bodyHtml += `<div class="srow" style="font-size:.8rem;color:#888">折扣價：${offer.discountCost * offer.qty}💰（省 ${(offer.originalCost - offer.discountCost) * offer.qty}💰）</div>`;
    const totalCost = offer.discountCost * offer.qty;
    const canAfford = state.coins >= totalCost;
    showModal({
      emoji: npc.emoji,
      title: npc.name + ' 到訪！',
      body: bodyHtml,
      buttons: [
        { text: canAfford ? `購買 ${totalCost}💰` : `金幣不足`, cls: canAfford ? 'mbtn-gold' : 'mbtn-cancel',
          cb: canAfford ? () => {
            state.coins -= totalCost;
            state.seedStash[offer.cropId] = (state.seedStash[offer.cropId] || 0) + offer.qty;
            addLog(`${npc.emoji} 購入 ${crop.emoji} ${crop.name} 種子 ×${offer.qty}（已存入種子庫）`, 'good');
            saveGame(); renderAll(); callback();
          } : callback,
        },
        { text:'拒絕', cls:'mbtn-cancel', cb: callback },
      ],
    });
  } else {
    callback();
  }
}

function showDaySummary(grew, readyNow, wilted, died) {
  const season = SEASON_INFO[state.season];
  const weather = WEATHER_POOL.find(w => w.type === state.weather);

  let body = `<div class="srow">📅 天氣：${weather.icon} ${weather.name}　季節：${season.icon} ${season.name}</div>`;
  body += '<hr style="border:none;border-top:1px solid #e0d0c0;margin:8px 0">';
  if (grew)     body += `<div class="srow">🌿 <span class="sgood">${grew} 株</span>繼續生長中</div>`;
  if (readyNow) body += `<div class="srow">🎉 <span class="sgood">${readyNow} 株</span>已成熟可收穫！</div>`;
  if (wilted)   body += `<div class="srow">🥀 <span class="swarn">${wilted} 株</span>枯萎（記得澆水！）</div>`;
  if (died)     body += `<div class="srow">💀 <span class="sbad">${died} 株</span>已枯死</div>`;
  if (!grew && !readyNow && !wilted && !died) body += '<div class="srow">農場一片空靜...</div>';
  body += `<div class="srow">🐾 今天有 3 隻新寵物出現，前往<strong>寵物</strong>頁查看！</div>`;

  // Pending level ups (process all at once)
  if (pendingLevelUps.length > 0) {
    body += `<hr style="border:none;border-top:1px solid #e0d0c0;margin:8px 0">`;
    while (pendingLevelUps.length > 0) {
      const lu = pendingLevelUps.shift();
      body += `<div class="srow" style="font-weight:700;color:#e65c00">🎉 升級！Lv.${lu.level} ${lu.title}</div>`;
      if (lu.unlocks && lu.unlocks.length > 0) {
        const names = lu.unlocks.map(id => CROPS[id].emoji + CROPS[id].name).join('、');
        body += `<div class="srow"><span class="sgood">✨ 解鎖：${names}</span></div>`;
      }
    }
  }

  showModal({
    emoji: '☀️',
    title: `第 ${state.day} 天開始！`,
    body,
    buttons: [{ text:'開始新的一天', cls:'mbtn-primary', cb: hideModal }],
  });
}

// ============================================================
// 17. RENDERING
// ============================================================
function renderAll() {
  renderHUD();
  renderGrid();
  renderSidebar();
  renderLog();
  renderStats();
  renderTimer();
  document.body.dataset.tool = state.activeTool;
}

function renderHUD() {
  document.getElementById('day-display').textContent    = `第 ${state.day} 天`;
  document.getElementById('coins-display').textContent  = `💰 ${state.coins}`;
  document.getElementById('level-display').textContent  = `⭐ Lv.${state.player.level} ${state.player.title}`;

  const pct = (xpProgress() * 100).toFixed(1);
  document.getElementById('xp-fill').style.width = pct + '%';

  const next = getNextLevelData(state.player.level);
  const xpText = next
    ? `${state.player.xp}/${next.xp} XP`
    : `${state.player.xp} XP (MAX)`;
  document.getElementById('xp-text').textContent = xpText;

  const season  = SEASON_INFO[state.season];
  const weather = WEATHER_POOL.find(w => w.type === state.weather) || WEATHER_POOL[0];
  document.getElementById('season-display').textContent  = `${season.icon} ${season.name}`;
  document.getElementById('weather-display').textContent = `${weather.icon} ${weather.name}`;

  // Pet badge in HUD: show all owned pets
  const petBadgeEl = document.getElementById('pet-badge');
  if (petBadgeEl) {
    const myPets = (state.pets && state.pets.myPets) || [];
    petBadgeEl.textContent = myPets.map(p => PETS[p.petId]?.emoji || '').join('');
    petBadgeEl.title = myPets.map(p => PETS[p.petId] ? `${PETS[p.petId].name}：${PETS[p.petId].buffDesc}` : '').join('\n');
  }
  // New-pet red dot on FAB
  const fabDot = document.getElementById('pet-fab-dot');
  if (fabDot) fabDot.classList.toggle('hidden', !(state.pets && state.pets.newPets));

  // Tool buttons
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.toggle('active', b.dataset.tool === state.activeTool));

  const info = document.getElementById('selected-info');
  if (state.activeTool === 'seed' && state.selectedSeed) {
    const c = CROPS[state.selectedSeed];
    info.textContent = `已選：${c.emoji} ${c.name}（-${c.seedCost}💰）`;
  } else if (state.activeTool === 'water') {
    info.textContent = '點擊已種植的格子澆水';
  } else if (state.activeTool === 'harvest') {
    info.textContent = '點擊成熟的作物收穫';
  } else {
    info.textContent = '請選擇種子';
  }
}

function tileEmoji(tile) {
  if (tile.state === 'empty')   return '🟫';
  if (tile.state === 'wilted')  return '🥀';
  if (tile.state === 'ready')   return CROPS[tile.crop].emoji;
  const crop = CROPS[tile.crop];
  const pct  = tile.growthDay / crop.growDays;
  if (pct <= 0)   return '🌱';
  if (pct < 0.5)  return '🌿';
  return crop.emoji;
}

function renderGrid() {
  const grid = document.getElementById('farm-grid');
  grid.innerHTML = '';
  state.grid.forEach((tile, idx) => {
    const el = document.createElement('div');
    el.className = `tile ${tile.state}${tile.watered ? ' watered' : ''}`;

    const emo = document.createElement('span');
    emo.textContent = tileEmoji(tile);
    el.appendChild(emo);

    if ((tile.state === 'growing' || tile.state === 'planted') && tile.crop) {
      const crop = CROPS[tile.crop];
      const dots = document.createElement('div');
      dots.className = 'progress-dots';
      const total = crop.growDays;
      const filled = Math.floor(tile.growthDay);
      for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = `dot ${i < filled ? 'filled' : 'empty'}`;
        dots.appendChild(d);
      }
      el.appendChild(dots);
    }

    el.addEventListener('click', () => onTileClick(idx));
    grid.appendChild(el);
  });
}

function renderSidebar() {
  // Tab visibility
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === state.activeTab));
  document.getElementById('panel-shop').classList.toggle('hidden', state.activeTab !== 'shop');
  document.getElementById('panel-inventory').classList.toggle('hidden', state.activeTab !== 'inventory');
  document.getElementById('panel-quests').classList.toggle('hidden', state.activeTab !== 'quests');
  if (state.activeTab === 'shop')      renderShop();
  if (state.activeTab === 'inventory') renderInventory();
  if (state.activeTab === 'quests')    renderQuests();
}

function renderShop() {
  const list = document.getElementById('seed-list');
  list.innerHTML = '';

  const rarityOrder = ['common','rare','premium','legendary','mythic'];
  const groups = {};
  rarityOrder.forEach(r => groups[r] = []);
  Object.values(CROPS).forEach(c => { if (groups[c.rarity]) groups[c.rarity].push(c); });

  rarityOrder.forEach(rarity => {
    const crops = groups[rarity];
    if (!crops.length) return;

    // Section header
    const header = document.createElement('div');
    header.className = 'shop-rarity-header';
    header.style.color = CROP_RARITY_COLOR[rarity];
    header.textContent = `── ${CROP_RARITY_LABEL[rarity]} ──`;
    list.appendChild(header);

    crops.forEach(crop => {
      const locked    = state.player.level < crop.unlockLevel;
      const canAfford = state.coins >= crop.seedCost;
      const selected  = state.selectedSeed === crop.id && state.activeTool === 'seed';
      const inSeason  = !crop.seasons || crop.seasons.includes(state.season);

      const btn = document.createElement('button');
      btn.className = `seed-btn${selected ? ' selected' : ''}${locked ? ' locked' : (!canAfford ? ' cant-afford' : '')}`;

      const seasonMark = (!crop.seasons || inSeason) ? '' : `<span style="color:#ff8a65;font-size:.6rem">⚠️季外</span>`;
      const stashQty   = state.seedStash[crop.id] || 0;
      const stashBadge = stashQty > 0 ? `<span style="color:#ffd700;font-size:.62rem">📦×${stashQty}</span>` : '';
      const excellentBadge = crop.alwaysExcellent ? `<span style="color:${CROP_RARITY_COLOR[rarity]};font-size:.58rem">✨必高級</span>` : '';
      btn.innerHTML = `
        <span class="seed-emoji">${crop.emoji}</span>
        <span>
          <div class="seed-name">${crop.name} ${seasonMark} ${stashBadge} ${excellentBadge}</div>
          <div class="seed-meta">${crop.growDays}天</div>
        </span>
        <span class="seed-price">
          ${locked
            ? `<span class="seed-lock">🔒 Lv.${crop.unlockLevel}</span>`
            : `<span class="seed-cost">-${crop.seedCost}💰</span><span class="seed-sell">+${crop.sellPrice}💰</span>`
          }
        </span>
      `;
      if (!locked) btn.addEventListener('click', () => selectSeed(crop.id));
      list.appendChild(btn);
    });
  });
}

function renderInventory() {
  const grid   = document.getElementById('inv-grid');
  const empty  = document.getElementById('inv-empty');
  grid.innerHTML = '';

  if (state.inventory.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  state.inventory.forEach(item => {
    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    slot.title = `${item.name}（${item.quality === 'excellent' ? '高級' : item.quality === 'good' ? '優良' : '普通'}）\n出售價：${item.sellPrice}💰 × ${item.quantity}`;

    const dot = document.createElement('div');
    dot.className = `quality-dot ${item.quality}`;
    slot.appendChild(dot);

    const emo = document.createElement('span');
    emo.textContent = item.emoji;
    slot.appendChild(emo);

    const qty = document.createElement('span');
    qty.className = 'qty';
    qty.textContent = item.quantity;
    slot.appendChild(qty);

    slot.addEventListener('click', () => showSellModal(item));
    grid.appendChild(slot);
  });
}

function showSellModal(item) {
  const qualLabel = item.quality === 'excellent' ? '✨ 高級' : item.quality === 'good' ? '⭐ 優良' : '普通';
  showModal({
    emoji: item.emoji,
    title: item.name,
    body:  `品質：${qualLabel}<br>數量：${item.quantity} 個<br>售價：${item.sellPrice}💰 / 個<br>預計收入：<strong>${item.sellPrice * item.quantity}💰</strong>`,
    buttons: [
      { text:`出售全部 (${item.sellPrice * item.quantity}💰)`, cls:'mbtn-ok',     cb: () => sellInventoryItem(item.cropId, item.quality, item.quantity) },
      { text:'出售 1 個',                                    cls:'mbtn-primary', cb: () => sellInventoryItem(item.cropId, item.quality, 1) },
      { text:'保留',                                         cls:'mbtn-cancel',  cb: hideModal },
    ],
  });
}

// ============================================================
// REDEEM CODES
// ============================================================
const REDEEM_CODES = {
  'ray0030517': { desc:'獲得 200 💰', apply(){ state.coins += 200; addLog('🎁 兌換碼：獲得 200💰！', 'good'); } },
  'BC_Moon':    { desc:'獲得隨機普通寵物 + 稀有寵物', apply(){
    const commons     = Object.values(PETS).filter(p => p.rarity === 'common');
    const rares       = Object.values(PETS).filter(p => p.rarity === 'rare');
    const commonPet   = commons[Math.floor(Math.random() * commons.length)];
    const rarePet     = rares [Math.floor(Math.random() * rares.length)];
    [commonPet, rarePet].forEach(pet => {
      if (state.pets.myPets.length < 5 && !state.pets.myPets.some(p => p.petId === pet.id)) {
        state.pets.myPets.push({ petId: pet.id });
        if (!state.pets.activePetId) state.pets.activePetId = pet.id;
        addLog(`🐾 兌換碼：獲得 ${pet.emoji} ${pet.name}！`, 'good');
      } else {
        addLog(`🐾 兌換碼：${pet.emoji} ${pet.name} 已加入（若滿員請先放生）`, 'warn');
      }
    });
  }},
  'Bad_Bacon':  { desc:'獲得高級植物 ×15', apply(){
    const excellentCrops = Object.values(CROPS).filter(c => c.alwaysExcellent);
    const crop = excellentCrops[Math.floor(Math.random() * excellentCrops.length)];
    for (let i = 0; i < 15; i++) addToInventory(crop.id, 'excellent');
    addLog(`🎁 兌換碼：獲得 ${crop.emoji} ${crop.name} 高級 ×15！`, 'good');
  }},
  'goldgragon': { desc:'獲得金龍 🐉', apply(){
    const pet = PETS['dragon'];
    if (state.pets.myPets.some(p => p.petId === 'dragon')) {
      addLog('🐉 你已經擁有金龍了！', 'warn'); return;
    }
    if (state.pets.myPets.length >= 5) {
      addLog('🐉 寵物已滿 5 隻，請先放生一隻！', 'warn'); return;
    }
    state.pets.myPets.push({ petId: 'dragon' });
    if (!state.pets.activePetId) state.pets.activePetId = 'dragon';
    addLog(`🐉 兌換碼：獲得金龍！`, 'good');
  }},
  'rayisgood':  { desc:'獲得隨機普通植物 ×15', apply(){
    const commonCrops = Object.values(CROPS).filter(c => c.rarity === 'common');
    for (let i = 0; i < 15; i++) {
      const crop = commonCrops[Math.floor(Math.random() * commonCrops.length)];
      addToInventory(crop.id, 'normal');
    }
    addLog('🎁 兌換碼：獲得 15 個隨機普通植物！', 'good');
  }},
  '676767':     { desc:'獲得 6767 💰', apply(){
    state.coins += 6767;
    addLog('🎁 兌換碼：獲得 6767💰！', 'good');
  }},
  'BC_Oliveira':{ desc:'獲得隨機傳奇植物 ×3', apply(){
    const legendarycrops = Object.values(CROPS).filter(c => c.rarity === 'legendary');
    for (let i = 0; i < 3; i++) {
      const crop = legendarycrops[Math.floor(Math.random() * legendarycrops.length)];
      addToInventory(crop.id, 'excellent');
    }
    addLog('🎁 兌換碼：獲得 3 個隨機傳奇植物！', 'good');
  }},
  'stats003':   { desc:'獲得神話植物 ×1', apply(){
    const mythicCrops = Object.values(CROPS).filter(c => c.rarity === 'mythic');
    const crop = mythicCrops[Math.floor(Math.random() * mythicCrops.length)];
    addToInventory(crop.id, 'excellent');
    addLog(`🎁 兌換碼：獲得 ${crop.emoji} ${crop.name} ×1！`, 'good');
  }},
};

function redeemCode(raw) {
  const code = raw.trim();
  if (!code) return;
  if (!state.usedCodes) state.usedCodes = [];
  if (state.usedCodes.includes(code)) {
    showModal({ emoji:'⚠️', title:'兌換失敗', body:'此兌換碼已使用過了！', buttons:[{ text:'確定', cls:'mbtn-cancel', cb:hideModal }] });
    return;
  }
  const entry = REDEEM_CODES[code];
  if (!entry) {
    showModal({ emoji:'❌', title:'無效兌換碼', body:'兌換碼不正確，請確認後再試。', buttons:[{ text:'確定', cls:'mbtn-cancel', cb:hideModal }] });
    return;
  }
  state.usedCodes.push(code);
  entry.apply();
  saveGame();
  renderAll();
  showModal({ emoji:'🎁', title:'兌換成功！', body:`<strong>${code}</strong><br>${entry.desc}`, buttons:[{ text:'太好了！', cls:'mbtn-ok', cb:hideModal }] });
}

function renderQuests() {
  const list = document.getElementById('quest-list');
  list.innerHTML = '';
  state.dailyQuests.forEach(q => {
    const pct = Math.min((q.progress / q.target) * 100, 100);
    const item = document.createElement('div');
    item.className = `quest-item${q.done ? ' completed' : ''}`;
    const rewardStr = q.reward.coins ? `+${q.reward.coins}💰` : '';
    const rewardXp  = q.reward.xp   ? ` +${q.reward.xp}XP` : '';
    item.innerHTML = `
      <div class="quest-desc"><span class="quest-check">${q.done ? '✅' : '⬜'}</span>${q.desc}</div>
      <div class="quest-bar-wrap">
        <div class="quest-bar"><div class="quest-bar-fill" style="width:${pct}%"></div></div>
        <span class="quest-progress">${q.progress}/${q.target}</span>
      </div>
      <div class="quest-reward">獎勵：${rewardStr}${rewardXp}</div>
    `;
    list.appendChild(item);
  });

  // Achievements
  const achList = document.getElementById('achievement-list');
  achList.innerHTML = '';
  Object.entries(ACHIEVEMENTS).forEach(([id, def]) => {
    const unlocked = !!state.achievements[id];
    const el = document.createElement('div');
    el.className = `ach-item${unlocked ? ' unlocked' : ''}`;
    el.innerHTML = `
      <div>
        <div class="ach-name">${def.name}</div>
        <div class="ach-desc">${def.desc}</div>
      </div>
      <div style="font-size:.7rem;color:${unlocked ? '#ffd700' : 'rgba(255,255,255,.4)'}">${unlocked ? '✓' : '?'}</div>
    `;
    achList.appendChild(el);
  });

  // Redeem codes
  const redeemEl = document.getElementById('redeem-section');
  if (redeemEl) {
    redeemEl.querySelector('.redeem-input').value = '';
  }
}

// ── Pet Panel ───────────────────────────────────────────────────────
const RARITY_LABEL = { common:'普通', rare:'稀有', legendary:'傳奇', mythic:'神話' };
const RARITY_COLOR = { common:'#aaa', rare:'#64b5f6', legendary:'#ffd700', mythic:'#e040fb' };

// ── Pet sheet open / close ────────────────────────────────────────
function openPetSheet() {
  renderPets();
  document.getElementById('pet-sheet-bg').classList.add('show');
  document.getElementById('pet-sheet').classList.add('show');
  state.pets.newPets = false;
  saveGame();
  renderHUD();
}

function closePetSheet() {
  document.getElementById('pet-sheet-bg').classList.remove('show');
  document.getElementById('pet-sheet').classList.remove('show');
}

// ── Feeding helpers ───────────────────────────────────────────────
function feedTarget(rarity) {
  return rarity === 'common' ? 5 : rarity === 'rare' ? 10 : rarity === 'legendary' ? 15 : 30;
}

function renderPets() {
  const body = document.getElementById('pet-sheet-body');
  if (!body) return;

  const myPets = state.pets.myPets || [];
  let html = '';

  // ── My Pets ──
  html += `<div class="pet-section-title">我的寵物 <span class="pet-count-badge">${myPets.length}/5</span> <span style="font-size:.62rem;color:rgba(255,255,255,.45)">所有寵物 buff 同時生效</span></div>`;
  if (myPets.length === 0) {
    html += '<div class="pet-none">還沒有寵物——餵食下方的寵物後即可收養！</div>';
  } else {
    html += '<div class="pet-my-list">';
    myPets.forEach(({ petId }) => {
      const pet = PETS[petId];
      if (!pet) return;
      html += `
        <div class="pet-my-card rarity-border-${pet.rarity} pet-my-active">
          <span class="pet-my-emoji">${pet.emoji}</span>
          <div class="pet-my-info">
            <div class="pet-card-name">${pet.name}
              <span class="pet-rarity-badge rarity-${pet.rarity}">${RARITY_LABEL[pet.rarity]}</span>
            </div>
            <div class="pet-card-buff">✨ ${pet.buffDesc}</div>
          </div>
          <div class="pet-my-btns">
            <span class="pet-active-tag">生效中</span>
            <button class="pet-sm-release-btn" data-petid="${petId}">放生</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }

  // ── Daily Pets ──
  html += `<div class="pet-section-title" style="margin-top:16px">今日出現的寵物 <span style="font-size:.63rem;color:rgba(255,255,255,.4)">每天更新</span></div>`;
  html += '<div class="pet-daily-list">';

  state.pets.dailyPets.forEach(petId => {
    const pet     = PETS[petId];
    if (!pet) return;
    const isOwned = myPets.some(p => p.petId === petId);
    const target  = feedTarget(pet.rarity);
    const fed     = state.pets.feeding[petId] || 0;
    const done    = fed >= target;
    const pct     = Math.min(fed / target * 100, 100).toFixed(0);
    const reqNote = (pet.rarity === 'legendary' || pet.rarity === 'mythic')
      ? `需餵 ${target} 個 ✨高級農作`
      : `需餵 ${target} 個農作物`;

    html += `
      <div class="pet-card rarity-border-${pet.rarity}">
        <div class="pet-card-top">
          <span class="pet-card-emoji">${pet.emoji}</span>
          <div class="pet-card-info">
            <div class="pet-card-name">${pet.name}
              <span class="pet-rarity-badge rarity-${pet.rarity}">${RARITY_LABEL[pet.rarity]}</span>
            </div>
            <div class="pet-card-buff">✨ ${pet.buffDesc}</div>
          </div>
          ${isOwned ? `<span class="pet-adopted-tag">已收養</span>` : ''}
        </div>
        ${!isOwned ? `
          <div class="pet-feed-progress">
            <div class="pet-feed-bar-wrap">
              <div class="pet-feed-bar"><div class="pet-feed-fill" style="width:${pct}%"></div></div>
              <span class="pet-feed-count">${fed}/${target}</span>
            </div>
            <span class="pet-feed-req">${reqNote}</span>
          </div>
          ${done
            ? `<button class="pet-adopt-ready-btn" data-petid="${petId}">🎉 可以收養了！</button>`
            : `<button class="pet-feed-btn" data-petid="${petId}">🌾 餵食</button>`
          }
        ` : ''}
      </div>
    `;
  });

  html += '</div>';
  body.innerHTML = html;

  // Bind events
  body.querySelectorAll('.pet-activate-btn').forEach(btn =>
    btn.addEventListener('click', () => { setActivePet(btn.dataset.petid); renderPets(); })
  );
  body.querySelectorAll('.pet-sm-release-btn').forEach(btn =>
    btn.addEventListener('click', () => releasePetById(btn.dataset.petid))
  );
  body.querySelectorAll('.pet-feed-btn').forEach(btn =>
    btn.addEventListener('click', () => showFeedModal(btn.dataset.petid))
  );
  body.querySelectorAll('.pet-adopt-ready-btn').forEach(btn =>
    btn.addEventListener('click', () => completePetAdoption(btn.dataset.petid))
  );
}

// ── Set active pet ────────────────────────────────────────────────
function setActivePet(petId) {
  state.pets.activePetId = petId;
  const pet = PETS[petId];
  addLog(`🐾 ${pet.emoji} ${pet.name} 出戰！`, 'good');
  saveGame();
  renderAll();
}

// ── Feeding modal ─────────────────────────────────────────────────
function showFeedModal(petId) {
  const pet         = PETS[petId];
  const isLegendary = pet.rarity === 'legendary' || pet.rarity === 'mythic';
  const target      = feedTarget(pet.rarity);
  const fed         = state.pets.feeding[petId] || 0;
  const remaining   = target - fed;

  const available = isLegendary
    ? state.inventory.filter(i => i.quality === 'excellent')
    : state.inventory.filter(i => i.quantity > 0);
  const totalAvail = available.reduce((s, i) => s + i.quantity, 0);
  const canFeed    = Math.min(remaining, totalAvail);

  let body = `
    <div class="srow">${pet.emoji} <strong>${pet.name}</strong>
      <span style="color:${RARITY_COLOR[pet.rarity]};font-size:.75rem;margin-left:5px">${RARITY_LABEL[pet.rarity]}</span>
    </div>
    <div class="srow" style="gap:6px;margin:8px 0 4px">
      <span>進度 ${fed}/${target}</span>
      <div style="flex:1;height:7px;background:rgba(0,0,0,.12);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:${(fed/target*100).toFixed(0)}%;background:#4caf50;border-radius:4px"></div>
      </div>
    </div>
  `;
  if (isLegendary) body += `<div class="srow" style="color:#e65100;font-size:.8rem">⚠️ 傳奇寵物只接受 ✨高級農作</div>`;
  body += `<div class="srow" style="color:#7a5a40">倉庫中可用：${totalAvail} 個</div>`;

  if (totalAvail === 0) {
    showModal({
      emoji: pet.emoji, title: `餵食 ${pet.name}`,
      body: body + `<div class="srow" style="color:#c62828">倉庫沒有${isLegendary ? '高級' : ''}農作物！先去收穫吧。</div>`,
      buttons: [{ text:'關閉', cls:'mbtn-cancel', cb: hideModal }],
    });
    return;
  }

  const btns = [
    { text:`餵 1 個`, cls:'mbtn-primary', cb: () => doFeedPet(petId, 1) },
  ];
  if (canFeed > 1) btns.push({ text:`一次餵足（${canFeed} 個）`, cls:'mbtn-gold', cb: () => doFeedPet(petId, canFeed) });
  btns.push({ text:'取消', cls:'mbtn-cancel', cb: hideModal });

  showModal({ emoji: pet.emoji, title: `餵食 ${pet.name}`, body, buttons: btns });
}

function doFeedPet(petId, qty) {
  const pet         = PETS[petId];
  const isLegendary = pet.rarity === 'legendary';
  const target      = feedTarget(pet.rarity);
  const fed         = state.pets.feeding[petId] || 0;
  const remaining   = target - fed;
  const toUse       = Math.min(qty, remaining);

  // Consume from inventory (legendary = excellent only)
  let left = toUse;
  const pool = isLegendary
    ? state.inventory.filter(i => i.quality === 'excellent')
    : [...state.inventory];
  for (const item of pool) {
    if (left <= 0) break;
    const use = Math.min(item.quantity, left);
    item.quantity -= use;
    left -= use;
  }
  state.inventory = state.inventory.filter(i => i.quantity > 0);

  const consumed = toUse - left;
  if (consumed === 0) {
    addLog(`⚠️ 倉庫中沒有${isLegendary ? '高級' : ''}農作物！`);
    saveGame(); renderAll(); renderPets(); return;
  }

  state.pets.feeding[petId] = fed + consumed;
  const newFed = state.pets.feeding[petId];
  addLog(`🌾 餵食 ${pet.emoji}${pet.name} ${consumed} 個（${newFed}/${target}）`, 'good');
  if (newFed >= target) addLog(`✨ ${pet.emoji}${pet.name} 已滿足，可以收養！`, 'good');

  saveGame(); renderAll(); renderPets();
}

// ── Complete adoption (called when feeding done) ──────────────────
function completePetAdoption(petId) {
  const myPets = state.pets.myPets;
  if (myPets.length >= 5) {
    showReleaseChoiceModal(petId); return;
  }
  doAddPet(petId);
}

function doAddPet(petId) {
  const pet = PETS[petId];
  state.pets.myPets.push({ petId });
  if (!state.pets.activePetId) state.pets.activePetId = petId;
  delete state.pets.feeding[petId];
  addLog(`🐾 成功收養 ${pet.emoji}${pet.name}（${RARITY_LABEL[pet.rarity]}）！`, 'good');
  checkAchievements();
  saveGame(); renderAll(); renderPets();
}

// ── Full: show release-choice modal ──────────────────────────────
function showReleaseChoiceModal(newPetId) {
  const newPet = PETS[newPetId];
  let body = `<div style="font-size:.84rem;margin-bottom:10px;color:#7a5a40">寵物已滿 5 隻！<br>選擇一隻放生，為 ${newPet.emoji}<strong>${newPet.name}</strong> 騰出位置：</div>`;
  body += '<div style="display:flex;flex-direction:column;gap:7px">';
  state.pets.myPets.forEach(({ petId }) => {
    const p        = PETS[petId];
    const isActive = petId === state.pets.activePetId;
    body += `
      <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(0,0,0,.06);border-radius:10px;border:1px solid rgba(0,0,0,.1)">
        <span style="font-size:1.4rem">${p.emoji}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:.8rem;font-weight:700">${p.name}${isActive ? ' 🗡️' : ''} <span style="font-size:.62rem;opacity:.6">${RARITY_LABEL[p.rarity]}</span></div>
          <div style="font-size:.64rem;color:#8a6a50;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${p.buffDesc}</div>
        </div>
        <button class="mbtn mbtn-cancel release-choice-btn" style="padding:5px 10px;font-size:.72rem;flex-shrink:0" data-rid="${petId}">放生</button>
      </div>`;
  });
  body += '</div>';

  showModal({
    emoji: '⚠️', title: '寵物上限已滿',
    body,
    buttons: [{ text:'取消', cls:'mbtn-cancel', cb: () => { hideModal(); renderPets(); } }],
  });

  // bind release buttons after modal renders
  setTimeout(() => {
    document.querySelectorAll('.release-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        hideModal();
        doReleaseAndAdopt(btn.dataset.rid, newPetId);
      });
    });
  }, 30);
}

function doReleaseAndAdopt(releaseId, newPetId) {
  const rp = PETS[releaseId];
  state.pets.myPets = state.pets.myPets.filter(p => p.petId !== releaseId);
  if (state.pets.activePetId === releaseId)
    state.pets.activePetId = state.pets.myPets[0]?.petId || null;
  addLog(`🐾 放生了 ${rp.emoji}${rp.name}`, 'warn');
  doAddPet(newPetId);
}

// ── Release a pet from myPets ─────────────────────────────────────
function releasePetById(petId) {
  const pet = PETS[petId];
  showModal({
    emoji: '😢',
    title: `放生 ${pet.name}？`,
    body:  `確定放生 ${pet.emoji} ${pet.name} 嗎？<br>放生後需重新餵食才能再次收養。`,
    buttons: [
      { text:'放生', cls:'mbtn-cancel', cb: () => {
          state.pets.myPets = state.pets.myPets.filter(p => p.petId !== petId);
          if (state.pets.activePetId === petId)
            state.pets.activePetId = state.pets.myPets[0]?.petId || null;
          addLog(`🐾 放生了 ${pet.emoji}${pet.name}...`);
          saveGame(); renderAll(); renderPets();
      }},
      { text:'繼續保留', cls:'mbtn-ok', cb: hideModal },
    ],
  });
}

function renderLog() {
  const el = document.getElementById('activity-log');
  el.innerHTML = state.log.slice(0, 15).map((entry, i) => {
    let cls = 'log-entry';
    if (i === 0) cls += '';
    if (entry.includes('收穫') || entry.includes('成熟') || entry.includes('解鎖') || entry.includes('出售') || entry.includes('完成') || entry.includes('升級')) cls += ' good';
    else if (entry.includes('枯萎') || entry.includes('暴風') || entry.includes('缺水')) cls += ' warn';
    else if (entry.includes('枯死') || entry.includes('摧毀')) cls += ' bad';
    return `<div class="${cls}">${entry}</div>`;
  }).join('');
}

function renderStats() {
  const el = document.getElementById('stats-content');
  if (!el) return;
  const s = state.stats;
  el.innerHTML = `
    <div class="stat-row"><span>遊戲天數</span><span class="stat-val">${state.day} 天</span></div>
    <div class="stat-row"><span>總種植</span><span class="stat-val">${s.totalPlanted} 格</span></div>
    <div class="stat-row"><span>總收穫</span><span class="stat-val">${s.totalHarvested} 格</span></div>
    <div class="stat-row"><span>總收入</span><span class="stat-val">${s.totalCoinsEarned}💰</span></div>
  `;
}

// ============================================================
// 18. INTERACTIONS
// ============================================================
function onTileClick(idx) {
  if      (state.activeTool === 'seed')    return; // handled by drag → _checkSeedCollision
  else if (state.activeTool === 'water')   return; // handled by drag → _checkBucketCollision
  else if (state.activeTool === 'harvest') harvestTile(idx);
}

// ── Unified drag state (seed + water) ────────────────────────
let _dragActive    = false;
let _dragCursorEl  = null;
let _draggedTiles  = new Set(); // tile indices already processed this drag

function _getPointerPos(e) {
  if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function startDrag(e) {
  const tool = state.activeTool;
  if (tool !== 'water' && tool !== 'seed') return;
  if (tool === 'seed' && !state.selectedSeed) { addLog('⚠️ 請先選擇種子！'); return; }
  e.preventDefault();
  _dragActive   = true;
  _draggedTiles = new Set();

  const pos = _getPointerPos(e);
  _dragCursorEl = document.createElement('div');
  _dragCursorEl.className = tool === 'water' ? 'water-bucket-follow' : 'seed-bag-follow';
  _dragCursorEl.textContent = tool === 'water' ? '🪣' : CROPS[state.selectedSeed].emoji;
  _dragCursorEl.style.left = pos.x + 'px';
  _dragCursorEl.style.top  = pos.y + 'px';
  document.body.appendChild(_dragCursorEl);
  _checkDragCollision(pos.x, pos.y);
}

function moveDrag(e) {
  if (!_dragActive || !_dragCursorEl) return;
  e.preventDefault();
  const pos = _getPointerPos(e);
  _dragCursorEl.style.left = pos.x + 'px';
  _dragCursorEl.style.top  = pos.y + 'px';
  _checkDragCollision(pos.x, pos.y);
}

function endDrag() {
  if (!_dragActive) return;
  _dragActive = false;
  if (_dragCursorEl) {
    _dragCursorEl.classList.add('water-bucket-exit');
    const el = _dragCursorEl;
    _dragCursorEl = null;
    setTimeout(() => el.remove(), 280);
  }
  if (_draggedTiles.size > 0) {
    if (state.activeTool === 'water') checkWaterAllQuest();
    saveGame();
    renderAll();
  }
  _draggedTiles.clear();
}

function _checkDragCollision(cx, cy) {
  const tool     = state.activeTool;
  const grid     = document.getElementById('farm-grid');
  const gridRect = grid.getBoundingClientRect();
  const tileSize = gridRect.width / CFG.gridCols;
  const radius   = tileSize * 0.55;

  grid.querySelectorAll('.tile').forEach((tileEl, idx) => {
    if (_draggedTiles.has(idx)) return;
    const r  = tileEl.getBoundingClientRect();
    const tx = r.left + r.width  / 2;
    const ty = r.top  + r.height / 2;
    if (Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2) > radius) return;

    if (tool === 'water') {
      _applyWaterToTile(idx, tileEl);
    } else if (tool === 'seed') {
      _applyPlantToTile(idx, tileEl);
    }
  });
}

function _applyWaterToTile(idx, tileEl) {
  const tile = state.grid[idx];
  if (!['planted', 'growing', 'wilted'].includes(tile.state)) { _draggedTiles.add(idx); return; }
  if (tile.watered) { _draggedTiles.add(idx); return; }
  tile.watered = true;
  _draggedTiles.add(idx);
  if (tile.state === 'wilted') {
    tile.state      = tile.growthDay > 0 ? 'growing' : 'planted';
    tile.wiltedDays = 0;
    addLog(`💧 救活了枯萎的 ${CROPS[tile.crop].emoji} ${CROPS[tile.crop].name}！`);
  } else {
    addLog(`💧 澆水：${CROPS[tile.crop].emoji} ${CROPS[tile.crop].name}`);
  }
  addXP(XP_FOR.water, 'water');
  const waterXpBonus = getPetBuffTotal('water_xp', 'amount');
  if (waterXpBonus > 0) addXP(waterXpBonus, 'water_bonus');
  updateQuestProgress('water', 1);
  tileEl.classList.add('watered');
}

function _applyPlantToTile(idx, tileEl) {
  const tile = state.grid[idx];
  if (state.dayTimeLeft <= 0) return;
  if (tile.state !== 'empty') { _draggedTiles.add(idx); return; }

  const crop    = CROPS[state.selectedSeed];
  const inStash = (state.seedStash[state.selectedSeed] || 0) > 0;
  let actualCost = crop.seedCost;
  const totalDiscount = getPetBuffTotal('plant_discount', 'pct')
                      + getPetBuffTotal('legendary_moonrabbit', 'plant_pct')
                      + getPetBuffTotal('mythic_worldtree', 'plant_pct');
  if (!inStash && totalDiscount > 0) {
    actualCost = Math.max(1, Math.floor(actualCost * (1 - totalDiscount)));
  }
  if (!inStash && state.coins < actualCost) return; // skip silently if broke

  if (inStash) {
    state.seedStash[state.selectedSeed]--;
    if (state.seedStash[state.selectedSeed] <= 0) delete state.seedStash[state.selectedSeed];
    addLog(`🌱 使用囤積種子種下 ${crop.emoji} ${crop.name}`);
  } else {
    state.coins -= actualCost;
    const discountNote = actualCost < crop.seedCost ? ` 🐝折扣` : '';
    addLog(`🌱 種下 ${crop.emoji} ${crop.name}（-${actualCost}💰${discountNote}）`);
  }

  tile.state      = 'planted';
  tile.crop       = state.selectedSeed;
  tile.growthDay  = 0;
  tile.watered    = false;
  tile.wiltedDays = 0;
  tile.isReady    = false;
  tile.hp         = 100;
  _draggedTiles.add(idx);

  state.stats.totalPlanted++;
  updateQuestProgress('plant', 1);
  addXP(XP_FOR.plant, 'plant');
  checkAchievements();

  // Immediate visual feedback
  tileEl.className = 'tile planted';
  tileEl.querySelector('span') && (tileEl.querySelector('span').textContent = '🌱');
}

function selectSeed(cropId) {
  state.activeTool  = 'seed';
  state.selectedSeed = cropId;
  renderAll();
}

function harvestAll() {
  const readyTiles = state.grid.map((t, i) => ({ tile: t, idx: i })).filter(({ tile }) => tile.state === 'ready');
  if (readyTiles.length === 0) { addLog('⚠️ 目前沒有成熟的作物！'); hideModal(); return; }
  readyTiles.forEach(({ idx }) => harvestTile(idx, true));
  addLog(`🌾 一次收穫了 ${readyTiles.length} 株作物！`, 'good');
  saveGame();
  renderAll();
  hideModal();
}

function selectTool(tool) {
  if (tool === 'harvest') {
    const readyCount = state.grid.filter(t => t.state === 'ready').length;
    showModal({
      emoji: '🌾',
      title: '收穫方式',
      body: readyCount > 0
        ? `目前有 <strong>${readyCount}</strong> 株作物已成熟`
        : '目前沒有成熟的作物',
      buttons: [
        { text: '🌾 收穫全部', cls: 'mbtn-primary', cb: harvestAll },
        { text: '👆 收穫單一', cls: 'mbtn-ok', cb: () => {
            hideModal();
            state.activeTool = 'harvest';
            state.selectedSeed = null;
            renderAll();
          }
        },
        { text: '取消', cls: 'mbtn-cancel', cb: hideModal },
      ],
    });
    return;
  }
  state.activeTool  = tool;
  if (tool !== 'seed') state.selectedSeed = null;
  renderAll();
}

function switchTab(tab) {
  state.activeTab = tab;
  renderAll();
}

// ============================================================
// 19. MODAL
// ============================================================
function showModal({ emoji = '', title, body, buttons = [] }) {
  document.getElementById('modal-emo').textContent   = emoji;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML    = body;

  const btnsEl = document.getElementById('modal-btns');
  btnsEl.innerHTML = '';
  buttons.forEach(({ text, cls, cb }) => {
    const btn = document.createElement('button');
    btn.className   = `mbtn ${cls}`;
    btn.textContent = text;
    btn.addEventListener('click', () => { hideModal(); if (cb) cb(); });
    btnsEl.appendChild(btn);
  });

  document.getElementById('modal-overlay').classList.add('show');
}

function hideModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

// ============================================================
// 20. EVENT BINDINGS
// ============================================================
function bindEvents() {
  document.querySelectorAll('.tool-btn').forEach(b => b.addEventListener('click', () => selectTool(b.dataset.tool)));
  document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  const farmGrid = document.getElementById('farm-grid');
  farmGrid.addEventListener('mousedown',  startDrag);
  farmGrid.addEventListener('touchstart', startDrag, { passive: false });
  document.addEventListener('mousemove',  moveDrag);
  document.addEventListener('touchmove',  moveDrag, { passive: false });
  document.addEventListener('mouseup',    endDrag);
  document.addEventListener('touchend',   endDrag);

  document.getElementById('next-day-btn').addEventListener('click', advanceDay);
  document.getElementById('reset-btn').addEventListener('click', () => {
    showModal({
      emoji: '⚠️',
      title: '重置遊戲',
      body:  '確定要重置所有進度嗎？此操作無法復原。',
      buttons: [
        { text:'確定重置', cls:'mbtn-ok', cb: () => {
          localStorage.removeItem(CFG.saveKey);
          pendingLevelUps.length = 0;
          state = freshState();
          renderAll();
          addLog('遊戲已重置！');
        }},
        { text:'取消', cls:'mbtn-cancel', cb: hideModal },
      ],
    });
  });

  document.getElementById('redeem-btn').addEventListener('click', () => {
    redeemCode(document.getElementById('redeem-input').value);
  });
  document.getElementById('redeem-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') redeemCode(document.getElementById('redeem-input').value);
  });

  document.getElementById('sell-all-btn').addEventListener('click', () => {
    if (state.inventory.length === 0) return;
    const total = state.inventory.reduce((s,i) => s + i.sellPrice * i.quantity, 0);
    showModal({
      emoji: '💰',
      title: '全部出售',
      body:  `確定出售所有倉庫物品？<br>預計收入：<strong>${total}💰</strong>`,
      buttons: [
        { text:`出售 (${total}💰)`, cls:'mbtn-ok', cb: sellAllInventory },
        { text:'取消',              cls:'mbtn-cancel', cb: hideModal },
      ],
    });
  });

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) hideModal();
  });

  // Pet FAB + sheet
  document.getElementById('pet-fab').addEventListener('click', openPetSheet);
  document.getElementById('pet-sheet-close').addEventListener('click', closePetSheet);
  document.getElementById('pet-sheet-bg').addEventListener('click', closePetSheet);
}

// ============================================================
// 21. INIT
// ============================================================
function addLog(msg, type) {
  state.log.unshift(`[第${state.day}天] ${msg}`);
  if (state.log.length > CFG.maxLog) state.log.length = CFG.maxLog;
}

function initGame() {
  const loaded = loadGame();
  if (!loaded) state = freshState();
  // Ensure daily pets are always populated
  if (!state.pets.dailyPets || state.pets.dailyPets.length === 0) {
    state.pets.dailyPets = generateDailyPets();
  }
  bindEvents();
  renderAll();
  startDayTimer(); // resume or start countdown

  if (!loaded) {
    showModal({
      emoji: '🌾',
      title: '歡迎來到農場！',
      body: `
        <div class="srow">🌱 選購種子，點擊農地種植</div>
        <div class="srow">💧 每天記得澆水，作物才會生長</div>
        <div class="srow">🌾 收穫後進倉庫，再從倉庫頁籤出售</div>
        <div class="srow">🌅 點擊「結束今天」前往下一天</div>
        <div class="srow">🌸 四季交替，天氣每天不同！</div>
      `,
      buttons: [{ text:'開始種菜！', cls:'mbtn-primary', cb: hideModal }],
    });
  }
}

document.addEventListener('DOMContentLoaded', initGame);
