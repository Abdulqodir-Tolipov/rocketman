const db = require('../utils/pg.js');
const md5 = require('md5');

const login = async ({ username, password }) => {
  try {
    const LOGIN = `
      select
        *
      from 
        admins
      where username = $1 and password = $2
    `;

    const result = await db(true, LOGIN, username, md5(password));
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
