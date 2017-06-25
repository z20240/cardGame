var Constant = require('../dataModel/Constant.js');

exports = module.exports = [
    {
        id: 1,
        name: "哥布林",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 1,
        def: 2,
        cost: 1,
        suit_job: Constant.JOB.NONE,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.NONE],
        desc: "none"
    },
    {
        id: 2,
        name: "迅捷的傭兵",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 1,
        def: 1,
        cost: 1,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.DIRECT_ATTACK],
        desc: "此卡可以直接攻擊玩家"
    },
    {
        id: 3,
        name: "迅捷的暗殺者",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 1,
        def: 1,
        cost: 1,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.QUICK_ATTACK], 
        desc: "此卡出場回合即可進行攻擊"
    },
    {
        id: 4,
        name: "哥布林的後勤隊",
        rarity: Constant.RARITY.UNCOMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 1,
        def: 2,
        cost: 2,
        suit_job: Constant.JOB.NONE,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_2_DECK, Constant.EFF_TYPE.ADD_2_HEND],
        desc: "此卡出場的時，將一張哥布林放入牌組，另一張哥布林以代替抽牌的方式加入手牌"
    },
    {
        id: 5,
        name: "盾的精靈",
        rarity: Constant.RARITY.RARE,
        type: Constant.CARD_TYPE.NPC,
        atk: 0,
        def: 2,
        cost: 3,
        suit_job: Constant.JOB.NONE,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.EFF_SELECT, Constant.EFF_TYPE.ATK_SELECT],
        desc: "此卡存在於場上時，卡片效果與攻擊只能指定此卡"
    },
    {
        id: 6,
        name: "哥布林的指揮官",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 2,
        def: 1,
        cost: 3,
        suit_job: Constant.JOB.NONE,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_2_HEND, Constant.EFF_TYPE.ADD_ATK],
        desc: "此卡出場時，從牌組將一張哥布林以代替抽牌的方式加入手牌。若以上效果成功發動，則此卡獲得+1/+0"
    },
    {
        id: 7,
        name: "分裂的比利",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.NPC,
        atk: 2,
        def: 1,
        cost: 2,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_2_HEND],
        desc: "此卡送入墓地時，從牌組將一張`分裂的比利`加入手牌"
    },
    {
        id: 8,
        name: "揮刀",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 1,
        def: 1,
        cost: 1,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.NONE],
        desc: "none"
    },
    {
        id: 9,
        name: "揮砍",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 2,
        def: 2,
        cost: 2,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.NONE],
        desc: "none"
    },
    {
        id: 10,
        name: "嗜血之刃",
        rarity: Constant.RARITY.COMMON,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 1,
        def: 1,
        cost: 1,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.HEAL],
        desc: "墓地一張卡回到牌組，並洗牌"
    },
    {
        id: 11,
        name: "喋血之刃",
        rarity: Constant.RARITY.UNCOMMON,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 2,
        def: 1,
        cost: 2,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.HEAL],
        desc: "墓地兩張卡回到牌組，並洗牌"
    },
    {
        id: 12,
        name: "劍匠的祝福",
        rarity: Constant.RARITY.UNCOMMON,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 0,
        def: 2,
        cost: 3,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.DIRECT_ATTACK],
        desc: "我方場上一隻NPC獲得+2/+0的效果"
    },
    {
        id: 13,
        name: "破戒劍",
        rarity: Constant.RARITY.RARE,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 4,
        def: 0,
        cost: 2,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.NONE],
        desc: "none"
    },
    {
        id: 14,
        name: "復活的太刀",
        rarity: Constant.RARITY.RARE,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 2,
        def: 2,
        cost: 4,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.HEAL],
        desc: "墓地三張卡回到牌組，並洗牌"
    },
    {
        id: 15,
        name: "春劍雨",
        rarity: Constant.RARITY.EPIC,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 0,
        def: 0,
        cost: 8,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_ATK, Constant.EFF_TYPE.ADD_DEF],
        desc: "將我方墓地的所有卡片移除，並且每兩張使此卡獲得+1/+1"
    },
    {
        id: 16,
        name: "勇氣的號角",
        rarity: Constant.RARITY.EPIC,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 4,
        def: 2,
        cost: 6,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_ATK],
        desc: "到比賽結束，玩家獲得+1/+0"
    },
    {
        id: 17,
        name: "狂戰士之血",
        rarity: Constant.RARITY.EPIC,
        type: Constant.CARD_TYPE.POISON,
        atk: 0,
        def: 2,
        cost: 2,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.ADD_ATK],
        desc: "當此卡從牌組送入墓地時並且成功發動時，之後的3張牌獲得+4/+0"
    },
    {
        id: 18,
        name: "維京的巨人",
        rarity: Constant.RARITY.LEGENDARY,
        type: Constant.CARD_TYPE.NPC,
        atk: 5,
        def: 5,
        cost: 10,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.BANISH],
        desc: "除外因此卡所造成的傷害數量的卡片"
    },
    {
        id: 19,
        name: "英雄的儀式",
        rarity: Constant.RARITY.LEGENDARY,
        type: Constant.CARD_TYPE.MELLEE,
        atk: 6,
        def: 4,
        cost: 6,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.SUMMON],
        desc: "在場上召喚一名`吉爾伽美什`"
    },
    {
        id: 20,
        name: "吉爾伽美什",
        rarity: Constant.RARITY.LEGENDARY,
        type: Constant.CARD_TYPE.NPC,
        atk: 8,
        def: 6,
        cost: 10,
        suit_job: Constant.JOB.WORRIOR,
        effect_object: {},
        effect_type: [Constant.EFF_TYPE.DIRECT_ATTACK, Constant.EFF_TYPE.QUICK_ATTACK],
        desc: "此卡出場回合即可進行攻擊，此卡可以直接攻擊玩家。"
    }
];