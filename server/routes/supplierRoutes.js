const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Add new supplier
router.post('/add-supplier', supplierController.addSupplier);

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// View a specific supplier
router.get('/view-supplier/:id', supplierController.getSupplierById);

// Update a supplier
router.put('/update-supplier/:id', supplierController.updateSupplier);

// Delete a supplier
router.delete('/delete-supplier/:id', supplierController.deleteSupplier);

module.exports = router;
