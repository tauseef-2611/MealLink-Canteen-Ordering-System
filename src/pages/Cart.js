import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import {toast} from 'react-hot-toast';

function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user details are stored in localStorage

    // if(user.lastOrderId) {
    //   toast.error('You already have an active order. Please wait for it to be delivered.');
    //   return;
    // }
    const cartItems = items.map(item => ({
      item: item.id,
      quantity: item.quantity
    }));

    try {
      const response = await axios.post('http://localhost:5000/order/place', {
        user: user.id, // Send user ID as per the schema
        rollNo: user.rollNo, // Send user roll number as per the schema
        year:user.year,
        items: cartItems,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Assuming the token is stored in the user object
        },
      });

      if (response.status === 201) {
        clearCart();
        toast.success('Order placed successfully!');
          // Add order ID to orders array in user object in local storage
          const updatedUser = { 
            ...user, 
            orders: [...(user.orders || []), response.data._id] 
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
                navigate('/order-status');
      } else {

        toast.error(response.data.message);
        // console.error('Failed to place order:', response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error('Error placing order:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-4 fw-bold mb-4">Your Cart is Empty</h1>
        <p className="lead mb-4">Add some delicious meals to your cart!</p>
        <button 
          onClick={() => navigate('/menu')} 
          className="btn btn-primary btn-lg"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-5">Your Cart</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              {items.map((item) => (
                <div key={item.id} className="d-flex align-items-center py-3 border-bottom">
                  <div className="flex-grow-1">
                    <h3 className="h6 mb-0">{item.name}</h3>
                    <p className="text-muted small mb-0">₹{item.price.toFixed(2)} each</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm me-3" style={{ width: '120px' }}>
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">Order Summary</h3>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Service Fee</span>
                <span>₹0.00</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fw-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;