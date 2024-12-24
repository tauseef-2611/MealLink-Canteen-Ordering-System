import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
      
      {/* Stats Row */}
      <div className="row g-4 mb-5">
        
        {/* Total Orders Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 bg-primary text-white shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Total Orders</h6>
                  <h2 className="mb-0 mt-2">156</h2>
                </div>
                <ShoppingBag size={32} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Users Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 bg-success text-white shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Active Users</h6>
                  <h2 className="mb-0 mt-2">42</h2>
                </div>
                <Users size={32} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Today's Revenue Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 bg-info text-white shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Today's Revenue</h6>
                  <h2 className="mb-0 mt-2">$1,254</h2>
                </div>
                <DollarSign size={32} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Growth Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 bg-warning text-white shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Growth</h6>
                  <h2 className="mb-0 mt-2">+12.5%</h2>
                </div>
                <TrendingUp size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Popular Items */}
      <div className="row g-4">
        
        {/* Recent Orders */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 mb-4">Recent Orders</h3>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Student</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-123</td>
                      <td>John Doe</td>
                      <td>2 items</td>
                      <td><span className="badge bg-warning">Preparing</span></td>
                      <td>$15.99</td>
                    </tr>
                    <tr>
                      <td>#ORD-124</td>
                      <td>Jane Smith</td>
                      <td>1 item</td>
                      <td><span className="badge bg-success">Ready</span></td>
                      <td>$8.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Items */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 mb-4">Popular Items</h3>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Classic Burger</span>
                <span className="badge bg-primary">64 orders</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Caesar Salad</span>
                <span className="badge bg-primary">42 orders</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Margherita Pizza</span>
                <span className="badge bg-primary">38 orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
