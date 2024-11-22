const express = require('express');
const router = express.Router();
const existingItemsController = require('../controllers/existingItemsController');

// Add new existing item
router.post('/add-item', existingItemsController.addExistingItem);

// Get all existing items
router.get('/', existingItemsController.getAllExistingItems);

// View a specific existing item
router.get('/view-item/:id', existingItemsController.getExistingItemById);

// Update an existing item
router.put('/update-item/:id', existingItemsController.updateExistingItem);

// Delete an existing item
router.delete('/delete-item/:id', existingItemsController.deleteExistingItem);

module.exports = router;
