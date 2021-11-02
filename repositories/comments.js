const db = require("../utils/pg.js")

const get = async () => {
    try {
        const GET_COMMENTS = `
        select * from comments
        order by comment_date desc
    `;
    const result = await db(false, GET_COMMENTS)
    return result
    } catch (error) {
        throw error
    }
}



module.exports = {
    get
}