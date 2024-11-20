import React, { useState, useEffect } from 'react';
import './supplier-style.css';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LoadingButton from '../../../components/ui/LoadingButton';
import { useLocation, useNavigate } from 'react-router-dom';
import apis from '../../../utils/apis';
import toast from 'react-hot-toast';

const EditSupplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { supplierData } = location.state || {}; // Get supplier data passed from the previous page

    const [formData, setFormData] = useState({
        supplierName: '',
        supplierAddress: '',
        category: '',
        itemName: '',
        itemQuantity: '',
        pricePerItem: '',
        totalPrice: 0,
    });

    // Set form data if supplierData is available
    useEffect(() => {
        if (supplierData) {
            setFormData({
                ...supplierData,
                totalPrice: supplierData.itemQuantity * supplierData.pricePerItem || 0,
            });
        }
    }, [supplierData]);

    // Recalculate totalPrice when quantity or price per item changes
    useEffect(() => {
        const totalPrice = formData.itemQuantity * formData.pricePerItem;
        setFormData(prevFormData => ({
            ...prevFormData,
            totalPrice: totalPrice || 0,
        }));
    }, [formData.itemQuantity, formData.pricePerItem]);

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { _id, createdAt, updatedAt, __v, totalPrice, ...dataToSend } = formData;
    
        try {
            const response = await fetch(apis().updateSupplier(supplierData._id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            const result = await response.json();
    
            if (response.ok && result?.supplier) {
                toast.success('Supplier updated successfully!');
                navigate('/admin/supplier');
            } else {
                throw new Error(result?.message || 'Failed to update supplier');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    

    return (
        <div className='suppier_main'>
            <h2 className='supplier_header'>
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/admin/supplier')}>
                    Supplier
                </span> / Edit
            </h2>
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
                            placeholder="Enter item name"
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
                            placeholder="Enter quantity"
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
                            placeholder="Enter price per item"
                            required
                        />
                    </div>

                    <div className="col-md-12 supplier_item">
                        <label>Total Price</label>
                        <Input
                            type="text"
                            name="totalPrice"
                            value={formData.totalPrice}
                            placeholder="Total Price"
                            readOnly
                        />
                    </div>

                    <div className="col-md-4 pt-4 d-flex justify-content-center align-items-center">
                        <Button>
                            <LoadingButton title="Update Supplier" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditSupplier;
