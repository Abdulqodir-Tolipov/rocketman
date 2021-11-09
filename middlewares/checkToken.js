const { verify } = require('../utils/jwt.js');

function validateCookie(req, res, next) {
  try {
    if (req.url === '/login') return next();
    if (req.headers.token || req.cookies.token) {
      let isAdmin = verify(req.headers.token || req.cookies.token);
      if (isAdmin === 'admin' || isAdmin === 'superadmin') return next();
      else throw new Error('Forbidden');
    } else throw new Error('token rquired');
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

module.exports = validateCookie;
