const fetch = require('../../library/postgres.js')

const get = `
    SELECT * FROM admins
`

const post = `
    INSERT INTO admins (username, password) values ($1, $2)
    RETURNING *
`

const put = `
WITH old_data as (
    SELECT
    user_id,
    username,
    password
    FROM admins
    WHERE user_id = $1
) UPDATE admins a SET
    username = (
        CASE
            WHEN length($2) > 1 THEN $2
            ELSE o.username
        END),
    password = (
        CASE 
            WHEN length($3) > 1 THEN $3
            ELSE o.password
        END)
FROM old_data o
WHERE a.user_id = $1
RETURNING a.*
`

const delet = `
    DELETE FROM admins where user_id = $1
    RETURNING *
`

module.exports = {
    get: async(_, res) => {
        try {
            return res.json(await fetch(get))
        } catch (error) {
            throw error
        }
    },

    post: async({username, password}) => {
        try {
            return await fetch(post, username, password)            
        } catch (error) {
            throw error
        }
    },

    put: async({user_id, username, password}) => {
        try {
            return await fetch(put, user_id, username, password)
        } catch (error) {
            throw error
        }
    },

    delete: async({user_id}) => {
        try {
            return await fetch(delet, user_id)
        } catch (error) {
            throw error
        }
    }
}