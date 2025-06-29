import jwt from 'jsonwebtoken';

// Mock database for user preferences (in production, use a real database)
const userPreferences = new Map();

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

  try {
    const user = authenticateToken(req);

    if (req.method === 'GET') {
      const preferences = userPreferences.get(user.userId) || {
        newsCategories: ['general'],
        location: 'New York',
        theme: 'light'
      };
      res.json(preferences);
    } else if (req.method === 'POST') {
      const { newsCategories, location, theme } = req.body;
      userPreferences.set(user.userId, {
        newsCategories: newsCategories || ['general'],
        location: location || 'New York',
        theme: theme || 'light'
      });
      res.json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Preferences error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
