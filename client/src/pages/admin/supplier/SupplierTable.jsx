import React, { useState } from 'react';
import DataTable from '../../../components/dataTable/DataTable';
import './supplier-style.css';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SupplierTable = () => {
    const navigate = useNavigate();

    // Define column headers
    const columns = [
        {
            name: 'Name',
            selector: row => row.supplierName,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.supplierAddress,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Item Name',
            selector: row => row.itemName,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.itemQuantity,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.pricePerItem,
            sortable: true,
        },
        {
            name: 'Total Price',
            selector: row => row.totalPrice,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button onClick={() => handleView(row)} className='readBtn Btn'><FaEye /></button>
                    <button onClick={() => handleEdit(row)} className='editBtn Btn'><MdEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className='deleteBtn Btn'><MdDelete /></button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Example data
    const [data, setData] = useState([
        {
            id: 1,
            supplierName: 'Jahangir Alom',
            supplierAddress: 'Latu, Karimganj, Assam',
            category: 'Food',
            itemName: 'Suger',
            itemQuantity: 10,
            pricePerItem: 50,
            totalPrice: 500,
        },
        {
            id: 2,
            supplierName: 'Supplier B',
            supplierAddress: 'Address B',
            category: 'Furniture',
            itemName: 'Item 2',
            itemQuantity: 5,
            pricePerItem: 100,
            totalPrice: 500,
        },
    ]);

    // Handlers
    const handleView = (row) => {
        console.log("View row: ", row);  // Check row data
        alert(`Viewing ${row.itemName}`);
    };

    const handleEdit = (row) => {
        console.log("Edit row: ", row);  // Check row data
        alert(`Editing ${row.itemName}`);
    };

    const handleDelete = (id) => {
        console.log("Delete ID: ", id);  // Check id
        setData(data.filter(item => item.id !== id));
    };

    const [records, setRecords] = useState(data);

    const handleSearch = (e) => {
        let query = e.target.value;
        const newRecords = data.filter(item => item.supplierName.toLowerCase().includes(query.toLowerCase()));
        setRecords(newRecords);
    };

    // Navigate to the Add Supplier page
    const handleAddSupplierClick = () => {
        navigate('/admin/supplier/add');
    };

    return (
        <div className='supplier-container'>
            <div className='supplier-search'>
                <input type="text" placeholder='Search supplier by name' onChange={handleSearch} />
                <button className='supplierBtn' onClick={handleAddSupplierClick}>Add Supplier</button>
            </div>
            <DataTable columns={columns} data={records} />
        </div>
    );
};

export default SupplierTable;
