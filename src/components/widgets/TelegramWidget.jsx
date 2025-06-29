import React, { useState, useEffect } from 'react';
import { Send, Users, MessageCircle, Phone, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

function TelegramWidget() {
  const [telegramData, setTelegramData] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTelegramData();
  }, []);

  const fetchTelegramData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Check if Telegram is properly connected
      const telegramToken = localStorage.getItem('telegram_bot_token');
      const telegramChatId = localStorage.getItem('telegram_chat_id');
      
      if (!telegramToken || !telegramChatId) {
        setError('Telegram bot not configured. Please set up your Telegram bot to see real data.');
        setLoading(false);
        return;
      }

      // In a real implementation, you would call Telegram Bot API
      // For now, we'll simulate the API call
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since Telegram Bot API requires proper setup, we'll show a connection prompt
      setError('Telegram Bot API integration required. Please configure your bot token to see real messages.');
      
    } catch (err) {
      console.error('Telegram API error:', err);
      setError('Failed to fetch Telegram data. Please check your bot configuration.');
    } finally {
      setLoading(false);
    }
  };

  const setupTelegramBot = () => {
    // Open Telegram bot setup guide
    window.open('https://core.telegram.org/bots#creating-a-new-bot', '_blank');
    
    // For demo purposes, simulate successful setup
    setTimeout(() => {
      const botToken = prompt('Enter your Telegram Bot Token (from @BotFather):');
      const chatId = prompt('Enter your Chat ID (your Telegram user ID):');
      
      if (botToken && chatId) {
        localStorage.setItem('telegram_bot_token', botToken);
        localStorage.setItem('telegram_chat_id', chatId);
        
        setError('');
        setTelegramData({
          unreadChats: 3,
          totalChats: 24,
          onlineContacts: 12
        });
        setRecentChats([
          {
            id: 1,
            name: 'Tech Discussion',
            type: 'group',
            lastMessage: 'Check out this new framework!',
            time: '2m ago',
            unread: 2,
            avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100&h=100&fit=crop'
          },
          {
            id: 2,
            name: 'Personal Chat',
            type: 'private',
            lastMessage: 'Bot is now connected!',
            time: 'Just now',
            unread: 1,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face'
          }
        ]);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Telegram</h3>
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
            <Send className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Telegram</h3>
          </div>
          <button
            onClick={fetchTelegramData}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800">Telegram Bot Setup Required</h4>
              <p className="text-sm text-blue-700 mt-1">{error}</p>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-blue-600">To see real Telegram data:</p>
                <ol className="text-xs text-blue-600 list-decimal list-inside space-y-1">
                  <li>Create a bot with @BotFather</li>
                  <li>Get your bot token</li>
                  <li>Get your chat ID</li>
                  <li>Configure the widget</li>
                </ol>
                <button
                  onClick={setupTelegramBot}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Setup Telegram Bot</span>
                </button>
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
          <Send className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Telegram</h3>
        </div>
        <a
          href="https://web.telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </a>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <MessageCircle className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-blue-700">{telegramData?.unreadChats || 0}</p>
          <p className="text-xs text-blue-600">Unread</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <Users className="h-4 w-4 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-700">{telegramData?.totalChats || 0}</p>
          <p className="text-xs text-green-600">Chats</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
          <p className="text-lg font-bold text-purple-700">{telegramData?.onlineContacts || 0}</p>
          <p className="text-xs text-purple-600">Online</p>
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
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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

      <div className="mt-4 pt-4 border-t border-gray-100">
        <a
          href="https://web.telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Send className="h-4 w-4" />
          <span>Open Telegram</span>
        </a>
      </div>
    </div>
  );
}

export default TelegramWidget;