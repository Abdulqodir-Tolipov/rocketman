const express = require('express');
const path = require('path');
const config = require('./config/server.js');
const cookie = require('cookie-parser');
const validateCookies = require('./middlewares/checkToken.js');

const adminRouter = require('./routes/v1/admin.js');
const loginRouter = require('./routes/v1/login.js');
const categoryRouter = require('./routes/v1/categories.js');
const productRouter = require('./routes/v1/products.js');
const subProductsRouter = require('./routes/v1/subproducts.js');
const subCategoriesRouter = require('./routes/v1/subcategories.js');
const companyRouter = require("./routes/v1/company.js")
const commentsRouter = require("./routes/v1/comments.js")
const app = express();

app.use(express.json());
app.use(cookie());
app.use(validateCookies);
app.use(adminRouter);
app.use(productRouter);
app.use(subProductsRouter);
app.use(loginRouter);
app.use(categoryRouter);
app.use(subCategoriesRouter);
app.use(commentsRouter);
app.use(productRouter)
app.use(subProductsRouter)
app.use(loginRouter)
app.use(categoryRouter)
app.use(subCategoriesRouter)
app.use(commentsRouter)
app.use(companyRouter)

app.listen(config.PORT, () => {
  console.log(`The server is ready on http://localhost:${config.PORT}`);
});
