            with old_data as (
                select
                    id,
                    username,
                    password
                from 
                    admins
                where id = 5
            )update admins as a set
                username = (
                    case
                        when length('doniyor') > 1 then 'doniyor'
                        else o.username
                    end
                ),
                password = (
                    case
                        when length('11111') > 1 then '11111'
                        else o.password
                    end
                )
            from old_data as o 
            where a.id = 5
            returning a.*;

            with old_data as (
                select
                    id,
                    status
                from 
                    admins
                where id = $1
            )update admins as a set
                status = 'not active'
            from old_data as o 
            where a.id = $1
            returning a.*;


            -- select
            --     id,
            --     status
            -- from
            --     admins
            -- where id = 6
            -- update 
            --     admins as a 
            -- set
            --     status = 'not active'
            -- where a.id = 6
            -- returning a.*;