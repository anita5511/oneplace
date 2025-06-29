import React, { useState, useEffect } from 'react';
import { Linkedin, Users, MessageSquare, TrendingUp, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

function LinkedInWidget() {
  const [linkedInData, setLinkedInData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLinkedInData();
  }, []);

  const fetchLinkedInData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Check if LinkedIn is properly connected
      const linkedInToken = localStorage.getItem('linkedin_access_token');
      
      if (!linkedInToken) {
        setError('LinkedIn not properly connected. Please reconnect your account.');
        setLoading(false);
        return;
      }

      // In a real implementation, you would call LinkedIn's API
      // For now, we'll simulate the API call and show connection status
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since LinkedIn API requires proper OAuth setup, we'll show a connection prompt
      setError('LinkedIn API integration requires proper OAuth setup. Click "Connect to LinkedIn" to authenticate.');
      
    } catch (err) {
      console.error('LinkedIn API error:', err);
      setError('Failed to fetch LinkedIn data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const connectToLinkedIn = () => {
    // In a real app, this would initiate LinkedIn OAuth flow
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    
    // For demo purposes, we'll just open LinkedIn and simulate connection
    window.open('https://linkedin.com', '_blank');
    
    // Simulate successful connection after user returns
    setTimeout(() => {
      localStorage.setItem('linkedin_access_token', 'demo_token_' + Date.now());
      setError('');
      setLinkedInData({
        connections: 847,
        profileViews: 23,
        postImpressions: 1250,
        messages: 5
      });
      setRecentActivity([
        {
          id: 1,
          type: 'connection',
          message: 'New connection request accepted',
          time: '2 hours ago',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face'
        },
        {
          id: 2,
          type: 'post',
          message: 'Your recent post received engagement',
          time: '4 hours ago',
          avatar: null
        }
      ]);
    }, 3000);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'connection':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'post':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Linkedin className="h-4 w-4 text-blue-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-900">LinkedIn Activity</h3>
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
            <Linkedin className="h-5 w-5 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-900">LinkedIn Activity</h3>
          </div>
          <button
            onClick={fetchLinkedInData}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800">LinkedIn Connection Required</h4>
              <p className="text-sm text-blue-700 mt-1">{error}</p>
              <button
                onClick={connectToLinkedIn}
                className="mt-3 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Linkedin className="h-4 w-4" />
                <span>Connect to LinkedIn</span>
              </button>
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
          <Linkedin className="h-5 w-5 text-blue-700" />
          <h3 className="text-lg font-semibold text-gray-900">LinkedIn Activity</h3>
        </div>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </a>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Connections</span>
          </div>
          <p className="text-xl font-bold text-blue-700 mt-1">{linkedInData?.connections || 0}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Profile Views</span>
          </div>
          <p className="text-xl font-bold text-green-700 mt-1">{linkedInData?.profileViews || 0}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {activity.avatar ? (
                    <img
                      src={activity.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          <span>Open LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default LinkedInWidget;