const db = require('../utils/pg.js');

const get = async () => {
  try {
    const GET_ORDERS = `
        select
          *
        from
          orders o
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
