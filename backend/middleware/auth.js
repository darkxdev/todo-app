const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * Middleware for authenticating JWT token in the request headers.
 * Verifies the token and attaches the decoded user information to the request object.
 * If the token is missing or invalid, it returns a 401 Unauthorized response.
 */
const authMiddleware = (req, res, next) => {
  // Retrieve the token from the request headers
  const token = req.headers.authorization;

  // If token is missing, return 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    // Verify and decode the token using the provided secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'your-secret-key');

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (err) {
    console.error(err);

    // If token is invalid, return 401 Unauthorized response
    res.status(401).json({ message: 'Access denied. Invalid token.' });
  }
};

// Export the authMiddleware function
module.exports = authMiddleware;
