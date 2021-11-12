const db = require('../utils/pg.js');

const get = async ({ id }) => {
  try {
    const GET_PRODUCTS = `
      select
        * 
      from    
        sub_products
      where status <> 'deleted'  
    `;
    const GET_BY_PARAMS = `
      select 
        * 
      from 
        sub_products s
      where s.id=$1 and s.status <> 'deleted' 
    `;

    if (id) {
      const result = await db(true, GET_BY_PARAMS, id);
      return result;
    } else {
      const result = await db(false, GET_PRODUCTS);
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
const post = async ({ name, info, price, img_link, status, product_id }) => {
  try {
    console.log(status);
    const INSERT_SUB_PRODUCTS = `
           insert into sub_products(name,info,price,img_link,product_id)
           values($1,$2,$3,$4,$5)
           returning *
        `;
    const result = await db(
      true,
      INSERT_SUB_PRODUCTS,
      name,
      info,
      price,
      img_link,
      product_id
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
const delet = async ({ id }) => {
  try {
    const DELETE_SUB_PRODUCT = `
      with old_data as (
        select
            id,
            status
        from 
        sub_products
        where id = $1
    )update sub_products as c set
        status = 'deleted'
    from old_data as o 
    where c.id = $1
    returning c.*
      `;
    const result = await db(true, DELETE_SUB_PRODUCT, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};
const update = async ({
  id,
  name,
  info,
  price,
  img_link,
  status,
  product_id,
}) => {
  try {
    const UPDATE_SUB_PRODUCT = `
        with old_data as (
            select
                id,
                name,
                info,
                price,
                img_link,
                status,
                product_id
            from 
                sub_products
            where id = $1 
        )update sub_products as c set
            name = (
                case
                    when length($2) > 1 then $2
                    else o.name
                end
            ),
            info = (
                case
                    when length($3) > 1 then $3
                    else o.info
                end
            ),          
            price = (
                case
                    when $4 > 0 then $4
                    else o.price
                end
            ),
            img_link = (
                case
                    when length($5)>1 then $5
                    else o.img_link
                end
            ),
            status = (
                case 
                    when ($6='true' and o.status='disabled') then  'enabled'
                    when ($6='true' and o.status='enabled')  then 'disabled'
                    when ($6='true' and o.status='deleted')  then 'enabled'
                    else o.status
                end
            ),
            product_id = (
                case 
                    when ($7)>0 then $7
                    else o.product_id
                end
            )
        from old_data as o
        where c.id = $1
        returning c.* 
        `;
    const result = await db(
      true,
      UPDATE_SUB_PRODUCT,
      id,
      name,
      info,
      price,
      img_link,
      status,
      product_id
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  get,
  post,
  delet,
  update,
};
