const db = require('../utils/pg.js');

const get = async () => {
  try {
    const GET_COMMENTS = `
        select
          c.id,
          u.user_name,
          c.comment_date,
          c.comment_title,
          c.bot_user_id
        from comments as c
        join real_users as u on u.bot_user_id = c.bot_user_id
        order by c.comment_date desc
    `;
    const result = await db(false, GET_COMMENTS);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
};