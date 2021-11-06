const { verify } = require('../utils/jwt.js');

function validateCookie(req, res, next) {
  try {
    if (req.url == '/login') return next();
    if (!req.cookies.token) throw new Error('Token required');
    const isAdmin = verify(req.cookies.token);

    if (isAdmin == 'admin' || isAdmin == 'superadmin') next();
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
