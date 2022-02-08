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