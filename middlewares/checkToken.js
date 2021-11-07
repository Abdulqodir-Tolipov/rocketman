const { verify } = require('../utils/jwt.js');

function validateCookie(req, res, next) {
  try {
    if (req.url == '/login') return next();
    if (!req.cookies.token) throw new Error('Token required');
    if (!req.headers.token) throw new Error('Token required');
    const isAdmin = verify(req.cookies.token);
    const front = verify(req.headers.token);

    if (isAdmin == 'admin' || isAdmin == 'superadmin') next();
    if (front == 'admin' || front == 'superadmin') next();
    else throw new Error('Forbidden');
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

module.exports = validateCookie;
