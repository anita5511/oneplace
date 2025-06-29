import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Newspaper, ExternalLink, RefreshCw } from 'lucide-react';

function NewsWidget({ categories }) {
  const { getAuthHeaders } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'general');

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/news?category=${selectedCategory}`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setNews(data.articles || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Latest News</h3>
        </div>
        <button
          onClick={fetchNews}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {news.slice(0, 5).map((article, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {article.source?.name} • {formatDate(article.publishedAt)}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center space-x-1"
                >
                  <span>Read</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsWidget;
