const db = require('../utils/pg.js');

const get = async ({ param }, { id }) => {
  try {
    const GET_BY_PARAMS = `
      select
        id,
        name,
        amount,
        contact,
        address,
        status
      from
        sub_categories
      where id = $1 and status <> 'deleted'
    `;

    const GET_BY_QUERY = `
      select
        p.id,
        p.name,
        p.amount,
        p.status
      from    
        sub_categories sc
      join products p on sc.id = p.id
      where p.id = $1 and p.status <> 'deleted'
    `;

    const GET_SUBCATEGORIES = `
      select
        id,
        name,
        amount,
        contact,
        address,
        status
      from 
        sub_categories
      where status <> 'deleted'
        `;
    if (param) {
      const result = await db(true, GET_BY_PARAMS, param);
      return result;
    } else if (id) {
      const result = await db(true, GET_BY_QUERY, id);
      return result;
    } else {
      const result = await db(false, GET_SUBCATEGORIES);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const post = async ({ name, amount, contact, address, category_id }) => {
  try {
    const POST_SUBCATEGORIES = `
            insert into sub_categories(name, amount, contact, address, category_id)values($1, $2, $3, $4, $5)
            returning *
        `;

    const result = await db(
      true,
      POST_SUBCATEGORIES,
      name,
      amount,
      contact,
      address,
      category_id
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const put = async ({
  id,
  name,
  amount,
  contact,
  address,
  status,
  category_id,
}) => {
  try {
    const PUT_SUBCATEGORIES = `
            with old_data as (
                select
                    id,
                    name,
                    amount,
                    contact,
                    address,
                    status,
                    category_id
                from sub_categories
                where id = $1
            )update sub_categories scb set
                name = (
                    case
                        when length($2) > 1 then $2
                        else o.name
                    end),
                amount = (
                    case
                        when $3 > 0 then $3
                        else o.amount
                    end),
                contact = (
                    case
                        when length($4) > 0 then $4
                        else o.contact
                    end),
                address = (
                    case
                        when length($5) > 0 then $5
                        else o.address
                    end),
                status = (
                    case 
                        when ($6='true' and o.status='disabled') then  'enabled'
                        when ($6='true' and o.status='enabled')  then 'disabled'
                        when ($6='true' and o.status='deleted')  then 'enabled'
                        else o.status
                    end
                ),
                category_id = (
                    case
                        when $7 > 0 then $7
                        else o.category_id
                    end)
                from old_data o
                where scb.id = $1
                returning scb.* 
        `;
    const result = await db(
      true,
      PUT_SUBCATEGORIES,
      id,
      name,
      amount,
      contact,
      address,
      status,
      category_id
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleted = async ({ id }) => {
  try {
    const DELETE_SUBCATEGORY = `
        with old_data as (
            select
                id,
                status
            from 
            sub_categories
            where id = $1
        )update sub_categories as c set
            status = 'deleted'
        from old_data as o 
        where c.id = $1
        returning c.*
    `;

    const result = await db(true, DELETE_SUBCATEGORY, id);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
  post,
  put,
  deleted,
};