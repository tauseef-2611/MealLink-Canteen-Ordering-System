import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      axios.get(`http://localhost:5000/order/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => {
          if(response.data.length === 0) {
            toast.error('No active orders found.');
            setLoading(false);
            return;
          }
          setOrders(response.data);
          setLoading(false);
        })
        .catch(error => {
          toast.error('Failed to fetch orders.');
          console.error('Error fetching orders:', error);
          setLoading(false);
        });

    };

    fetchOrders();
  }, []);

  const renderStatusTracker = (status) => {
    const steps = [
      { label: 'Pending', icon: <Clock size={24} />, active: status === 'pending' },
      { label: 'Ready', icon: <CheckCircle size={24} />, active: status === 'ready' },
      { label: 'Picked Up', icon: <Package size={24} />, active: status === 'pickedup' },
    ];

    return (
      <div className="d-flex justify-content-between align-items-center my-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center" style={{ width: '33%' }}>
            <div
              className={`rounded-circle p-2 ${
                step.active ? 'bg-primary text-white' : 'bg-light text-secondary'
              }`}
              style={{
                width: '50px',
                height: '50px',
                margin: '0 auto',
                lineHeight: '50px',
              }}
            >
              {step.icon}
            </div>
            <p
              className={`mt-2 fw-bold ${
                step.active ? 'text-primary' : 'text-muted'
              }`}
            >
              {step.label}
            </p>
            {index < steps.length - 1 && (
              <div
                className={`progress ${index === 0 ? 'mx-4' : ''}`}
                style={{
                  height: '4px',
                  backgroundColor: step.active ? '#0d6efd' : '#dee2e6',
                  marginTop: '16px',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-4 fw-bold mb-4">No Active Orders</h1>
        <p className="lead mb-4">You currently have no active orders.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {orders.map((order, index) => (
        <div key={index} className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="badge bg-primary">Order #{order.orderNumber}</span>
                </div>

                <div className="text-center mb-4">
                  <h1 className="h3 mb-2">Order #{order.orderNumber}</h1>
                  <p className="text-muted mb-0">Total Price: ₹{order.totalPrice.toFixed(2)}</p>
                </div>

                {renderStatusTracker(order.status)}

                <div className="mt-4">
                  <h3 className="h5 mb-3">Order Details</h3>
                  {order.items.map((orderItem, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <img
                        src={orderItem.item.imageUrl}
                        alt={orderItem.item.name}
                        className="img-thumbnail"
                        style={{ width: '60px', height: '60px' }}
                      />
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">{orderItem.item.name}</h5>
                        <p className="text-muted mb-0">
                          x{orderItem.quantity} @ ₹{orderItem.item.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="mb-0">
                          ₹{(orderItem.item.price * orderItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h3 className="h5 mb-3">Pickup Location</h3>
                  <p className="mb-1">Student Center</p>
                  <p className="mb-1">Building A, Floor 2</p>
                  <p className="mb-0">Counter #3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStatus;
