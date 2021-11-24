const db = require('../utils/pg.js');

const update = async ({
  name,
  media_link,
  delivery_price,
  katalog_link,
  contact,
}) => {
  try {
    const PUT_SUBCATEGORIES = `
            with old_data as (
                select
                    id,
                    name,
                    media_link,
                    delivery_price,
                    katalog_link,
                    contact
                from company
                where id = 1
            )update company as comp set
                name = (
                    case
                        when length($1) > 1 then $1
                        else o.name
                    end),
                media_link = (
                    case
                        when length($2) > 1 then $2
                        else o.media_link
                    end),
                delivery_price = (
                    case
                        when $3 > 0 then $3
                        else o.delivery_price
                    end),
                katalog_link = (
                    case
                        when length($4) > 1 then $4
                        else o.katalog_link
                    end),
                contact = (
                    case 
                        when length($5) > 1 then $5
                        else o.contact
                    end
                )
                from old_data o
                where comp.id = 1
                returning comp.* 
        `;
    const result = await db(
      true,
      PUT_SUBCATEGORIES,
      name,
      media_link,
      delivery_price,
      katalog_link,
      contact
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  update,
};
