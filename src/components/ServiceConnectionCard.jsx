import React, { useState } from 'react';
import { ExternalLink, Check, X, AlertCircle } from 'lucide-react';

function ServiceConnectionCard({ service, isConnected, onConnectionChange }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect
      onConnectionChange(service.name, false);
      
      // Clear stored tokens/data for the service
      switch (service.name) {
        case 'linkedin':
          localStorage.removeItem('linkedin_access_token');
          break;
        case 'telegram':
          localStorage.removeItem('telegram_bot_token');
          localStorage.removeItem('telegram_chat_id');
          break;
        case 'whatsapp':
          localStorage.removeItem('whatsapp_business_token');
          localStorage.removeItem('whatsapp_phone_number_id');
          localStorage.removeItem('whatsapp_web_connected');
          break;
      }
      return;
    }

    setIsConnecting(true);
    
    try {
      if (service.name === 'gmail' || service.name === 'googleWorkspace') {
        // For Google services, simulate OAuth flow
        window.open('https://accounts.google.com/oauth/authorize', '_blank');
        
        // Simulate successful connection after a delay
        setTimeout(() => {
          onConnectionChange(service.name, true);
          setIsConnecting(false);
        }, 2000);
        
      } else if (service.name === 'linkedin') {
        // For LinkedIn, show setup instructions
        const shouldSetup = confirm(
          'LinkedIn integration requires OAuth setup.\n\n' +
          'Would you like to:\n' +
          '1. Set up LinkedIn OAuth (recommended for real data)\n' +
          '2. Use demo mode (mock data)\n\n' +
          'Click OK for setup, Cancel for demo mode'
        );
        
        if (shouldSetup) {
          window.open('https://www.linkedin.com/developers/apps', '_blank');
          alert('Please create a LinkedIn app and configure OAuth. The widget will show setup instructions.');
        }
        
        onConnectionChange(service.name, true);
        setIsConnecting(false);
        
      } else if (service.name === 'telegram') {
        // For Telegram, show bot setup instructions
        const shouldSetup = confirm(
          'Telegram integration requires a bot setup.\n\n' +
          'Would you like to:\n' +
          '1. Set up Telegram Bot (recommended for real data)\n' +
          '2. Use demo mode (mock data)\n\n' +
          'Click OK for setup, Cancel for demo mode'
        );
        
        if (shouldSetup) {
          window.open('https://core.telegram.org/bots#creating-a-new-bot', '_blank');
          alert('Please create a bot with @BotFather. The widget will show setup instructions.');
        }
        
        onConnectionChange(service.name, true);
        setIsConnecting(false);
        
      } else if (service.name === 'whatsapp') {
        // For WhatsApp, show integration options
        const integrationChoice = confirm(
          'WhatsApp integration options:\n\n' +
          '1. WhatsApp Web (simple, limited data)\n' +
          '2. WhatsApp Business API (advanced, real data)\n\n' +
          'Click OK for WhatsApp Web, Cancel for Business API setup'
        );
        
        if (integrationChoice) {
          window.open('https://web.whatsapp.com', '_blank');
          alert('Please scan the QR code in WhatsApp Web. The widget will show your chats.');
        } else {
          window.open('https://developers.facebook.com/docs/whatsapp/getting-started', '_blank');
          alert('Please set up WhatsApp Business API. The widget will show setup instructions.');
        }
        
        onConnectionChange(service.name, true);
        setIsConnecting(false);
        
      } else {
        // For other services, just open their web app
        window.open(service.connectUrl, '_blank');
        
        setTimeout(() => {
          onConnectionChange(service.name, true);
          setIsConnecting(false);
        }, 2000);
      }
    } catch (error) {
      console.error(`Error connecting to ${service.name}:`, error);
      setIsConnecting(false);
    }
  };

  const getConnectionStatus = () => {
    if (!isConnected) return null;
    
    // Check if service has real data or needs setup
    switch (service.name) {
      case 'linkedin':
        const hasLinkedInToken = localStorage.getItem('linkedin_access_token');
        return hasLinkedInToken ? 'connected' : 'setup-required';
      case 'telegram':
        const hasTelegramBot = localStorage.getItem('telegram_bot_token');
        return hasTelegramBot ? 'connected' : 'setup-required';
      case 'whatsapp':
        const hasWhatsAppAPI = localStorage.getItem('whatsapp_business_token');
        const hasWhatsAppWeb = localStorage.getItem('whatsapp_web_connected');
        return (hasWhatsAppAPI || hasWhatsAppWeb) ? 'connected' : 'setup-required';
      default:
        return 'connected';
    }
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-white text-xl`}>
            {service.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.displayName}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-1">
            {connectionStatus === 'setup-required' ? (
              <div className="flex items-center space-x-1 text-orange-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Setup Required</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-xs font-medium">Connected</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show sub-services for combined services */}
      {service.subServices && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Includes:</p>
          <div className="flex flex-wrap gap-1">
            {service.subServices.map((subService) => (
              <span
                key={subService}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {subService}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Setup status message */}
      {isConnected && connectionStatus === 'setup-required' && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-xs text-orange-700">
            Service connected but requires additional setup to show real data. 
            Check the widget for setup instructions.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isConnected
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Connecting...</span>
            </>
          ) : isConnected ? (
            <>
              <X className="h-4 w-4" />
              <span>Disconnect</span>
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4" />
              <span>Connect</span>
            </>
          )}
        </button>

        {isConnected && (
          <a
            href={service.connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title={`Open ${service.displayName}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default ServiceConnectionCard;