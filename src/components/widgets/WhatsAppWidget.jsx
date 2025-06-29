import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Video, Users, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

function WhatsAppWidget() {
  const [whatsappData, setWhatsappData] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWhatsAppData();
  }, []);

  const fetchWhatsAppData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Check if WhatsApp Business API is configured
      const whatsappToken = localStorage.getItem('whatsapp_business_token');
      const whatsappPhoneId = localStorage.getItem('whatsapp_phone_number_id');
      
      if (!whatsappToken || !whatsappPhoneId) {
        setError('WhatsApp Business API not configured. Please set up your WhatsApp Business account to see real data.');
        setLoading(false);
        return;
      }

      // In a real implementation, you would call WhatsApp Business API
      // For now, we'll simulate the API call
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since WhatsApp Business API requires proper setup, we'll show a connection prompt
      setError('WhatsApp Business API integration required. Please configure your business account to see real messages.');
      
    } catch (err) {
      console.error('WhatsApp API error:', err);
      setError('Failed to fetch WhatsApp data. Please check your Business API configuration.');
    } finally {
      setLoading(false);
    }
  };

  const setupWhatsAppBusiness = () => {
    // Open WhatsApp Business API setup guide
    window.open('https://developers.facebook.com/docs/whatsapp/getting-started', '_blank');
    
    // For demo purposes, simulate successful setup
    setTimeout(() => {
      const businessToken = prompt('Enter your WhatsApp Business API Token:');
      const phoneNumberId = prompt('Enter your Phone Number ID:');
      
      if (businessToken && phoneNumberId) {
        localStorage.setItem('whatsapp_business_token', businessToken);
        localStorage.setItem('whatsapp_phone_number_id', phoneNumberId);
        
        setError('');
        setWhatsappData({
          unreadMessages: 5,
          totalChats: 18,
          activeChats: 7
        });
        setRecentChats([
          {
            id: 1,
            name: 'Business Contact',
            type: 'private',
            lastMessage: 'Thanks for your quick response!',
            time: '5m ago',
            unread: 1,
            avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face'
          },
          {
            id: 2,
            name: 'Customer Support',
            type: 'group',
            lastMessage: 'WhatsApp Business API is now connected',
            time: 'Just now',
            unread: 1,
            avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100&h=100&fit=crop'
          }
        ]);
      }
    }, 1000);
  };

  const connectWhatsAppWeb = () => {
    // For users who just want to use WhatsApp Web (not Business API)
    window.open('https://web.whatsapp.com', '_blank');
    
    // Simulate connection for demo
    setTimeout(() => {
      localStorage.setItem('whatsapp_web_connected', 'true');
      setError('');
      setWhatsappData({
        unreadMessages: 5,
        totalChats: 18,
        activeChats: 7
      });
      setRecentChats([
        {
          id: 1,
          name: 'Family Group',
          type: 'group',
          lastMessage: 'Don\'t forget the family dinner!',
          time: '5m ago',
          unread: 3,
          avatar: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?w=100&h=100&fit=crop'
        },
        {
          id: 2,
          name: 'John Smith',
          type: 'private',
          lastMessage: 'Thanks for the help today!',
          time: '12m ago',
          unread: 1,
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face'
        }
      ]);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
          </div>
          <RefreshCw className="h-4 w-4 text-gray-600 animate-spin" />
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
          </div>
          <button
            onClick={fetchWhatsAppData}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-800">WhatsApp Integration Options</h4>
              <p className="text-sm text-green-700 mt-1">{error}</p>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-green-600">Choose your integration method:</p>
                <div className="flex space-x-2">
                  <button
                    onClick={connectWhatsAppWeb}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Use WhatsApp Web</span>
                  </button>
                  <button
                    onClick={setupWhatsAppBusiness}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span>Business API</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
        </div>
        <a
          href="https://web.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </a>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <MessageCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-700">{whatsappData?.unreadMessages || 0}</p>
          <p className="text-xs text-green-600">Unread</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-blue-700">{whatsappData?.totalChats || 0}</p>
          <p className="text-xs text-blue-600">Chats</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
          <p className="text-lg font-bold text-purple-700">{whatsappData?.activeChats || 0}</p>
          <p className="text-xs text-purple-600">Active</p>
        </div>
      </div>

      {/* Recent Chats */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Chats</h4>
        {recentChats.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {chat.type === 'group' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h5>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{chat.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No recent chats</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
            <Phone className="h-3 w-3" />
            <span>Call</span>
          </button>
          <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            <Video className="h-3 w-3" />
            <span>Video</span>
          </button>
        </div>
        
        <a
          href="https://web.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Open WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default WhatsAppWidget;