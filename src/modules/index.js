const adminRouter = require('./admin/router.js')
const categoryRouter = require('./category/router.js')
const subcategoryRouter = require('./subcategory/router.js')

module.exports = [
    adminRouter,
    categoryRouter
    subcategoryRouter
]
