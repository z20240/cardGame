var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'CardSchema', {
    id: Number, // 卡片ID
    name: String, // 卡片名稱
    cost: Number, // 花費
    atk: Number, // 攻擊力
    def: Number, // 守備力
    desc: String, // 效果敘述
    effect_object: Schema.Types.Mixed, // 效果
    type: Number, // 卡片種類
    effect_type: [Number], // 效果種類
    suit_job: [Number], // 適用職業
    rarity: Number // 卡片稀有度
}, "card"); // (name, schema, collection)
