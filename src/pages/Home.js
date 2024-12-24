import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Clock, ClipboardCheck } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4">
            Campus Dining Made Simple
          </h1>
          <p className="lead mb-4">
            Order your meals ahead of time, skip the lines, and enjoy your food when it's most convenient for you.
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/menu')}
          >
            View Today's Menu
          </button>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80"
            alt="Delicious meal"
            className="img-fluid rounded-3 shadow-lg"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <UtensilsCrossed size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Fresh Daily Menu</h3>
              <p className="text-muted mb-0">
                Choose from a variety of freshly prepared meals updated daily
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <Clock size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Schedule Ahead</h3>
              <p className="text-muted mb-0">
                Plan your meals and pick them up at your convenience
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <ClipboardCheck size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Real-time Status</h3>
              <p className="text-muted mb-0">
                Track your order status and get notified when it's ready
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
