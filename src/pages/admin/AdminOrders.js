import React, { useState } from 'react';
import { Bell, Check, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-123',
      studentName: 'John Doe',
      items: [
        { name: 'Aloo Tikki', quantity: 1 },
        { name: 'Samosa', quantity: 1 }
      ],
      status: 'preparing',
      total: 55,
      timestamp: '2024-03-15T10:30:00'
    },
    {
      id: 'ORD-124',
      studentName: 'Jane Smith',
      items: [
        { name: 'PaniPuri', quantity: 1 }
      ],
      status: 'pending',
      total: 50,
      timestamp: '2024-03-15T10:35:00'
    }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        if (newStatus === 'ready') {
          toast.success(`Order ${orderId} is ready! Notification sent to student.`);
        }
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-secondary';
      case 'preparing': return 'bg-warning';
      case 'ready': return 'bg-success';
      case 'completed': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertTriangle size={16} />;
      case 'preparing': return <Clock size={16} />;
      case 'ready': return <Bell size={16} />;
      case 'completed': return <Check size={16} />;
      default: return null;
    }
  };

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-4">Order Management</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 bg-primary text-white shadow">
            <div className="card-body p-4">
              <h6 className="mb-2">Pending Orders</h6>
              <h2 className="mb-0">3</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-warning text-white shadow">
            <div className="card-body p-4">
              <h6 className="mb-2">Preparing</h6>
              <h2 className="mb-0">2</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-success text-white shadow">
            <div className="card-body p-4">
              <h6 className="mb-2">Ready for Pickup</h6>
              <h2 className="mb-0">1</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-info text-white shadow">
            <div className="card-body p-4">
              <h6 className="mb-2">Completed Today</h6>
              <h2 className="mb-0">15</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Student</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.studentName}</td>
                    <td>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ms-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        {order.status === 'pending' && (
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                          >
                            Start Preparing
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            Complete Order
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
