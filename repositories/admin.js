const db = require("../utils/pg.js");
const md5 = require("md5");

const get = async () => {
    try {
        const GET_ADMIN = `
            select
                * 
            from    
                admins
            where status <> 'not active'
        `; 

        const result = await db(false, GET_ADMIN);
        return result;
    } catch (error) {
        console.error(error);
    }
};

const post = async ({ username, password }) => {
    try {
        const POST_ADMIN = `
            insert into admins(username, password) values($1, $2)
            returning *
        `;

        const result = await db(false, POST_ADMIN, username, md5(password));
        return result;
    } catch (error) {
        throw error;
    }
};

const update = async ({ id, username, password }) => {
    try {
        const UPDATE_ADMIN = `
            with old_data as (
                select
                    id,
                    username,
                    password
                from 
                    admins
                where id = $1 
            )update admins as a set
                username = (
                    case
                        when length($2) > 1 then $2
                        else o.username
                    end
                ),
                password = (
                    case
                        when length($3) > 1 then $3
                        else o.password
                    end
                )
            from old_data as o
            where a.id = $1
            returning a.*        
        `;

        const result = await db(
            true,
            UPDATE_ADMIN,
            id,
            username,
            md5(password)
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const deleter = async ({ id }) => {
    try {
        const DELETE_ADMIN = `
            with old_data as (
                select
                    id,
                    status
                from 
                    admins
                where id = $1
            )update admins as a set
                status = 'not active'
            from old_data as o 
            where a.id = $1
            returning a.*
        `;

        const result = await db(false, DELETE_ADMIN, id);
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
