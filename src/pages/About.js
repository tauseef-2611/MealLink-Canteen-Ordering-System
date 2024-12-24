import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

function About() {
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4">About MealLink</h1>
          <p className="lead mb-4">
            MealLink is your campus dining solution and also part of cafeterias, designed to make meal ordering simple and efficient for students and staff.
          </p>
          <p className="text-muted mb-4">
            Our platform connects you directly with campus dining services, allowing you to browse menus, place orders, and pick up your meals without the wait. We're committed to making your dining experience as convenient as possible.
          </p>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://images.unsplash.com/photo-1448131063153-f1e240f98a72?auto=format&fit=crop&q=80"
            alt="Campus dining hall"
            className="img-fluid rounded-3 shadow-lg"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <MapPin size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Location</h3>
              <p className="text-muted mb-0">
                Student Center<br />
                123 Campus Drive<br />
                Building A, Floor 2
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <Clock size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Hours</h3>
              <p className="text-muted mb-0">
                Monday - Saturday<br />
                7:00 AM - 8:00 PM<br />
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <Phone size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Contact</h3>
              <p className="text-muted mb-0">
                Main Line: (555) 123-4567<br />
                Support: (555) 123-4568<br />
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <Mail size={32} className="text-primary mb-3" />
              <h3 className="h5 mb-3">Email</h3>
              <p className="text-muted mb-0">
                General: info@meallink.edu<br />
                Support: help@meallink.edu<br />
                Feedback: feedback@meallink.edu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
