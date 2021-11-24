const db = require('../utils/pg.js');

const get = async ({ param }) => {
  try {
    const GET_BY_PARAMS = `
      select 
        u.user_id,
        u.user_name,
        u.contact,
        (SELECT json_array_length(orde::json) from orders) orders
      from
        real_users u
      left join orders o on (o.orde -> 1 ->>'bot_user_id')::int = u.bot_user_id
      where user_id = $1
      group by u.user_id
    `;

    const GET_REALUSERS = `
      select 
        u.user_id,
        u.user_name,
        u.contact,
        (SELECT json_array_length(orde::json) from orders) orders
      from
        real_users u
      left join orders o on (o.orde -> 1 ->>'bot_user_id')::int = u.bot_user_id
      group by u.user_id
    `;

    if (param) {
      const result = await db(true, GET_BY_PARAMS, param);
      return result;
    } else {
      const result = await db(false, GET_REALUSERS);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get };
