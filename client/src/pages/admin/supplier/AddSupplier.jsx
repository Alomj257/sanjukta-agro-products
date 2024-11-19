import React, { useState, useEffect } from 'react';
import './supplier-style.css';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LoadingButton from '../../../components/ui/LoadingButton';

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
        <div className='suppier_main'>
            <h2 className='supplier_header'>Supplier / Add</h2>
            <form onSubmit={handleSubmit}>
                <div className="row supplier_container">
                    <div className="col-md-6 supplier_item">
                        <label>Supplier Name *</label>
                        <Input
                            type="text"
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleChange}
                            placeholder="Enter supplier name"
                            required
                        />
                    </div>

                    <div className="col-md-6 supplier_item">
                        <label>Supplier Address *</label>
                        <Input
                            type="text"
                            name="supplierAddress"
                            value={formData.supplierAddress}
                            onChange={handleChange}
                            placeholder="Enter supplier address"
                            required
                        />
                    </div>

                    <div className="col-md-6 supplier_item">
                        <label>Category *</label>
                        <Input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    <div className="col-md-6 supplier_item">
                        <label>Item Name *</label>
                        <Input
                            type="text"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleChange}
                            placeholder="Sugar"
                            required
                        />
                    </div>

                    <div className="col-md-6 supplier_item">
                        <label>Quantity *</label>
                        <Input
                            type="number"
                            name="itemQuantity"
                            value={formData.itemQuantity}
                            onChange={handleChange}
                            placeholder="10 kg"
                            required
                        />
                    </div>

                    <div className="col-md-6 supplier_item">
                        <label>Price per Item *</label>
                        <Input
                            type="number"
                            name="pricePerItem"
                            value={formData.pricePerItem}
                            onChange={handleChange}
                            placeholder="Rs 40"
                            required
                        />
                    </div>

                    <div className="col-md-12 supplier_item">
                        <label>Total Price</label>
                        <Input
                            type="text"
                            name="totalPrice"
                            value={formData.totalPrice}
                            readOnly
                        />
                    </div>

                    <div className="col-md-4 pt-4 d-flex justify-content-center align-items-center">
                        <Button><LoadingButton title='Add Supplier' /></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
