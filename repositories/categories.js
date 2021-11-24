const db = require('../utils/pg.js');

const get = async ({ param, id }) => {
  try {
    const GET_BY_PARAMS = `
      select 
        id,
        name,
        shop,
        status
      from
        categories
      where id = $1 and status <> 'deleted'
    `;

    const GET_BY_QUERY = `
      select
        sc.id,
        sc.name,
        sc.amount,
        sc.contact,
        sc.address,
        sc.status
      from    
        categories c
      join sub_categories sc on c.id = sc.id
      where sc.id = $1 and sc.status <> 'deleted'
    `;

    const GET_CATEGORY = `
      select
        id,
        name,
        shop,
        status
      from    
        categories
      where status <> 'deleted'
    `;

    if (param) {
      const result = await db(true, GET_BY_PARAMS, param);
      return result;
    } else if (id) {
      const result = await db(true, GET_BY_QUERY, id);
      return result;
    } else {
      const result = await db(false, GET_CATEGORY);
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

const post = async ({ name, tg_name, shop }) => {
  try {
    const POST_CATEGORY = `
            insert into categories(name, tg_name, shop) values($1, $2, $3)
            returning *
        `;

    const result = await db(true, POST_CATEGORY, name, tg_name, shop);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async ({ id, name, tg_name, shop, status }) => {
  try {
    const UPDATE_CATEGORY = `
            with old_data as (
                select
                    id,
                    name,
                    tg_name,
                    shop,
                    status
                from 
                    categories
                where id = $1 
            )update categories as c set
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
                shop = (
                    case
                        when $4 > 0 then $4
                        else o.shop
                    end
                ),
                status = (
                    case
                        when ($5 = 'true' and o.status = 'enabled') then 'disabled'
                        when ($5 = 'true' and o.status = 'disabled') then 'enabled'
                        when ($5 = 'true' and o.status = 'deleted') then 'enabled'
                        else o.status
                    end
                )
            from old_data as o
            where c.id = $1
            returning c.*        
        `;

    const result = await db(
      true,
      UPDATE_CATEGORY,
      id,
      name,
      tg_name,
      shop,
      status
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
                categories
                where id = $1
            )update categories as c set
                status = 'deleted'
            from old_data as o 
            where c.id = $1
            returning c.*
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
