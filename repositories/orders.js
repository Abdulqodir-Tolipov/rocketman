const db = require('../utils/pg.js');

const get = async () => {
  try {
    const GET_ORDERS = `
      select
        o.id,
        o.created_at,
        u.user_name,
        u.contact,
        (SELECT json_array_length(orde::json) from orders) count,
        sum(sp.price) price,
        o.latitude,
        o.longitude
      from
        orders o
      join real_users u on (o.orde -> 1 ->>'bot_user_id')::int = u.bot_user_id
      join sub_products sp on (o.orde -> 1 ->>'sub_product_id')::int = sp.id
      group by o.id, u.user_name, u.contact, o.latitude, o.longitude
      ;
    `;

    const result = await db(false, GET_ORDERS);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get,
};
