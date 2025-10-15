import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewCustomers = () => {
  const [customersList, setCustomersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!restaurantId) {
        toast.error("Restaurant ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/customerRoutes/getAll/${restaurantId}`);
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setCustomersList(response.data);
        } else if (Array.isArray(response.data.customers)) {
          setCustomersList(response.data.customers);
        } else {
          console.error("Unexpected API response format:", response.data);
          toast.error("Unexpected API response format");
          setCustomersList([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Error fetching customers");
        setCustomersList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [restaurantId]);

  const filteredCustomers = customersList.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>View Customers</h2>

      {/* Search Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#333", color: "white" }}>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Name</th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Mobile Number</th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Visits Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} style={{ backgroundColor: "white" }}>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.name}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.mobile}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.visits}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", color: "#888", padding: "10px" }}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewCustomers;
