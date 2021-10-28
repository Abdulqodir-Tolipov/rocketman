const fetch = require("../../library/postgres.js")
const md5 = require("md5")

const login = `
    select * from superadmin where username = $1 and password = $2
`

const loginModel = async ({username, password}) => {
    try {
        password = await md5(password)
        return await fetch(login, username, password)
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginModel
}

