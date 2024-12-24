import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = async (name, studentId, password, year) => {
    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        rollNo: studentId,
        password,
        name,
        year,
      });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Signup failed');
      throw new Error('Signup failed');
    }
  };

  const login = async (studentId, password) => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        rollNo: studentId,
        password,
      });
      const loggedInUser = {
        id: response.data.user.id,
        name: response.data.user.name,
        year: response.data.user.year,
        rollNo: response.data.user.rollNo,
        token: response.data.token,
      };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}