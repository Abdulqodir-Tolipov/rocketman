const { verify } = require('../utils/jwt.js');

function validateCookie(req, res, next) {
  try {
    if (req.url === '/login') return next();
    else if (!req.headers.token) throw new Error('Token required');
    const front = verify(req.headers.token);
    if (front === 'admin' || front === 'superadmin') return next();
    else throw new Error('Forbidden');
    if (!req.headers.token) throw new Error('Token required');
    const isAdmin = verify(req.cookies.token);
    if (isAdmin === 'admin' || isAdmin === 'superadmin') return next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

module.exports = validateCookie;
