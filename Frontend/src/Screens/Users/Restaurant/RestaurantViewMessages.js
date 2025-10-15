import React, { useState } from 'react';
import './Styles/RestaurantViewMessages.css'; 

// Sample data for messages
const messages = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    contactNo: '123-456-7890',
    description: 'Inquiry about menu item'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    contactNo: '987-654-3210',
    description: 'Request for reservation'
  },
  // Add more messages as needed
];

const RestaurantViewMessages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (index) => {
    // Handle delete logic here
    console.log(`Delete message at index ${index}`);
  };

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h5 className="RestaurantViewMessages-heading">Messages</h5>
      <div className="RestaurantViewMessages-search-container">
        <div className="RestaurantViewMessages-search-input-container">
          <span className="material-symbols-outlined RestaurantViewMessages-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="RestaurantViewMessages-search-input"
          />
        </div>
      </div>
      <div className="RestaurantViewMessages-table-container">
        <table className="RestaurantViewMessages-table">
          <thead>
            <tr>
              <th className="RestaurantViewMessages-th">Name</th>
              <th className="RestaurantViewMessages-th">Email</th>
              <th className="RestaurantViewMessages-th">Contact No</th>
              <th className="RestaurantViewMessages-th">Description</th>
              <th className="RestaurantViewMessages-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message, index) => (
              <tr key={index}>
                <td className="RestaurantViewMessages-td">{message.name}</td>
                <td className="RestaurantViewMessages-td">{message.email}</td>
                <td className="RestaurantViewMessages-td">{message.contactNo}</td>
                <td className="RestaurantViewMessages-td">{message.description}</td>
                <td className="RestaurantViewMessages-td">
                  <button
                    className="RestaurantViewMessages-action-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantViewMessages;
