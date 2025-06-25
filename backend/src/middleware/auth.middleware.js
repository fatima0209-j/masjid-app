import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust path if needed

export const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey'); // same secret used in login
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = user; // attach user to request
    next(); // allow access
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
