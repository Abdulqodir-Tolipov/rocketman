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
        try {
            return res.json(await fetch(get))
        } catch (error) {
            throw error;
        }
    },

    post: async ({ category_name, category_status }) => {
        try {
            return await fetch(post, category_name, category_status)
        } catch (error) {
            throw error
        }
    },

    put: async ({ category_id, category_name, category_status }) => {
        try {
            return await fetch(put, category_id, category_name, category_status)
        } catch (error) {
            throw error
        }
    },
    
    delete: async ({ category_id }) => {
        try {
            return await fetch(delet, category_id)
        } catch (error) {
            throw error
        }
    }
}