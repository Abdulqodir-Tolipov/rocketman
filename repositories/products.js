const db = require("../utils/pg.js")

const get = async ({param}) => {
    try {

        const GET_BY_PARAMS = `
            select
                *
            from 
                products
            where id = $1 and status <> 'deleted'
        `

        const GET_CATEGORY = `
            select
                * 
            from    
                products
            where status <> 'deleted'
        `;
        if (param) {
            const result = await db(true, GET_BY_PARAMS, param);
            return result;
        } else {
            const result = await db(false, GET_CATEGORY);
            return result;
        }
    } catch (error) {
        console.error(error);
    }
};


const post = async ({ name, tg_name, amount, sub_categories_id }) => {
    try {
        const POST_CATEGORY = `
            insert into products(name, tg_name, amount, sub_categories_id) values($1, $2, $3, $4)
            returning *
        `;

        const result = await db(true, POST_CATEGORY, name, tg_name, amount, sub_categories_id);
        return result;
    } catch (error) {
        throw error;
    }
};

const update = async ({ id, name, tg_name, amount, status, sub_categories_id }) => {
    try {
        const UPDATE_CATEGORY = `
            with old_data as (
                select
                    id,
                    name,
                    tg_name,
                    amount,
                    status,
                    sub_categories_id
                from 
                    products
                where id = $1 
            )update products as p set
                name = (
                    case
                        when length($2) > 1 then $2
                        else o.name
                    end
                ),
                tg_name = (
                    case
                        when length($3) > 1 then $3
                        else o.tg_name
                    end
                ),          
                amount = (
                    case
                        when $4 > 0 then $4
                        else o.amount
                    end
                ),
                status = (
                    case
                        when length($5) > 1 then $5
                        else o.status
                    end
                ),
                sub_categories_id = (
                    case
                        when $6 > 0 then $6
                        else o.sub_categories_id
                    end
                )
            from old_data as o
            where p.id = $1
            returning p.*        
        `;

        const result = await db(
            true,
            UPDATE_CATEGORY,
            id,
            name,
            tg_name,
            amount,
            status,
            sub_categories_id
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const deleter = async ({ id }) => {
    try {
        const DELETE_CATEGORY = `
            with old_data as (
                select
                    id,
                    status
                from 
                products
                where id = $1
            )update products as p set
                status = 'deleted'
            from old_data as o 
            where p.id = $1
            returning p.*
        `;

        const result = await db(true, DELETE_CATEGORY, id);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    get,
    post,
    update,
    deleter,
};
  