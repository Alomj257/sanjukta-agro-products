const express = require('express');
const router = express.Router();

// Import the stock controller
const stockController = require('../controllers/stockController');

// Define routes and link to controller functions
router.post('/add', stockController.addStock); // Add stock
router.put('/update/:itemId', stockController.updateStock); // Update stock
router.delete('/delete/:itemId', stockController.deleteStock); // Delete stock
router.get('/', stockController.getAllStock); // Get all stock

module.exports = router;
