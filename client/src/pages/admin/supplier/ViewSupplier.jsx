import React from 'react';
import './supplier-style.css';

const ViewSupplier = ({ supplierData }) => {
    if (!supplierData) {
        return <p>No supplier details available.</p>;
    }

    return (
        <div className="supplier-details-container">
            <h2 className="supplier-header">Supplier / View Details</h2>
            <div className="supplier-details">
                <div className="supplier-row">
                    <label>Supplier Name:</label>
                    <span>{supplierData.supplierName}</span>
                </div>
                <div className="supplier-row">
                    <label>Supplier Address:</label>
                    <span>{supplierData.supplierAddress}</span>
                </div>
                <div className="supplier-row">
                    <label>Category:</label>
                    <span>{supplierData.category}</span>
                </div>
                <div className="supplier-row">
                    <label>Item Name:</label>
                    <span>{supplierData.itemName}</span>
                </div>
                <div className="supplier-row">
                    <label>Quantity:</label>
                    <span>{supplierData.itemQuantity} kg</span>
                </div>
                <div className="supplier-row">
                    <label>Price Per Item:</label>
                    <span>${supplierData.pricePerItem}</span>
                </div>
                <div className="supplier-row">
                    <label>Total Price:</label>
                    <span>${supplierData.totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default ViewSupplier;