import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Cloud, Sun, CloudRain, RefreshCw } from 'lucide-react';

function WeatherWidget({ location }) {
  const { getAuthHeaders } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/weather?location=${location}`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weather</h3>
        <button
          onClick={fetchWeather}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
        </div>
      ) : weather ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{Math.round(weather.main?.temp || 0)}°C</p>
              <p className="text-sm opacity-80">{weather.name}</p>
            </div>
            {getWeatherIcon(weather.weather?.[0]?.main)}
          </div>
          
          <div className="space-y-2 text-sm opacity-80">
            <div className="flex justify-between">
              <span>Feels like</span>
              <span>{Math.round(weather.main?.feels_like || 0)}°C</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity</span>
              <span>{weather.main?.humidity || 0}%</span>
            </div>
            <div className="flex justify-between">
              <span>Wind</span>
              <span>{weather.wind?.speed || 0} m/s</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm opacity-80">Unable to load weather data</p>
      )}
    </div>
  );
}

export default WeatherWidget;