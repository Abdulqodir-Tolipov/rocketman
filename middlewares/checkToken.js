const { verify } = require("../utils/jwt.js");

function validateCookie(req, res, next) {
	if (req.url == '/login') return next();
	if (!req.cookies.token) throw new Error("Token required");
	const isAdmin = verify(req.cookies.token);

	if (isAdmin =='admin' || isAdmin =='superadmin') next();
	else throw new Error("Forbidden");
}

module.exports = validateCookie;
