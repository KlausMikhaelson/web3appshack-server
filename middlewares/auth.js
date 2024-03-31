const jwt = require('jsonwebtoken');

// Middleware to validate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    
    jwt.verify(token, process.env.JWT_SECRET, (err, student) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.student = student;
      next(); // proceed to the next middleware/function
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = verifyToken;
