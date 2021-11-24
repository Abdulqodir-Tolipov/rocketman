const db = require('../utils/pg.js');
const md5 = require('md5');

const get = async ({ param }) => {
  try {
    const GET_BY_PARAMS = `
      select
        *
      from
        admins
      where id = $1 and status <> 'deleted'
    `;

    const GET_ADMINS = `
      select
        * 
      from    
        admins
      where status <> 'deleted'
    `;

    if (param) {
      const result = await db(true, GET_BY_PARAMS, param);
      return result;
    } else {
      const result = await db(false, GET_ADMINS);
      return result;
    }
  } catch (error) {
    throw error;
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
    password = password ? md5(password) : undefined;
    const result = await db(true, UPDATE_ADMIN, id, username, password);
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
                status = 'deleted'
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
