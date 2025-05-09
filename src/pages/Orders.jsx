import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderList from '../Components/OrderList'; // Adjust the import path as necessary

const Orders = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };


  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold">Orders</h1>
      </div>
      
      <OrderList 
        key={refreshKey}
        onSelectOrder={handleSelectOrder} 
      />
    </div>
  );
};

export default Orders;