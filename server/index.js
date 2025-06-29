import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Mock database for user preferences
const userPreferences = new Map();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Google OAuth verification
app.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    
    // Create JWT token
    const jwtToken = jwt.sign(
      { 
        userId, 
        email: payload.email, 
        name: payload.name,
        picture: payload.picture 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Initialize user preferences if not exists
    if (!userPreferences.has(userId)) {
      userPreferences.set(userId, {
        newsCategories: ['general', 'technology', 'business'],
        location: 'New York',
        theme: 'light'
      });
    }

    res.json({ 
      token: jwtToken, 
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get user preferences
app.get('/api/preferences', authenticateToken, (req, res) => {
  const preferences = userPreferences.get(req.user.userId) || {
    newsCategories: ['general'],
    location: 'New York',
    theme: 'light'
  };
  res.json(preferences);
});

// Update user preferences
app.post('/api/preferences', authenticateToken, (req, res) => {
  const { newsCategories, location, theme } = req.body;
  userPreferences.set(req.user.userId, {
    newsCategories: newsCategories || ['general'],
    location: location || 'New York',
    theme: theme || 'light'
  });
  res.json({ success: true });
});

// Get news based on user preferences
app.get('/api/news', authenticateToken, async (req, res) => {
  try {
    const preferences = userPreferences.get(req.user.userId) || { newsCategories: ['general'] };
    const category = req.query.category || preferences.newsCategories[0];
    
    // Using News API (you'll need to get an API key from newsapi.org)
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: category,
        country: 'us',
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY || 'demo-key'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error);
    // Mock news data for demo
    res.json({
      articles: [
        {
          title: "Sample News Article",
          description: "This is a sample news article for demonstration.",
          url: "https://example.com",
          urlToImage: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
          publishedAt: new Date().toISOString(),
          source: { name: "Demo News" }
        }
      ]
    });
  }
});

// Get weather data
app.get('/api/weather', authenticateToken, async (req, res) => {
  try {
    const preferences = userPreferences.get(req.user.userId) || { location: 'New York' };
    const location = req.query.location || preferences.location;
    
    // Using OpenWeatherMap API (you'll need to get an API key)
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
      name: "New York",
      main: { temp: 22, feels_like: 24, humidity: 65 },
      weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
      wind: { speed: 3.2 }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});