import jwt from 'jsonwebtoken';
import axios from 'axios';

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    return user;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const user = authenticateToken(req);
    const location = req.query.location || 'New York';
    
    // Try to fetch from OpenWeatherMap API
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: location,
          appid: process.env.WEATHER_API_KEY || 'demo-key',
          units: 'metric'
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error('Weather API error:', error);
      // Mock weather data for demo
      res.json({
        name: location,
        main: { temp: 22, feels_like: 24, humidity: 65 },
        weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
        wind: { speed: 3.2 }
      });
    }
  } catch (error) {
    console.error('Weather endpoint error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
