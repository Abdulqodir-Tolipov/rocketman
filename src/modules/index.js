const adminRouter = require('./admin/router.js')
const categoryRouter = require('./category/router.js')
const subCategoryRouter = require('./subcategory/router.js')

module.exports = [
    adminRouter,
    categoryRouter,
    subCategoryRouter
]