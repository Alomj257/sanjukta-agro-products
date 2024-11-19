// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    },
    sections: [{
        sectionName: {
            type: String,
            required: true
        },
        sectionStock: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
