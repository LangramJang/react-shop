const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: 50
    }, 
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    continent: {
        type: Number,
        default: 1
    },
    /* 
     * ABKO 키보드 종류
     * [기계식 (mechanical) ]
     * blue + wired : K640(29,900) / K840(36,600), K512(104,330)
     * blue + bluetooth : TW1867
     * blue + both : X
     * 
     * brown + wired : K640(29,900) / K590(29,900), K660M(102,620)
     * brown + bluetooth : X
     * brown + both : X
     * 
     * red + wired : K640(29,900) / K560(21,500) / AR96(277,500)
     * red + bluetooth : TW1867(97,000)
     * red + both : X
     * 
     * black + wired : AR87(210,900) / AR96(277,500)
     * black + bluetooth : X
     * black + both : X
     * 
     * [멤브레인 (membrane) ]
     * wired : K180(22,350) / KM400(21,190)
     * bluetooth : WKM650(32,400) / WKM620(27,110)
     * both : X
     * 
     * [무접점 (noContact) ]
     * wired : K990(175,730) / K660(66,860) / K663(58,530)
     * bluetooth : X
     * both : KN10(209,630) / KN01(174,750)
     */
    switches: { // 스위치: blue(청축)/brown(갈축)/red(적축)/black(흑측)/membrain(맴브레인)
        type: String,
        default: 'blue'
    },
    connect: { // 연결방식: wired(유선)/bluetooth(무선)/both(유무선)
        type: String,
        default: 'wired'
    },
    contact: { // 접점방식
        type: String,
        default: 'mechanical'
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamp: true });

// Search 중요도 검색
productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }