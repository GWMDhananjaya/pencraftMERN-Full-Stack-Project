// Importing necessary modules
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Middleware function to verify JWT token
export const verifyToken = (req, res, next) => {
  // Extracting token from cookies
  const token = req.cookies.access_token;

  // Checking if token exists
  if (!token) {
    // If token doesn't exist, return Unauthorized error
    return next(errorHandler(401, 'Unauthorized'));
  }

  // Verifying JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If error occurs during token verification, return Unauthorized error
      return next(errorHandler(401, 'Unauthorized'));
    }
    // If token is successfully verified, set user information in request object
    req.user = user;
    // Move to the next middleware function
    next();
  });
};
