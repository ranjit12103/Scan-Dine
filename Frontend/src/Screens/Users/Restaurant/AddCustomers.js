import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaCalendarAlt, FaMoneyBillWave, FaShoppingCart, FaPercentage } from "react-icons/fa";

export default function Addcustomers() {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [amountSpent, setAmountSpent] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [message, setMessage] = useState("");
  const [discountApplied, setDiscountApplied] = useState("");
  const [originalSpent, setOriginalSpent] = useState("");
  const [currentSpent, setCurrentSpent] = useState("");
  const restaurantId = localStorage.getItem("restaurantId");
  const [totalSpent, setTotalSpent] = useState("N/A");
const [lastVisit, setLastVisit] = useState("No Visits Yet");


  useEffect(() => {
    if (mobile.length === 10 && restaurantId) {
      axios.get(`http://localhost:8080/customerRoutes/${restaurantId}/${mobile}`)
        .then((res) => {
          console.log("API Response:", res.data); // Debugging
  
          if (res.data) {
            const lastVisit = res.data.visitDates.length > 0 
              ? new Date(res.data.visitDates[res.data.visitDates.length - 1]).toLocaleDateString("en-IN") 
              : "No Visits Yet";
  
            setCustomerData(res.data);
            setName(res.data.name);
            setTotalSpent(res.data.totalSpent ?? "N/A");
            setLastVisit(lastVisit); // Set the last visit date correctly
          } else {
            resetCustomerDetails();
          }
        })
        .catch(() => resetCustomerDetails());
    }
  }, [mobile, restaurantId]);
  
  const resetCustomerDetails = () => {
    setCustomerData(null);
    setName("");
    setTotalSpent("N/A");
    setLastVisit("No Visits Yet");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/customerRoutes/add", { 
      name, 
      mobile, 
      amountSpent, 
      restaurantId // Include restaurantId in the payload
    });
  
    setMessage(response.data.message);
    setCustomerData(response.data.customer);
    setDiscountApplied(response.data.discountApplied);
    setOriginalSpent(response.data.originalSpent);
    setCurrentSpent(response.data.currentSpent);
  
    // Reset form fields
    setMobile("");
    setName("");
    setAmountSpent("");
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px" }}>
      
      {/* Left Side - Form */}
      <div style={{ flex: 1, padding: "16px", maxWidth: "400px", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Add Customer Visit</h2>
        {message && <p style={{ backgroundColor: "#d4edda", color: "#155724", padding: "8px", marginBottom: "16px" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Mobile Number" style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginBottom: "8px" }} value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          <input type="text" placeholder="Customer Name" style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginBottom: "8px" }} value={name} onChange={(e) => setName(e.target.value)} required disabled={!!customerData} />
          <input type="number" placeholder="Amount Spent" style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginBottom: "8px" }} value={amountSpent} onChange={(e) => setAmountSpent(e.target.value)} required />
          <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px", width: "100%", borderRadius: "5px", border: "none", cursor: "pointer" }}>Submit</button>
        </form>
      </div>

      {/* Right Side - Customer Summary */}
      {customerData && (
        <div style={{ flex: 1, padding: "16px", maxWidth: "400px", backgroundColor: "#f9f9f9", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", color: "#333" }}>Customer Details</h3>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaUser style={{ marginRight: "8px", color: "#007bff" }} />
            <strong>Name:</strong> {customerData.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaPhone style={{ marginRight: "8px", color: "#28a745" }} />
            <strong>Mobile:</strong> {customerData.mobile}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaShoppingCart style={{ marginRight: "8px", color: "#ffc107" }} />
            <strong>Visits:</strong> {customerData.visits}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
  <FaCalendarAlt style={{ marginRight: "8px", color: "#6c757d" }} />
  <strong>Last Visit:</strong> {lastVisit}
</div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaMoneyBillWave style={{ marginRight: "8px", color: "#dc3545" }} />
            <strong>Original Spent:</strong> ₹{originalSpent}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaMoneyBillWave style={{ marginRight: "8px", color: "#28a745" }} />
            <strong>Current Spent (after discount):</strong> <span style={{ color: "red", fontWeight: "bold" }}>₹{currentSpent}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <FaPercentage style={{ marginRight: "8px", color: "#17a2b8" }} />
            <strong>{discountApplied}</strong>
          </div>
        </div>
      )}
    </div>
  );
}