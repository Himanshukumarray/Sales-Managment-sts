import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails, updateOrderStatus } from '../api/OrderApi';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatus(id, newStatus);
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-4 text-center">Order not found</div>;
  }

  return (
    <div className="order-details p-4 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigate('/orders')} 
          className="text-blue-600"
        >
          &larr; Back to Orders
        </button>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h1 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h1>
        <div className="text-sm text-gray-600">
          <p>Placed on {formatDate(order.orderDate)}</p>
          {order.expectedDelivery && (
            <p>Expected delivery: {formatDate(order.expectedDelivery)}</p>
          )}
        </div>
      </div>

      {/* Supplier Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">Supplier</h2>
        <div className="text-sm">
          <p className="font-medium">{order.supplierName}</p>
          <p>{order.supplierEmail}</p>
          <p>{order.supplierPhone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="font-semibold mb-3">Order Items</h2>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {formatCurrency(item.unitPrice)}
                </p>
              </div>
              <p className="font-medium">{formatCurrency(item.quantity * item.unitPrice)}</p>
            </li>
          ))}
        </ul>
        
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p>{formatCurrency(order.subtotal)}</p>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <p>Tax</p>
            <p>{formatCurrency(order.tax)}</p>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <p>Shipping</p>
            <p>{formatCurrency(order.shipping)}</p>
          </div>
          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
            <p>Total</p>
            <p>{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-3">Actions</h2>
          <div className="flex flex-wrap gap-2">
            {order.status === 'pending' && (
              <>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-400"
                  onClick={() => handleStatusChange('shipped')}
                  disabled={updating}
                >
                  Mark as Shipped
                </button>
                <button 
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md disabled:opacity-50"
                  onClick={() => handleStatusChange('cancelled')}
                  disabled={updating}
                >
                  Cancel Order
                </button>
              </>
            )}
            {order.status === 'shipped' && (
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-green-400"
                onClick={() => handleStatusChange('delivered')}
                disabled={updating}
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-2">Notes</h2>
          <p className="text-sm">{order.notes}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;