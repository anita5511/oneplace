import React, { useState } from 'react';
import { X } from 'lucide-react';

const newsCategories = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'sports', label: 'Sports' },
  { id: 'technology', label: 'Technology' },
  { id: 'politics', label: 'Politics' },
  { id: 'environment', label: 'Environment' }
];

function PreferencesModal({ preferences, onSave, onClose }) {
  const [formData, setFormData] = useState(preferences);

  const handleCategoryToggle = (categoryId) => {
    const newCategories = formData.newsCategories.includes(categoryId)
      ? formData.newsCategories.filter(id => id !== categoryId)
      : [...formData.newsCategories, categoryId];
    
    setFormData({ ...formData, newsCategories: newCategories });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (for weather)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your city"
            />
          </div>

          {/* News Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              News Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {newsCategories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.newsCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreferencesModal;