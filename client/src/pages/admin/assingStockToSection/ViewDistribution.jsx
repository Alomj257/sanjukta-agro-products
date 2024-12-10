import React, { useState, useEffect, useRef } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import apis from "../../../utils/apis";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import DeleteModal from "../../../components/model/DeleteModal";
import AddUpdateStock from "./addStock";

const ViewDistribution = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const toastShownRef = useRef(false);
  const [popUp, setPopUp] = useState(false);
  const [details, setDetails] = useState({});
  const {state}=useLocation();
  const {sectionId}=state;

  const fetchSection = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        apis().getAllSectionsStock(sectionId)
      );
      if (!response.ok) throw new Error("Failed to fetch sections");

      const result = await response.json();
      console.log(result)
      if (result && result.stocks && result.stocks.length > 0) {
        setData(result?.stocks);
        setRecords(result?.stocks);

        if (!toastShownRef.current) {
          toastShownRef.current = true;
          toast.success("Sections fetched successfully!");
        }
      } else {
        console.error("No section data found", result);
        throw new Error("No section data found");
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSection();
  }, []);

  const handleEdit = (row) => {
    // navigate(`/admin/section/edit/${row._id}`, { state: { sectionData: row } });
    setPopUp(true);
    setDetails(row);
  };

  const handleDelete = (section) => {
    setSectionToDelete(section);
    setShowDeleteModal(true);
  };
  const refetch = () => {
    fetchSection();
  };

  const confirmDelete = async () => {
    if (!sectionToDelete) return;
    try {
      const deleteUrl = apis().deleteStockFromSection(
        sectionId,
        sectionToDelete._id?._id
      );
      const response = await fetch(deleteUrl, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete section");
      setData(
        data.filter((item) => item._id?._id !== sectionToDelete._id?._id)
      );
      setRecords(
        records.filter((item) => item._id?._id !== sectionToDelete._id?._id)
      );
      toast.success("Stock deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
      setSectionToDelete(null);
    }
  };
  return (
    <div className="section-container">
      {/* <div className="section-search ">
        <button className="supplierBtn ms-auto" onClick={() => setPopUp(true)}>
          Add Stock
        </button>
      </div> */}
      <h4 className="mt-4">Stock Distribution</h4>
      {loading ? (
        <div className="loading-spinner">
          <ClipLoader size={30} color="#00BFFF" loading={loading} />
        </div>
      ) : (
        <div className="table_main">
          {records.length <= 0 ? (
            <>
              <div className="text-center">No Stock distributed</div>
            </>
          ) : (
            <table className="item-table">
              <thead>
                <tr>
                  <th>Stock </th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?._id?.itemName}</td>
                    <td>
                      {item?.qty}
                      {item?.unit}
                    </td>
                    <td>
                      <div>
                        {/* <button onClick={() => handleView(row)} className='readBtn Btn'><FaEye /></button> */}
                        <button
                          onClick={() => handleEdit(item)}
                          className="editBtn Btn"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="deleteBtn Btn"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          supplierName={sectionToDelete.supplierName}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {popUp && (
        <AddUpdateStock
          reFetch={refetch}
          details={details}
          setPopUp={setPopUp}
        />
      )}
    </div>
  );
};

export default ViewDistribution;
