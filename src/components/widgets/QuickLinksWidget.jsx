import React from 'react';
import { Mail, Linkedin, MessageCircle, Send, Calendar, CheckSquare } from 'lucide-react';

const quickLinks = [
  {
    name: 'Gmail',
    icon: Mail,
    url: 'https://mail.google.com',
    color: 'bg-red-500'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'bg-blue-600'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://web.whatsapp.com',
    color: 'bg-green-500'
  },
  {
    name: 'Telegram',
    icon: Send,
    url: 'https://web.telegram.org',
    color: 'bg-blue-500'
  },
  {
    name: 'Calendar',
    icon: Calendar,
    url: 'https://calendar.google.com',
    color: 'bg-indigo-500'
  },
  {
    name: 'Tasks',
    icon: CheckSquare,
    url: 'https://tasks.google.com',
    color: 'bg-purple-500'
  }
];

function QuickLinksWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div className={`p-2 rounded-lg ${link.color} group-hover:scale-110 transition-transform duration-200`}>
              <link.icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default QuickLinksWidget;