const db = require('../utils/pg.js');

const get = async ({ id }) => {
  try {
    const GET_DRIVER = `
      select
        *
      from
       drivers
      where status <> 'deleted'
    `;

    const GET_BY_PARAMS = `
      select 
        * 
      from 
        drivers d
      where d.id = $1 and d.status <> 'deleted'
        
   `;
    if (id) {
      const result = await db(true, GET_BY_PARAMS, id);
      return result;
    } else {
      const result = await db(false, GET_DRIVER);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const post = async ({ fullname, birthday, contact, car_number, car_name }) => {
  try {
    const POST_DRIVER = `
            insert into drivers(fullname, birthday, contact, car_number, car_name) values($1, $2, $3, $4, $5)
            returning *
        `;

    const result = await db(
      true,
      POST_DRIVER,
      fullname,
      birthday,
      contact,
      car_number,
      car_name
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async ({
  id,
  fullname,
  birthday,
  contact,
  car_number,
  car_name,
  status,
}) => {
  try {
    const UPDATE_DRIVER = `
            with old_data as (
                select 
                    id,
                    fullname,
                    birthday,
                    contact,
                    car_number,
                    car_name,
                    status
                from drivers
                where id = $1    
            ) update drivers as d set
                fullname = (
                    case
                        when length($2) > 1 then $2
                        else o.fullname
                    end    
                ),
                birthday = (
                    case
                        when length($3) > 1 then $3
                        else o.birthday
                    end    
                ),
                contact = (
                    case
                        when length($4) > 1 then $4
                        else o.contact
                    end    
                ),
                car_number = (
                    case
                        when length($5) > 1 then $5
                        else o.car_number
                    end    
                ),
                car_name = (
                    case
                        when length($6) > 1 then $6
                        else o.car_name
                    end    
                ),
                status = (
                    case
                      when ($7 = 'true' and o.status = 'enabled') then 'disabled'
                      when ($7 = 'true' and o.status = 'disabled') then 'enabled'
                      when ($7 = 'true' and o.status = 'deleted') then 'enabled'
                      else o.status
                    end
                )
            from old_data as o
            where d.id = $1
            returning d.*    
        `;

    const result = await db(
      true,
      UPDATE_DRIVER,
      id,
      fullname,
      birthday,
      contact,
      car_number,
      car_name,
      status
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleter = async ({ id }) => {
  try {
    const DELETE_DRIVER = `
            with old_data as (
                select 
                    id,
                    status
                from drivers
                where id = $1
            )update drivers as d set
                status = 'deleted'
            from old_data as o
            where d.id = $1
            returning d.* 
        `;

    const result = await db(true, DELETE_DRIVER, id);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
<<<<<<< HEAD
    get,
    post,
    update,
    deleter
}
=======
  get,
  post,
  update,
  deleter,
};
>>>>>>> 85ff0758f261c7df979f2df383e28326b135a99e
