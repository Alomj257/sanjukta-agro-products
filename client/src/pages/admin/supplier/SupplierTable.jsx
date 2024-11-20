import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../../components/dataTable/DataTable';
import './supplier-style.css';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import apis from '../../../utils/apis'; // Import apis.js correctly
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';  // Importing a loader component
import DeleteModal from '../../../components/model/DeleteModal';

const SupplierTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage modal visibility
    const [supplierToDelete, setSupplierToDelete] = useState(null); // State to store the supplier being deleted
    const toastShownRef = useRef(false);

    // Fetch suppliers from API
    useEffect(() => {
        const fetchSuppliers = async () => {
          try {
            const response = await fetch(apis().getAllSuppliers);
            if (!response.ok) throw new Error('Failed to fetch suppliers');
    
            const result = await response.json();
    
            if (result?.status) {
              // Sort suppliers by createdAt (assuming the field is `createdAt`)
              const sortedSuppliers = result.suppliers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
              setData(sortedSuppliers);
              setRecords(sortedSuppliers);
    
              // Show toast only if not already shown
              if (!toastShownRef.current) {
                toastShownRef.current = true; // Set ref to true after showing the toast
              }
            }
          } catch (error) {
            toast.error(error.message);
          } finally {
            setLoading(false);  // Set loading to false after fetching is complete
          }
        };
    
        fetchSuppliers();
      }, []);

    // Define column headers
    const columns = [
        {
            name: 'Name',
            selector: row => row.supplierName,
        },
        {
            name: 'Address',
            selector: row => row.supplierAddress,
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
        },
        {
            name: 'Price',
            selector: row => row.pricePerItem,
        },
        {
            name: 'Total Price',
            selector: row => row.totalPrice,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button onClick={() => handleView(row)} className='readBtn Btn'><FaEye /></button>
                    <button onClick={() => handleEdit(row)} className='editBtn Btn'><MdEdit /></button>
                    <button onClick={() => handleDelete(row)} className='deleteBtn Btn'><MdDelete /></button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Handlers
    const handleView = (row) => {
        navigate(`/admin/supplier/view/${row._id}`);  // Navigate to supplier details page
    };
    

    const handleEdit = (row) => {
        navigate(`/admin/supplier/edit/${row._id}`, { state: { supplierData: row } });
    }    

    const handleDelete = (supplier) => {
        setSupplierToDelete(supplier); // Set the supplier to be deleted
        setShowDeleteModal(true); // Show the modal
    };

    const confirmDelete = async () => {
        if (!supplierToDelete) return;

        try {
            // Use dynamic delete URL with the supplier ID
            const deleteUrl = apis().deleteSupplier(supplierToDelete._id); // Ensure you're calling the function
            const response = await fetch(deleteUrl, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete supplier');
            setData(data.filter(item => item._id !== supplierToDelete._id));
            setRecords(records.filter(item => item._id !== supplierToDelete._id));
            toast.success('Supplier deleted successfully');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setShowDeleteModal(false);
            setSupplierToDelete(null);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
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

            {/* Display loader spinner if loading is true */}
            {loading ? (
                <div className='loading-spinner'>
                    <ClipLoader size={30} color="#00BFFF" loading={loading} />
                </div>
            ) : (
                <DataTable columns={columns} data={records} />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <DeleteModal
                    supplierName={supplierToDelete.supplierName}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default SupplierTable;
