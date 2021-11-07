function access(req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   res.setHeader('Access-Control-Allow-Credentials', true);

   next();
}
module.exports = access;
