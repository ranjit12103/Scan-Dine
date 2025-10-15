import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Screens/Landingpage/HomePage";
import Login from "./Screens/Accounts/Login";
import SplashScreen from "./Components/SplashScreen";
import AdminDashboard from "./Screens/Users/Admin/AdminDashboard";
import RestaurantDashboard from "./Screens/Users/Restaurant/RestaurantDashboard";
import MenuCard from "./Screens/Users/Customer/MenuCard";
import ViewQRCODE from "./Screens/Users/Restaurant/ViewQRCODE";
import FoodItems from "./Screens/Users/Restaurant/FoodItems";
import QRCodeDisplay from "./Screens/Users/Restaurant/QRCodeDisplay";


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SplashScreen" element={<SplashScreen />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />


          <Route path="/RestaurantDashboard" element={<RestaurantDashboard />} />
   
          <Route path="/MenuCard" element={<MenuCard />} />
          <Route path="/viewQRCode" element={<ViewQRCODE />} />
          <Route path="/FoodItems/:restaurantId" element={<FoodItems />} />
          <Route path="/QRCodeDisplay" element={<QRCodeDisplay  />} />




        </Routes>
      </div>
    </Router>
  );
}

export default App;


