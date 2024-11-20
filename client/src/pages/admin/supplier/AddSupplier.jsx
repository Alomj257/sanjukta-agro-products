import React, { useState, useEffect } from 'react';
import './supplier-style.css';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LoadingButton from '../../../components/ui/LoadingButton';
import { useNavigate } from 'react-router-dom';
import apis from '../../../utils/apis';
import toast from 'react-hot-toast';

const AddSupplier = () => {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierAddress: '',
        category: '',
        itemName: '',
        itemQuantity: '',
        pricePerItem: '',
    });

    const navigate = useNavigate();  // Use React Router to navigate after success

    useEffect(() => {
        // Calculate totalPrice whenever itemQuantity or pricePerItem changes
        const totalPrice = formData.itemQuantity * formData.pricePerItem;
        setFormData(prevFormData => ({
            ...prevFormData,
            totalPrice: totalPrice || 0, // Update totalPrice in state
        }));
    }, [formData.itemQuantity, formData.pricePerItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert itemQuantity and pricePerItem to numbers
        if (name === "itemQuantity" || name === "pricePerItem") {
            setFormData({
                ...formData,
                [name]: value ? parseFloat(value) : 0, // If value is empty, set to 0
            });
        } else {
            // Update other fields normally
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Add supplier to the list without sending totalPrice
        const { totalPrice, ...supplierData } = formData; // Remove totalPrice

        try {
            // Send the supplier data to the backend without totalPrice
            const response = await fetch(apis().addSupplier, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success(result.message);  // Show success message
                navigate('/admin/supplier');  // Navigate to the supplier list page
            } else {
                toast.error(result.message || 'Failed to add supplier');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while adding supplier');
        }
    };

    return (
        <div className='suppier_main'>
            <h2 className='supplier_header'><span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/admin/supplier')}>Supplier</span>/ Add</h2>
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
                        <Button><LoadingButton title='Add Supplier' onClick={handleSubmit} /></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
