import React from 'react';
import './supplier-style.css';

const ViewSupplier = ({ supplier, onClose }) => {
    return (
        <div className='view-supplier-container'>
            <h2>Supplier Details</h2>
            <p><strong>Name:</strong> {supplier.supplierName}</p>
            <p><strong>Address:</strong> {supplier.supplierAddress}</p>
            <p><strong>Category:</strong> {supplier.category}</p>
            <p><strong>Item Name:</strong> {supplier.itemName}</p>
            <p><strong>Quantity:</strong> {supplier.itemQuantity}</p>
            <p><strong>Price Per Item:</strong> {supplier.pricePerItem}</p>
            <p><strong>Total Price:</strong> {supplier.totalPrice}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ViewSupplier;
