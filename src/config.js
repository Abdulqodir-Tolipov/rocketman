const path = require('path')

require('dotenv').config({ path: path.join(process.cwd(), '.env') })

const pgConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
}
// console.log(pgConfig);

module.exports = {
    pgConfig
}