// putiga so`roq bormagan ya`ni put qilinmagan


const fetch = require("../../library/postgres")

const get = `select * from category`

const post = `
insert into category(category_name, category_status) values ($1, $2)`


const put =
    `update  category 
    set 
        category_name = $2,
        category_status = $3
    where category_id = $1 
    returning * `


const delet = `
DELETE FROM category
where category_id=$1
returning *`



module.exports = {
    get: async (_, res) => {
        return res.json(await fetch(get))
    },
    post: ({ category_name, category_status }) => {
        return fetch(post, category_name, category_status)

    },
    put: async ({ category_id, category_name, category_status }) => {
        return await fetch(put, category_id, category_name, category_status)
    },
    delete: async ({ category_id }) => {
        return await fetch(delet, category_id)
    }
}