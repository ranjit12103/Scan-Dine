import React, { useEffect, useState } from "react";
import profilePic from "../../../../src/Images/avatar profile.jpg";
import './Styles/AdminProfileView.css'; 
import axios from "axios";
import { useLocation } from "react-router-dom";


const AdminProfileView = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [adminData, setAdminData] = useState(null);
  console.log("adminData",adminData)
  const adminId = searchParams.get("adminId");

  useEffect(() => {
    const fetchAdminData = async () => {
      console.log("Fetching Admin Data");
      try {
        const response = await axios.get(
          `http://localhost:8080/Admin/${adminId}`
        );
        setAdminData(response.data);
        console.log("Admin Data Fetched");
      } catch (error) {
        console.error("Error fetching Admin data:", error);
      }
    };

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

    return (
      <div className="admin-profile-container">
        <div className="row">
          <div className="col-lg-8">
            <h5 className="admin-profile-title">Admin Profile</h5>
          </div>
        </div>
        <div className="admin-profile-card-container">
          <div className="admin-profile-card">
            <div className="admin-profile-header">
              <img src={profilePic} alt="Profile" className="admin-profile-pic" />
              <h5 className="admin-profile-card-title">Scan And Dive</h5>
            </div>
            <p className="admin-profile-card-text"><strong>Email:</strong>  {adminData ? adminData.email : ""}</p>
            <p className="admin-profile-card-text"><strong>Contact No:</strong> {adminData ? adminData.contactNo : ""}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminProfileView;