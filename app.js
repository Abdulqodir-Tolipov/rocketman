const express = require("express");
const path = require('path')
const config = require("./config/server.js");
const cookie = require("cookie-parser");
const fileUpload = require('express-fileupload')
const validateCookies = require("./middlewares/checkToken.js");

const adminRouter = require("./routes/v1/admin.js");
const loginRouter = require("./routes/v1/login.js");
const categoryRouter = require("./routes/v1/categories.js");
const subProducts = require("./routes/v1/subproducts.js")
const app = express();

app.use(express.static('uploads'))

app.use(express.json());
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}))
app.use(cookie());
app.use(validateCookies);
app.use(adminRouter);
app.use(subProducts)
app.use(loginRouter)
app.use(categoryRouter)

app.listen(config.PORT, () => {
    console.log(`The server is ready on http://localhost:${config.PORT}`);
});
