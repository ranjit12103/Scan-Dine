import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Users/Admin/Styles/AdminViewMessages.css';

const AdminViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch messages from the API when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Contact/GetAll');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/Contact/DeleteContact/${id}`);
      // Remove the deleted message from the local state
      setMessages(messages.filter(message => message._id !== id));
      toast.success('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Error deleting message.');
    }
  };

  // Filter messages based on an exact or partial match to the first word of the name
  const filteredMessages = messages.filter((message) => {
    const firstWord = message.name.split(' ')[0].toLowerCase(); // Extract the first word
    const searchLower = searchTerm.toLowerCase(); // Convert search term to lowercase
    return firstWord.startsWith(searchLower); // Check if the first word starts with the search term
  });

  return (
    <div>
      <h5 className="AdminViewMessages-heading">Messages</h5>
      <div className="AdminViewMessages-search-container">
        <div className="AdminViewMessages-search-input-container">
          <span className="material-symbols-outlined AdminViewMessages-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search by first name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="AdminViewMessages-search-input"
          />
        </div>
      </div>
      <div className="AdminViewMessages-table-container">
        <table className="AdminViewMessages-table">
          <thead>
            <tr>
              <th className="AdminViewMessages-th">Name</th>
              <th className="AdminViewMessages-th">Email</th>
              <th className="AdminViewMessages-th">Contact No</th>
              <th className="AdminViewMessages-th">Description</th>
              <th className="AdminViewMessages-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr key={message._id}>
                  <td className="AdminViewMessages-td">{message.name}</td>
                  <td className="AdminViewMessages-td">{message.email}</td>
                  <td className="AdminViewMessages-td">{message.contactNo}</td>
                  <td className="AdminViewMessages-td">{message.description}</td>
                  <td className="AdminViewMessages-td">
                    <button
                      className="AdminViewMessages-action-button"
                      onClick={() => handleDelete(message._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="AdminViewMessages-td AdminViewMessages-no-records">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminViewMessages;
