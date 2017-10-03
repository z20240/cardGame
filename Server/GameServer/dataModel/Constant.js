exports = module.exports = {
    MAX_COST : 10,
    BATTLE_MODE : {
        PVE : 1,
        PVP : 2,
        DRAFT : 4,
    },
    JOB : {
        NONE : 0, // 中立
        WORRIOR : 1,    // 戰士
        SPELLER : 2,    // 咒術師
        NECROMANCER: 3, // 死靈師
        ASSASSIN: 4, // 刺客
        PRIEST: 5, // 祭司
    },
    CARD_TYPE : {
        WHITE_MAGIC : 1,
        BLACK_MAGIC : 2,
        MELLEE : 3,
        RANGE : 4,
        POISON : 5,
        NPC : 6,
        DECORATION : 7,
    },
    RARITY : {
        COMMON : 1,
        UNCOMMON : 2,
        RARE : 3,
        EPIC : 4,
        LEGENDARY: 5,
    },
    EFF_TYPE : {
        NONE : 0,           // 無
        HEAL : 1,           // 回復(加牌入牌組)
        DIRECT_ATTACK : 2,  // 直接攻擊玩家
        QUICK_ATTACK : 3,  // 入場即可攻擊
        ADD_2_DECK : 4, // 加牌入牌組
        ADD_2_HEND : 5, // 加牌入手牌
        ADD_2_GRAVE : 6, // 加牌入墓
        ADD_2_BANISH : 7, // 加牌入除外
        SEARCH_CARD : 8, // 檢索
        DRAW_CARD : 9, // 抽濾
        ADD_ATK : 10,  // 增攻
        ADD_DEF : 11, // 增防
        REDUCE_COST : 12, // 降費
        BANISH : 13, // 除外
        SUMMON : 14, // 特召
        ATK_SELECT : 15, // 攻擊指定
        EFF_SELECT : 15, // 攻擊指定
    },
};