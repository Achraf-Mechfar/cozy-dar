const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwt.decode(token))
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden, not an admin' });
    }

    req.user = decoded;
    next();
    
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyAdmin;
