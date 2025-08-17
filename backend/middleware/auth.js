// middleware/auth.js - Authentication middleware
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token; // Read token from HTTP-only cookie
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
