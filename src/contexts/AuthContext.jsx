import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (googleToken) => {
    try {
      const response = await fetch('http://localhost:3001/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // IMPORTANT: Auto-connect Gmail and Google Workspace when logging in with Google
        const connectedServices = {
          gmail: true,           // Gmail should be connected
          googleWorkspace: true, // Calendar & Tasks should be connected
          linkedin: false,
          telegram: false,
          whatsapp: false
        };
        localStorage.setItem('connectedServices', JSON.stringify(connectedServices));
        
        // Force a page refresh to ensure the dashboard updates with connected services
        setTimeout(() => {
          window.location.reload();
        }, 100);
        
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const loginWithEmail = async (email, password) => {
    try {
      // Mock email/password login for demo
      // In a real app, you'd call your backend API
      const mockUser = {
        name: email.split('@')[0],
        email: email,
        picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Email login doesn't auto-connect any services
      const connectedServices = {
        gmail: false,
        googleWorkspace: false,
        linkedin: false,
        telegram: false,
        whatsapp: false
      };
      localStorage.setItem('connectedServices', JSON.stringify(connectedServices));
      
      return true;
    } catch (error) {
      console.error('Email login error:', error);
      return false;
    }
  };

  const signUp = async (email, password) => {
    try {
      // Mock sign up for demo
      // In a real app, you'd call your backend API
      const mockUser = {
        name: email.split('@')[0],
        email: email,
        picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Sign up doesn't auto-connect any services
      const connectedServices = {
        gmail: false,
        googleWorkspace: false,
        linkedin: false,
        telegram: false,
        whatsapp: false
      };
      localStorage.setItem('connectedServices', JSON.stringify(connectedServices));
      
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('connectedServices');
    setUser(null);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const value = {
    user,
    login,
    loginWithEmail,
    signUp,
    logout,
    getAuthHeaders,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}