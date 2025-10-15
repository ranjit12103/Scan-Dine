import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/ViewCategory.css'; 

const ViewCategory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/RestaurantCategory/getFoodCategory/${restaurantId}`);
        setCategoriesList(response.data.foodCategories || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [restaurantId]);

  const handleDelete = (index) => {
    setCategoryToEdit(index);
    setModalVisible('delete');
  };

  const handleEdit = (index) => {
    setCategoryToEdit(index);
    setModalVisible('edit');
  };

  const handleConfirmDelete = async () => {
    try {
      const id = categoriesList[categoryToEdit]._id;
      await axios.delete(`http://localhost:8080/RestaurantCategory/delete/${id}`);
      setCategoriesList(prevCategories => 
        prevCategories.filter((_, i) => i !== categoryToEdit)
      );
      toast.success('Category deleted successfully');
      setModalVisible('');
      setCategoryToEdit(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    }
  };

  const handleSaveEdit = async (newName) => {
    if (!newName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const id = categoriesList[categoryToEdit]._id;
      await axios.put(`http://localhost:8080/RestaurantCategory/edit/${id}`, { category: newName });
      setCategoriesList(prevCategories => 
        prevCategories.map((category, i) => 
          i === categoryToEdit ? { ...category, category: newName } : category
        )
      );
      toast.success('Category updated successfully');
      setModalVisible('');
      setCategoryToEdit(null);
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category');
    }
  };

  const handleCloseModal = () => {
    setModalVisible('');
    setCategoryToEdit(null);
  };

  const filteredCategories = categoriesList.filter((category) => {
    const firstWord = (category.category || '').split(' ')[0].toLowerCase(); // Extract the first word
    const searchLower = searchTerm.toLowerCase(); // Convert search term to lowercase
    return firstWord.startsWith(searchLower); // Check if the first word starts with the search term
  });

  return (
    <div>
      <h5 className="ViewCategory-heading">Categories</h5>
      <div className="ViewCategory-search-container">
        <div className="ViewCategory-search-input-container">
          <span className="material-symbols-outlined ViewCategory-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ViewCategory-search-input"
          />
        </div>
      </div>
      <div className="ViewCategory-table-container">
        <table className="ViewCategory-table">
          <thead>
            <tr>
              <th className="ViewCategory-th">Category Name</th>
              <th className="ViewCategory-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="2">Loading...</td></tr>
            ) : filteredCategories.length === 0 ? (
              <tr><td colSpan="2" className='ViewCategory-td AdminViewMessages-no-records text-center'>No categories found</td></tr>
            ) : (
              filteredCategories.map((category, index) => (
                <tr key={category._id}>
                  <td className="ViewCategory-td">{category.category || 'Unnamed Category'}</td>
                  <td className="ViewCategory-td">
                    <button
                      className="ViewCategory-action-button ViewCategory-edit-button"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="ViewCategory-action-button ViewCategory-delete-button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      {modalVisible === 'edit' && (
        <EditCategoryModal
          currentName={categoriesList[categoryToEdit]?.category || ''}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
      {modalVisible === 'delete' && (
        <DeleteConfirmationModal
          categoryName={categoriesList[categoryToEdit]?.category || 'Unnamed Category'}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

const EditCategoryModal = ({ currentName, onClose, onSave }) => {
  const [newName, setNewName] = useState(currentName);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = () => {
    if (!newName.trim()) {
      setValidationError('Category name cannot be empty');
      return;
    }
    setValidationError('');
    onSave(newName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Edit Category</h4>
        <div className="modal-form">
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            placeholder="Category Name"
          />
          {validationError && <div className="text-danger">{validationError}</div>}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave} className="modal-edit-button">Save</button>
          <button onClick={onClose} className="modal-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ categoryName, onClose, onConfirm }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Are you sure you want to delete "{categoryName}"?</h4>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="modal-confirm-button">Yes</button>
        <button onClick={onClose} className="modal-cancel-button">No</button>
      </div>
    </div>
  </div>
);

export default ViewCategory;
