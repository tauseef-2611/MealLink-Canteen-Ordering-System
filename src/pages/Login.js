import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(studentId, password);
        toast.success('Login successful!');
      } else {
        await signup(name, studentId, password, year);
        toast.success('Signup successful!');
      }
      navigate('/');
    } catch (error) {
      toast.error('Authentication failed!');
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  {isLogin ? (
                    <KeyRound size={32} className="text-primary mb-2" />
                  ) : (
                    <UserPlus size={32} className="text-primary mb-2" />
                  )}
                  <h1 className="h4 mb-2">Welcome to MealLink</h1>
                  <p className="text-muted small">
                    {isLogin ? 'Sign in to your account' : 'Create a new account'}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input
                          type="number"
                          className="form-control"
                          id="year"
                          placeholder="Enter your year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="mb-3">
                    <label htmlFor="studentId" className="form-label">Student ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="studentId"
                      placeholder="Enter your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;