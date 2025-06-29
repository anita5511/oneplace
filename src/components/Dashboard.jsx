import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import NewsWidget from './widgets/NewsWidget';
import WeatherWidget from './widgets/WeatherWidget';
import ServiceConnectionCard from './ServiceConnectionCard';
import CalendarWidget from './widgets/CalendarWidget';
import TasksWidget from './widgets/TasksWidget';
import GmailWidget from './widgets/GmailWidget';
import LinkedInWidget from './widgets/LinkedInWidget';
import TelegramWidget from './widgets/TelegramWidget';
import WhatsAppWidget from './widgets/WhatsAppWidget';
import PreferencesModal from './PreferencesModal';

function Dashboard() {
  const { user, getAuthHeaders } = useAuth();
  const [preferences, setPreferences] = useState({
    newsCategories: ['general'],
    location: 'New York',
    theme: 'light'
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [connectedServices, setConnectedServices] = useState({
    gmail: false,
    googleWorkspace: false,
    linkedin: false,
    telegram: false,
    whatsapp: false
  });

  useEffect(() => {
    fetchPreferences();
    loadConnectedServices();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/preferences', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const loadConnectedServices = () => {
    // Load connected services from localStorage
    const saved = localStorage.getItem('connectedServices');
    if (saved) {
      const services = JSON.parse(saved);
      setConnectedServices(services);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const response = await fetch('http://localhost:3001/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(newPreferences),
      });
      if (response.ok) {
        setPreferences(newPreferences);
        setShowPreferences(false);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleServiceConnection = (serviceName, isConnected) => {
    const newConnectedServices = { 
      ...connectedServices,
      [serviceName]: isConnected
    };
    
    setConnectedServices(newConnectedServices);
    localStorage.setItem('connectedServices', JSON.stringify(newConnectedServices));
  };

  // Reordered services: Gmail, LinkedIn, Telegram, WhatsApp, Calendar & Tasks
  const services = [
    {
      name: 'gmail',
      displayName: 'Gmail',
      description: 'Access your email messages',
      icon: '📧',
      color: 'bg-red-600',
      connectUrl: 'https://mail.google.com'
    },
    {
      name: 'linkedin',
      displayName: 'LinkedIn',
      description: 'Connect with your professional network',
      icon: '💼',
      color: 'bg-blue-700',
      connectUrl: 'https://linkedin.com'
    },
    {
      name: 'telegram',
      displayName: 'Telegram',
      description: 'Stay connected with secure messaging',
      icon: '✈️',
      color: 'bg-blue-500',
      connectUrl: 'https://web.telegram.org'
    },
    {
      name: 'whatsapp',
      displayName: 'WhatsApp',
      description: 'Message friends and family',
      icon: '💬',
      color: 'bg-green-500',
      connectUrl: 'https://web.whatsapp.com'
    },
    {
      name: 'googleWorkspace',
      displayName: 'Calendar & Tasks',
      description: 'Manage schedule and to-do lists',
      subServices: ['Calendar Events', 'Task Management'],
      icon: '📅',
      color: 'bg-indigo-600',
      connectUrl: 'https://calendar.google.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header user={user} onOpenPreferences={() => setShowPreferences(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message for Google Sign-in Users */}
        {(connectedServices.gmail && connectedServices.googleWorkspace) && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-green-800 font-medium">Google Services Connected!</h3>
                <p className="text-green-700 text-sm">Gmail, Calendar, and Tasks are now available in your dashboard.</p>
              </div>
            </div>
          </div>
        )}

        {/* Service Connection Cards - Reordered */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect Your Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service) => (
              <ServiceConnectionCard
                key={service.name}
                service={service}
                isConnected={connectedServices[service.name]}
                onConnectionChange={handleServiceConnection}
              />
            ))}
          </div>
        </div>

        {/* Dashboard Widgets - Reordered: Gmail, LinkedIn, Telegram, WhatsApp, Calendar & Tasks, Weather, Google News */}
        <div className="space-y-8">
          {/* Gmail Widget Section */}
          {connectedServices.gmail && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📧 Gmail</h3>
              <div className="max-w-2xl">
                <GmailWidget />
              </div>
            </div>
          )}

          {/* LinkedIn Widget Section */}
          {connectedServices.linkedin && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💼 LinkedIn</h3>
              <div className="max-w-2xl">
                <LinkedInWidget />
              </div>
            </div>
          )}

          {/* Telegram Widget Section */}
          {connectedServices.telegram && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">✈️ Telegram</h3>
              <div className="max-w-2xl">
                <TelegramWidget />
              </div>
            </div>
          )}

          {/* WhatsApp Widget Section */}
          {connectedServices.whatsapp && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 WhatsApp</h3>
              <div className="max-w-2xl">
                <WhatsAppWidget />
              </div>
            </div>
          )}

          {/* Calendar & Tasks Widget Section */}
          {connectedServices.googleWorkspace && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📅 Calendar & Tasks</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CalendarWidget />
                <TasksWidget />
              </div>
            </div>
          )}

          {/* Weather Widget Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🌤️ Weather</h3>
            <div className="max-w-md">
              <WeatherWidget location={preferences.location} />
            </div>
          </div>

          {/* Google News Widget Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📰 Google News</h3>
            <div className="max-w-4xl">
              <NewsWidget categories={preferences.newsCategories} />
            </div>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Gmail Quick Access */}
            {connectedServices.gmail && (
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white">
                  📧
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Gmail</h4>
                  <p className="text-sm text-gray-600">Access your emails</p>
                </div>
              </a>
            )}
            
            {/* LinkedIn Quick Access */}
            {connectedServices.linkedin && (
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                  💼
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">LinkedIn</h4>
                  <p className="text-sm text-gray-600">Professional network</p>
                </div>
              </a>
            )}

            {/* Telegram Quick Access */}
            {connectedServices.telegram && (
              <a
                href="https://web.telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  ✈️
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Telegram</h4>
                  <p className="text-sm text-gray-600">Secure messaging</p>
                </div>
              </a>
            )}

            {/* WhatsApp Quick Access */}
            {connectedServices.whatsapp && (
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                  💬
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">WhatsApp</h4>
                  <p className="text-sm text-gray-600">Message friends & family</p>
                </div>
              </a>
            )}
            
            {/* Calendar & Tasks Quick Access */}
            {connectedServices.googleWorkspace && (
              <>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                    📅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google Calendar</h4>
                    <p className="text-sm text-gray-600">Manage your schedule</p>
                  </div>
                </a>
                
                <a
                  href="https://tasks.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google Tasks</h4>
                    <p className="text-sm text-gray-600">Organize your to-dos</p>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
      </main>

      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onSave={updatePreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;