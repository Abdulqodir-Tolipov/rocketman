// putiga so`roq bormagan ya`ni put qilinmagan


const fetch = require("../../library/postgres")

const get = `select * from category`

const post = `
insert into category(category_name, category_status) values ($1, $2)`


const put =
    `
    with old_data as(
        select
        category_id,
        category_name,
        category_status
        from category
        where category_id = $1
    ) update category set
        category_name = (
            case
                when length($2) > 1 THEN $2
                else old_data.category_name
            end
        ),
        category_status = (
            case
                when $3 <> old_data.category_status THEN $3
                else old_data.category_status
            end
        )
    from old_data
    where category.category_id = $1
    returning *
    `


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