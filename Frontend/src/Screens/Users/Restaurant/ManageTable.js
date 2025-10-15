import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/ManageTable.css'; // Ensure you have corresponding styles

const ManageTable = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const [tableCount, setTableCount] = useState('');
    const [tables, setTables] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/ManageTable/getTableData/${restaurantId}`);
                const manageTable = response.data.manageTable;
                if (manageTable) {
                    setTables(manageTable.tables);
                }
            } catch (error) {
                toast.error('Failed to fetch table data');
            }
        };

        fetchTableData();
    }, [restaurantId]);

    const handleAddTable = async (e) => {
        e.preventDefault();

        if (!tableCount || tableCount <= 0) {
            setError('Number of tables must be a positive number!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/ManageTable/add', {
                restaurantId,
                numberOfTables: tableCount
            });
            setTables(response.data.manageTable.tables);
            setTableCount('');
            setError('');
            toast.success('Table count added successfully!');
        } catch (error) {
            toast.error('Failed to add table count');
        }
    };

    const handleEditTable = async () => {
        if (editIndex === null || !tableCount || tableCount <= 0) {
            setError('Add Atleast 1 table');
            return;
        }

        const tableToEdit = tables[editIndex];
        try {
            const response = await axios.put(`http://localhost:8080/ManageTable/edit/${tableToEdit._id}`, {
                numberOfTables: tableCount
            });

            const updatedTables = [...tables];
            updatedTables[editIndex] = response.data.updatedTable;
            setTables(updatedTables);
            setTableCount('');
            setIsEditing(false);
            setEditIndex(null);
            setError('');
            toast.success('Table count updated successfully!');
        } catch (error) {
            toast.error(`Failed to update table count: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await axios.delete(`http://localhost:8080/ManageTable/deleteAll/${restaurantId}`);
            setTables([]);
            setSuccess('');
            toast.success('All tables deleted successfully!');
            setIsDeleteConfirmationOpen(false);
        } catch (error) {
            toast.error(`Failed to delete all tables: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const handleDeleteAllConfirmation = () => {
        setIsDeleteConfirmationOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setIsDeleteConfirmationOpen(false);
        setError('');
    };

    const handleToggleAvailability = async (tableNumber) => {
        const updatedTables = tables.map((table) => 
            table.tableNumber === tableNumber 
            ? { ...table, isAvailable: !table.isAvailable } 
            : table
        );
        setTables(updatedTables);

        try {
            await axios.put(`http://localhost:8080/ManageTable/updateAvailability/${restaurantId}/${tableNumber}`, {
                isAvailable: updatedTables.find(table => table.tableNumber === tableNumber).isAvailable
            });
        } catch (error) {
            toast.error('Failed to update table availability');
        }
    };

    return (
        <div className="manage-table-container">
            <h5 className="manage-table-title">Manage Tables</h5>

            {success && <div className="manage-table-success text-success">{success}</div>}

            {!tables.length && !isEditing ? (
                <form onSubmit={handleAddTable} className="manage-table-form">
                    <div className="manage-table-form-group">
                        <label htmlFor="tableCount">Number of Tables</label>
                        <input
                            type="number"
                            id="tableCount"
                            value={tableCount}
                            onChange={(e) => setTableCount(e.target.value)}
                            className="manage-table-form-control"
                            placeholder="Enter number of tables"
                            min="1"
                            required
                        />
                        {error && <div className="text-danger">{error}</div>}
                    </div>
                    <button type="submit" className="manage-table-btn-primary">Add Tables</button>
                </form>
            ) : null}

            {tables.length > 0 && !isEditing && (
                <div className="manage-table-card">
                      <button
                        onClick={handleDeleteAllConfirmation}
                        className="manage-table-delete-all-btn"
                    >
                        Delete All
                    </button>
                    <div className="table-grid">
                        
                        {tables.map((table, index) => (
                            <div 
                                key={index} 
                                className={`table-item ${table.isAvailable ? 'available' : 'unavailable'}`}
                                onClick={() => handleToggleAvailability(table.tableNumber)}
                            >
                                <div className="table-number">Table {table.tableNumber}</div>
                                <div className="status">{table.isAvailable ? 'Available' : 'Unavailable'}</div>
                            </div>
                        ))}
                    </div>
                  
                </div>
            )}

            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Edit Table Count</h4>
                        <div className="modal-form">
                            <div className="modal-form-group">
                                <label htmlFor="editTableCount">Number of Tables</label>
                                <input
                                    type="number"
                                    id="editTableCount"
                                    value={tableCount}
                                    onChange={(e) => setTableCount(e.target.value)}
                                    className="manage-table-edit-form-control"
                                    placeholder="Enter new number of tables"
                                    min="1"
                                    required
                                />
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                        <div className="modal-buttons">
                            <button
                                type="button"
                                onClick={handleEditTable}
                                className="modal-edit-button"
                            >
                                Update Table
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="modal-cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteConfirmationOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Are you sure you want to delete all tables?</h4>
                        <div className="modal-buttons">
                            <button onClick={handleDeleteAll} className="modal-confirm-button">Yes</button>
                            <button onClick={handleCloseModal} className="modal-cancel-button">No</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ManageTable;
