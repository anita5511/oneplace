import React, { useState } from 'react';
import { Mail, Inbox, Send, Star, Archive, ExternalLink } from 'lucide-react';

function GmailWidget() {
  const [emailData] = useState({
    unreadCount: 12,
    totalEmails: 1847,
    importantCount: 3
  });

  const [recentEmails] = useState([
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'Project Update - Q4 Review',
      preview: 'Hi there! I wanted to share the latest updates on our Q4 project...',
      time: '2m ago',
      unread: true,
      important: true,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      from: 'LinkedIn',
      subject: 'You have 5 new profile views',
      preview: 'Your profile has been viewed by professionals in your network...',
      time: '15m ago',
      unread: true,
      important: false,
      avatar: null
    },
    {
      id: 3,
      from: 'Alex Chen',
      subject: 'Meeting Reschedule Request',
      preview: 'Hope you\'re doing well. I need to reschedule our meeting...',
      time: '1h ago',
      unread: true,
      important: false,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      from: 'GitHub',
      subject: 'Weekly digest for your repositories',
      preview: 'Here\'s what happened in your repositories this week...',
      time: '3h ago',
      unread: false,
      important: false,
      avatar: null
    }
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Gmail</h3>
        </div>
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </a>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <Inbox className="h-4 w-4 text-red-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-red-700">{emailData.unreadCount}</p>
          <p className="text-xs text-red-600">Unread</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Mail className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-blue-700">{emailData.totalEmails}</p>
          <p className="text-xs text-blue-600">Total</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Star className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-yellow-700">{emailData.importantCount}</p>
          <p className="text-xs text-yellow-600">Important</p>
        </div>
      </div>

      {/* Recent Emails */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Emails</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recentEmails.map((email) => (
            <div key={email.id} className={`flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${email.unread ? 'bg-blue-50' : ''}`}>
              <div className="flex-shrink-0">
                {email.avatar ? (
                  <img
                    src={email.avatar}
                    alt={email.from}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h5 className={`text-sm truncate ${email.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {email.from}
                    </h5>
                    {email.important && (
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{email.time}</span>
                </div>
                <p className={`text-sm truncate ${email.unread ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                  {email.subject}
                </p>
                <p className="text-xs text-gray-500 truncate mt-1">{email.preview}</p>
              </div>
              
              {email.unread && (
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            <Send className="h-3 w-3" />
            <span>Compose</span>
          </button>
          <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
            <Archive className="h-3 w-3" />
            <span>Archive</span>
          </button>
        </div>
        
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Mail className="h-4 w-4" />
          <span>Open Gmail</span>
        </a>
      </div>
    </div>
  );
}

export default GmailWidget;