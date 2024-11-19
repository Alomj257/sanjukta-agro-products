// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Add or Update stock (this can be triggered when adding/updating a supplier)
router.post('/update-stock', async (req, res, next) => {
    try {
        const { category, itemName, itemQuantity } = req.body;
        await stockController.addOrUpdateStock(category, itemName, itemQuantity);
        res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        next(error);
    }
});

// Update stock quantity when item quantity changes (used when updating supplier's stock)
router.put('/update-quantity', async (req, res, next) => {
    try {
        const { category, itemName, itemQuantityChange } = req.body;
        await stockController.updateStockQuantity(category, itemName, itemQuantityChange);
        res.status(200).json({ message: 'Stock quantity updated successfully' });
    } catch (error) {
        next(error);
    }
});

// Delete stock when supplier is deleted or item is no longer needed
router.delete('/delete-stock', async (req, res, next) => {
    try {
        const { category, itemName, itemQuantity } = req.body;
        await stockController.deleteStock(category, itemName, itemQuantity);
        res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
