function access(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Access-Control-Allow-Origin',
    'token'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, PUT');
  next();
}
module.exports = access;


