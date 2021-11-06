const db = require('../utils/pg.js');

const get = async ({ param }) => {
  try {
    const GET_BY_PARAMS = `
        select 
            *
        from 
            real_users
        where user_id = $1
    `;

    const GET_REALUSERS = `
        select 
            * 
        from
            real_users
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
