import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function Menu() {
  const { addItem } = useCart();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/item')
      .then(response => {
        console.log('Response data:', response.data); // Log the response data
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the menu items!', error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-5">Today's Menu</h1>

      <div className="mb-4">
        <h2 className="h4">Rice Items</h2>
        <div className="row g-4">
          {menuItems
            .filter((item) => item.category === 'Rice Items')
            .map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="h5 mb-0">{item.name}</h3>
                      <span className="badge bg-primary">₹{item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-muted small mb-3">{item.description}</p>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => addItem({ id: item._id, name: item.name, price: item.price })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="h4">Noodles</h2>
        <div className="row g-4">
          {menuItems
            .filter((item) => item.category === 'Noodles')
            .map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="h5 mb-0">{item.name}</h3>
                      <span className="badge bg-primary">₹{item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-muted small mb-3">{item.description}</p>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => addItem({ id: item._id, name: item.name, price: item.price })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="h4">Chat</h2>
        <div className="row g-4">
          {menuItems
            .filter((item) => item.category === 'Chat')
            .map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="h5 mb-0">{item.name}</h3>
                      <span className="badge bg-primary">₹{item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-muted small mb-3">{item.description}</p>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => addItem({ id: item._id, name: item.name, price: item.price })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;