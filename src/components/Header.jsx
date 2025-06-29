import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, LogOut, User, UserPlus } from 'lucide-react';

function Header({ user, onOpenPreferences }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleSwitchAccount = () => {
    // Navigate to login page without logging out (to allow switching accounts)
    window.location.href = '/login';
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Personal Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenPreferences}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              title="Settings"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              )}
              
              {/* Switch Account Button */}
              <button
                onClick={handleSwitchAccount}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200"
                title="Switch Account"
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-sm font-medium">Switch</span>
              </button>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;