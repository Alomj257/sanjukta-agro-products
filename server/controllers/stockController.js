// controllers/stockController.js
const Stock = require('../models/Stock');

exports.addOrUpdateStock = async (category, itemName, itemQuantity) => {
    try {
        let stock = await Stock.findOne({ category, itemName });
        if (!stock) {
            stock = new Stock({
                category,
                itemName,
                totalStock: itemQuantity,
                sections: [{ sectionName: 'General', sectionStock: itemQuantity }]
            });
            await stock.save();
        } else {
            stock.totalStock += itemQuantity;
            const section = stock.sections.find(s => s.sectionName === 'General');
            if (section) {
                section.sectionStock += itemQuantity;
            } else {
                stock.sections.push({ sectionName: 'General', sectionStock: itemQuantity });
            }
            await stock.save();
        }
    } catch (error) {
        console.error('Error updating stock:', error);
        throw error;
    }
};

exports.updateStockQuantity = async (category, itemName, itemQuantityChange) => {
    try {
        const stock = await Stock.findOne({ category, itemName });
        if (!stock) {
            throw new Error('Stock not found');
        }
        stock.totalStock += itemQuantityChange;
        const section = stock.sections.find(s => s.sectionName === 'General');
        if (section) {
            section.sectionStock += itemQuantityChange;
        } else {
            stock.sections.push({ sectionName: 'General', sectionStock: itemQuantityChange });
        }
        await stock.save();
    } catch (error) {
        console.error('Error updating stock quantity:', error);
        throw error;
    }
};

exports.deleteStock = async (category, itemName, itemQuantity) => {
    try {
        const stock = await Stock.findOne({ category, itemName });
        if (!stock) {
            throw new Error('Stock not found');
        }
        stock.totalStock -= itemQuantity;
        const section = stock.sections.find(s => s.sectionName === 'General');
        if (section) {
            section.sectionStock -= itemQuantity;
        }
        if (stock.totalStock <= 0) {
            await Stock.deleteOne({ category, itemName });
        } else {
            await stock.save();
        }
    } catch (error) {
        console.error('Error deleting stock:', error);
        throw error;
    }
};
