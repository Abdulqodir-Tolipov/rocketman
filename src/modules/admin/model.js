const fetch = require("../../library/postgres")

const get_admin = `select * from admins`

const get = async (req, res) => {
    return res.json(await fetch(get_admin))
}

module.exports = {
    get
}

