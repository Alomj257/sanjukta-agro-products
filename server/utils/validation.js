// utils/validation.js
const Joi = require('joi');

const validateSupplier = (supplier) => {
    const schema = Joi.object({
        supplierName: Joi.string().required(),
        supplierAddress: Joi.string().required(),
        category: Joi.string().required(),
        itemName: Joi.string().required(),
        itemQuantity: Joi.number().positive().required(),
        pricePerItem: Joi.number().positive().required(),
    });
    return schema.validate(supplier);
};

module.exports = { validateSupplier };
