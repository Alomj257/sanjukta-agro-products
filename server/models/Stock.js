// // models/Stock.js
// const mongoose = require('mongoose');

// const stockSchema = new mongoose.Schema({
//     category: {
//         type: String,
//         required: true
//     },
//     itemName: {
//         type: String,
//         required: true
//     },
//     totalStock: {
//         type: Number,
//         required: true
//     },
//     sections: [{
//         sectionName: {
//             type: String,
//             required: true
//         },
//         sectionStock: {
//             type: Number,
//             required: true
//         }
//     }]
// }, { timestamps: true });

// const Stock = mongoose.model('Stock', stockSchema);
// module.exports = Stock;

// models/Stock.js
// const mongoose = require('mongoose');

// const stockSchema = new mongoose.Schema({
//     itemName: { type: String, required: true },
//     unit: { type: String, enum: ['kg', 'lit'], required: true },
//     totalStock: { type: Number, required: true },
// }, { timestamps: true });

// const Stock = mongoose.model('Stock', stockSchema);
// module.exports = Stock;

const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Store item names in lowercase for uniformity
    },
    unit: {
        type: String,
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stock', StockSchema);
