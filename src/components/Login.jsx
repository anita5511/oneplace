import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const { user, login, loginWithEmail, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(true);

  // Check if user is already logged in and show option to continue
  const [showContinueOption, setShowContinueOption] = useState(false);

  useEffect(() => {
    if (user) {
      setShowContinueOption(true);
    }
  }, [user]);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      setGoogleLoading(true);
      
      // Check if Google OAuth is properly configured
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      console.log('🔍 Initializing Google Sign-In...');
      console.log('📋 Client ID:', clientId);
      
      if (!clientId || clientId === "demo-client-id" || clientId === "undefined" || clientId.includes('your_')) {
        setGoogleError("❌ Google OAuth Client ID not configured. Please follow the setup guide.");
        setGoogleLoading(false);
        return;
      }

      if (window.google && window.google.accounts) {
        try {
          console.log('🚀 Initializing Google OAuth...');
          
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Clear any existing button content
          const buttonContainer = document.getElementById('google-signin-button');
          if (buttonContainer) {
            buttonContainer.innerHTML = '';
            
            window.google.accounts.id.renderButton(
              buttonContainer,
              {
                theme: 'outline',
                size: 'large',
                width: '280',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left'
              }
            );
            
            console.log('✅ Google Sign-In button rendered successfully');
            setGoogleReady(true);
            setGoogleError('');
          }
        } catch (err) {
          console.error('❌ Google OAuth initialization error:', err);
          setGoogleError(`Failed to initialize Google Sign-In: ${err.message}`);
        }
      } else {
        console.error('❌ Google Sign-In library not loaded');
        setGoogleError("Google Sign-In library not loaded. Please refresh the page.");
      }
      
      setGoogleLoading(false);
    };

    // Wait for Google library to load
    const checkGoogleLibrary = (attempts = 0) => {
      if (window.google && window.google.accounts) {
        console.log('✅ Google library loaded');
        initializeGoogleSignIn();
      } else if (attempts < 50) { // Try for 5 seconds
        setTimeout(() => checkGoogleLibrary(attempts + 1), 100);
      } else {
        console.error('❌ Google library failed to load after 5 seconds');
        setGoogleError("Google Sign-In library failed to load. Please refresh the page.");
        setGoogleLoading(false);
      }
    };

    // Start checking for Google library
    checkGoogleLibrary();
  }, []);

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError('');
    setGoogleError('');
    
    try {
      console.log('📨 Google response received');
      const success = await login(response.credential);
      if (success) {
        console.log('✅ Google login successful');
        navigate('/dashboard');
      } else {
        console.error('❌ Google login failed');
        setError('Google sign-in failed. Please check your Google Cloud Console configuration.');
      }
    } catch (err) {
      console.error('❌ Google sign-in error:', err);
      setError('Google sign-in failed. Please try again or check your configuration.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      let success;
      if (isSignUp) {
        success = await signUp(formData.email, formData.password);
      } else {
        success = await loginWithEmail(formData.email, formData.password);
      }

      if (success) {
        navigate('/dashboard');
      } else {
        setError(isSignUp ? 'Sign up failed. Please try again.' : 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  const refreshGoogleSignIn = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* App Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Personal Dashboard</h1>
          <p className="text-gray-600 mt-2">Your personalized hub for productivity</p>
        </div>

        {/* Google OAuth Setup Guide */}
        {googleError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Google Sign-In Configuration Issue</h3>
                <p className="text-sm text-red-700 mt-1">{googleError}</p>
                <div className="mt-3 p-3 bg-red-100 rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">Quick Fix:</p>
                  <ol className="text-xs text-red-700 space-y-1 list-decimal list-inside">
                    <li>Check the <code className="bg-red-200 px-1 rounded">GOOGLE_OAUTH_SETUP.md</code> file</li>
                    <li>Create a new Google Cloud project</li>
                    <li>Get your OAuth credentials</li>
                    <li>Update your <code className="bg-red-200 px-1 rounded">.env</code> file</li>
                    <li>Restart the development server</li>
                  </ol>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={refreshGoogleSignIn}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Retry</span>
                  </button>
                  <a
                    href="https://console.cloud.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Google Console
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue with Current Account Option */}
        {showContinueOption && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-900">Welcome back, {user?.name}!</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleContinueToDashboard}
                className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                <span>Continue to Dashboard</span>
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-600 text-center">Or sign in with a different account below</p>
            </div>
          </div>
        )}

        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login/Signup Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  !isSignUp
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading && !isSignUp ? 'Logging in...' : 'Log In'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', confirmPassword: '' });
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  isSignUp
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">— or sign in with —</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex space-x-3">
            <div className="flex-1 flex justify-center">
              {googleLoading ? (
                <div className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-500 text-center bg-gray-50 flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading Google Sign-In...</span>
                </div>
              ) : googleReady ? (
                <div id="google-signin-button"></div>
              ) : (
                <div className="w-full py-3 px-4 border border-red-300 rounded-lg text-red-600 text-center bg-red-50">
                  Google Sign-In Unavailable
                </div>
              )}
            </div>
            <button
              type="button"
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              onClick={() => alert('Facebook login coming soon!')}
            >
              Facebook
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;