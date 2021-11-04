const db = require("../utils/pg.js")

const get = async () => {
    try {
        const GET_REALUSERS = `
            select * from real_users 
        `;

        const result = await db(false, GET_REALUSERS)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    get
}