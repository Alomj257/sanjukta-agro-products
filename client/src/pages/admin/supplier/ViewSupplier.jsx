import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apis from '../../../utils/apis';  // Import your apis.js
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const SupplierDetails = () => {
    const { id } = useParams();  // Get the supplier ID from the URL
    const [supplierData, setSupplierData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            try {
                const response = await fetch(apis().viewSupplier(id));
                if (!response.ok) throw new Error('Failed to fetch supplier details');
                const result = await response.json();
                setSupplierData(result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplierDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-spinner">
                <ClipLoader size={30} color="#00BFFF" loading={loading} />
            </div>
        );
    }

    if (!supplierData) {
        return <p>No supplier details available.</p>;
    }

    return (
        <div className="suppier_main">
            <h2 className="supplier_header"><span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/admin/supplier')}>Supplier</span> / View Details</h2>
            <div className="row supplier_container">
                <div className="supplier_item viewBox">
                    <label>Supplier Name:</label>
                    <span className='col-md-4'>{supplierData.supplierName}</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Supplier Address:</label>
                    <span className='col-md-4'>{supplierData.supplierAddress}</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Category:</label>
                    <span className='col-md-4'>{supplierData.category}</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Item Name:</label>
                    <span className='col-md-4'>{supplierData.itemName}</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Quantity:</label>
                    <span className='col-md-4'>{supplierData.itemQuantity} kg</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Price Per Item:</label>
                    <span className='col-md-4'>${supplierData.pricePerItem}</span>
                </div>
                <div className="supplier_item viewBox">
                    <label>Total Price:</label>
                    <span className='col-md-4'>${supplierData.totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetails;
