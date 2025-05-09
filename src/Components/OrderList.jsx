import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/OrderApi';

const OrderList = ({ onSelectOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return <div className="p-4 text-center">Loading orders...</div>;
  }

  return (
    <div className="order-list">
      <div className="filter-bar p-2 sticky top-0 bg-white z-10 overflow-x-auto">
        <div className="flex space-x-2">
          {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center p-4 text-gray-500">No orders found</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <li 
              key={order.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectOrder(order.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">#{order.orderNumber}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.supplierName}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                  <p className="text-xs text-gray-500">{order.items} items</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;