const { verify } = require('../utils/jwt.js');

function validateCookie(req, res, next) {
  try {
    console.log(req.cookies.token,req.headers.token)
    if (req.url == '/login') return next();
    else if (!req.cookies.token) throw new Error('Token required');
    else if (!req.headers.token) throw new Error('Token required');
    const isAdmin = verify(req.cookies.token);
    const front = verify(req.headers.token);
    console.log(front)
    if (isAdmin == 'admin' || isAdmin == 'superadmin') next();
    else if (front == 'admin' || front == 'superadmin') next();
    else throw new Error('Forbidden');
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

module.exports = validateCookie;
