const adminRouter = require('./admin/router.js')
const categoryRouter = require('./category/router.js')
<<<<<<< HEAD
const loginRouter = require('./login/router.js')
// const subCategoryRouter = require('./subCategory/router.js')

module.exports = [
    adminRouter,
    categoryRouter,
    loginRouter
    // subCategoryRouter
]  
=======
const subcategoryRouter = require('./subcategory/router.js')

module.exports = [
    adminRouter,
    categoryRouter
    subcategoryRouter
]
>>>>>>> f3678d3e6eb8491deffb3b8d705235174faea865
