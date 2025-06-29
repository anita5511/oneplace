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
    const category = req.query.category || 'general';
    
    // Try to fetch from News API
    try {
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
          },
          {
            title: "Technology Update",
            description: "Latest developments in technology sector.",
            url: "https://example.com",
            urlToImage: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            source: { name: "Tech News" }
          }
        ]
      });
    }
  } catch (error) {
    console.error('News endpoint error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
