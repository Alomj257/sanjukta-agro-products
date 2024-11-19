// controllers/supplierController.js
const Supplier = require('../models/Supplier');
const StockController = require('./stockController');
const { validateSupplier } = require('../utils/validation');

exports.addSupplier = async (req, res, next) => {
    const { error: validationError } = validateSupplier(req.body);
    if (validationError) {
        const error = new Error(validationError.details[0].message);
        error.statusCode = 400;
        return next(error);
    }

    const { supplierName, supplierAddress, category, itemName, itemQuantity, pricePerItem } = req.body;
    const totalPrice = pricePerItem * itemQuantity;

    try {
        const newSupplier = new Supplier({
            supplierName,
            supplierAddress,
            category,
            itemName,
            itemQuantity,
            pricePerItem,
            totalPrice
        });

        await newSupplier.save();

        // Update Stock
        await StockController.addOrUpdateStock(category, itemName, itemQuantity);

        res.status(200).json({ message: 'Supplier added successfully', supplier: newSupplier });
    } catch (error) {
        next(error);
    }
};

exports.getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        next(error);
    }
};

exports.viewSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(supplier);
    } catch (error) {
        next(error);
    }
};

exports.updateSupplier = async (req, res, next) => {
    const { error: validationError } = validateSupplier(req.body);
    if (validationError) {
        const error = new Error(validationError.details[0].message);
        error.statusCode = 400;
        return next(error);
    }

    const { category, itemName, itemQuantity, pricePerItem } = req.body;
    try {
        const existingSupplier = await Supplier.findById(req.params.id);
        if (!existingSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Calculate change in stock quantity
        const quantityChange = itemQuantity - existingSupplier.itemQuantity;

        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Update stock
        await StockController.updateStockQuantity(category, itemName, quantityChange);

        res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
    } catch (error) {
        next(error);
    }
};

exports.deleteSupplier = async (req, res, next) => {
    try {
        const supplierToDelete = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplierToDelete) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Update stock by reducing the quantity
        await StockController.deleteStock(supplierToDelete.category, supplierToDelete.itemName, supplierToDelete.itemQuantity);

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        next(error);
    }
};
