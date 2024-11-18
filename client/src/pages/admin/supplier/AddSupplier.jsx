import React, { useState, useEffect } from 'react';
import './supplier-style.css';

const AddSupplier = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierAddress: '',
        category: '',
        itemName: '',
        itemQuantity: '',
        pricePerItem: '',
        totalPrice: 0,
    });

    useEffect(() => {
        const totalPrice = formData.itemQuantity * formData.pricePerItem;
        setFormData(prevFormData => ({
            ...prevFormData,
            totalPrice: totalPrice || 0,
        }));
    }, [formData.itemQuantity, formData.pricePerItem]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...formData, id: new Date().getTime() });
        alert('Supplier added successfully!');
    };

    return (
        <div className='add-supplier-container'>
            <h2>Supplier / Add</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <label>Supplier Name *</label>
                        <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} placeholder='Enter supplier name' required />
                    </div>

                    <div className="col-md-6">
                        <label>Supplier Address *</label>
                        <input type="text" name="supplierAddress" value={formData.supplierAddress} onChange={handleChange} placeholder='Enter supplier address' required />
                    </div>

                    <div className="col-md-6">
                        <label>Category *</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Enter category' required />
                    </div>

                    <div className="col-md-6">
                        <label>Item Name *</label>
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} placeholder='Suger' required />
                    </div>

                    <div className="col-md-6">
                        <label>Quantity *</label>
                        <input type="number" name="itemQuantity" value={formData.itemQuantity} onChange={handleChange} placeholder='10 kg' required />
                    </div>

                    <div className="col-md-6">
                        <label>Price per Item *</label>
                        <input type="number" name="pricePerItem" value={formData.pricePerItem} onChange={handleChange} placeholder='Rs 40' required />
                    </div>

                    <div className="col-md-16">
                        <label>Total Price</label>
                        <input type="text" name="totalPrice" value={formData.totalPrice} readOnly />
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
