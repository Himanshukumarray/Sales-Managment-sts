import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import CreateOffer from './Components/CreateOffer';
import MyOffers from './Components/Myoffer';
import CustomCardComponent from './CustomCardComponent';
import SalesInsightPage from './SalesInsightPage';
import Bill from './Bill';
import NavBar from './Components/NavBar';
import OrderDetails from './Components/OrderDetails';

import SupplierForm from './Components/SupplierForm';
import Dashboard from './pages/Dashboard';  
import Orders from './pages/Orders';
 import Suppliers from './pages/Suppliers';
 import InventoryManagement from './InventoryManagment';
 

// import SupplierManager from './Components/SupplierManager';

function App() {
  return (
    <Router>
      <div className="pb-16"> {/* Add padding to account for the fixed bottom navbar */}
        <NavBar />
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/create-offer" element={<CreateOffer />} />
          <Route path="/my-offers" element={<MyOffers />} />
          <Route path="/insight" element={<SalesInsightPage />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/customCard" element={<CustomCardComponent />} />
          <Route path="/orders/:id" element={<OrderDetails/>} />
          
          <Route path="/suppliers" element={<Suppliers/>} />
          <Route path="/supplier/add" element={<SupplierForm/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;