import React, { useState } from 'react';
import './supplier-style.css';

const EditSupplier = ({ supplier, onUpdate }) => {
    const [formData, setFormData] = useState({ ...supplier });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...formData, totalPrice: formData.itemQuantity * formData.pricePerItem });
        alert('Supplier updated successfully!');
    };

    return (
        <div className='edit-supplier-container'>
            <h2>Edit Supplier</h2>
            <form onSubmit={handleSubmit}>
                <label>Supplier Name:</label>
                <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} required />
                
                <label>Supplier Address:</label>
                <input type="text" name="supplierAddress" value={formData.supplierAddress} onChange={handleChange} required />
                
                <label>Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                
                <label>Item Name:</label>
                <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />
                
                <label>Quantity:</label>
                <input type="number" name="itemQuantity" value={formData.itemQuantity} onChange={handleChange} required />
                
                <label>Price per Item:</label>
                <input type="number" name="pricePerItem" value={formData.pricePerItem} onChange={handleChange} required />
                
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditSupplier;
