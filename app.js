const express = require("express");
const config = require("./config/server.js");
const cookie = require("cookie-parser");
const validateCookies = require("./middlewares/checkToken.js");

const adminRouter = require("./routes/v1/admin.js");
const loginRouter = require("./routes/v1/login.js");
const categoryRouter = require("./routes/v1/categories.js");

const app = express();

app.use(express.json());
app.use(cookie());
app.use(validateCookies);
app.use(adminRouter);
app.use(loginRouter)
app.use(categoryRouter)

app.listen(config.PORT, () => {
    console.log(`The server is ready on http://localhost:${config.PORT}`);
});
