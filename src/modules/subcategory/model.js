const fetch = require("../../library/postgres")

const get = `select * from subcategory`
const post = `
insert into subCategory(
    subCategory_name, 
    subCategory_goods, 
    subCategory_phone, 
    subCategory_address,
    subCategory_isActive, 
    category_id) values ($1,$2,$3,$4,$5,$6)
`

const put = ` with old_data as(
                select
                subcategory_id,
                subcategory_name,
                subcategory_goods,
                subcategory_phone,
                subcategory_address,
                subcategory_isActive,
                category_id
                from subcategory
                where subcategory.subcategory_id = $1
            ) update subcategory set
                subcategory_name = (
                    case
                        when length($2) > 1 THEN $2
                        else old_data.subcategory_name
                    end
                ),
                subcategory_goods = (
                    case
                        when $3 > 0 THEN $3
                        else old_data.subcategory_goods
                    end
                ),
                subcategory_phone = (
                    case
                        when length($4) > 1 THEN $4
                        else old_data.subcategory_phone
                    end
                ),
                subcategory_address = (
                    case
                        when length($5) > 1 THEN $5
                        else old_data.subcategory_address
                    end
                ),
                subcategory_isActive = (
                    case
                        when $6 <> old_data.subcategory_isActive and $8  THEN $6
                        else old_data.subcategory_isActive
                    end
                ),
                category_id = (
                    case
                        when $7 > 0 THEN $7
                        else old_data.category_id
                    end
                )

            from old_data
            where subcategory.subcategory_id = $1
            returning *
            `

const delet = `
            DELETE FROM subcategory
            where subcategory_id=$1
            returning *`


module.exports = {
    get: async (_, res) => {
        try {

            return res.json(await fetch(get))
        } catch (error) {
            throw error
        }
    },
    post: async ({ subcategory_name, subcategory_goods, subcategory_phone, subcategory_address, subcategory_isActive, category_id }) => {
        try {
            return await fetch(post, subcategory_name, subcategory_goods, subcategory_phone, subcategory_address, subcategory_isActive, category_id)
        } catch (error) {
            throw error
        }
    },
    put: async ({ subcategory_id, subcategory_name = ' ', subcategory_goods = 0, subcategory_phone = ' ', subcategory_address = ' ', subcategory_isActive, category_id = 0 }) => {
        try {
            if(subcategory_isActive == undefined){
                return await fetch(put, subcategory_id, subcategory_name, subcategory_goods, subcategory_phone, subcategory_address, subcategory_isActive, category_id,false)
            }
            return await fetch(put, subcategory_id, subcategory_name, subcategory_goods, subcategory_phone, subcategory_address, subcategory_isActive, category_id,true)
        } catch (error) {

        }
    },
    delete: async ({ subcategory_id }) => {
        try {
            return await fetch(delet, subcategory_id)
        } catch (error) {
            throw error
        }
    }
}
