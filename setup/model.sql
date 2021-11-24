create database rocketman;

create table if not exists admins (
    id serial primary key,
    username varchar(64) not null,
    password varchar(64) not null,
    status varchar(120) not null default 'admin'
);

drop table categories;

create table if not exists categories (
    id serial primary key,
    name varchar(200) not null,
    tg_name varchar(50) not null,
    shop smallint not null default 1,
    status varchar(120) not null default 'active'
);


create table if not exists sub_categories (
    id serial primary key,
    name varchar(200) not null,
    amount int not null default 0,
    contact varchar(12) not null,
    address varchar(250) not null,
    status varchar(120) not null default 'enabled',
    category_id int not null references categories(id) on delete cascade
);

drop table products;

create table if not exists products (
    id serial primary key,
    name varchar(150),
    tg_name varchar(50),
    amount int default 1,
    status varchar(120) default 'enabled',
    sub_categories_id int not null references sub_categories(id) on delete cascade
);

create table if not exists sub_products (
    id serial primary key,
    name varchar(150),
    info varchar(250),
    price decimal(15, 2),
    img_link text,
    status varchar(120) default 'enabled',
    product_id int not null references products(id) on delete cascade
);

create table if not exists drivers (
    id serial primary key,
    fullname varchar(70) not null,
    birthday varchar(12) not null,
    contact varchar(12) not null,
    car_number varchar(11) not null,
    car_name varchar(30) not null,  
    status varchar(120) not null default 'enabled'
);


create table if not exists company (
    id serial primary key,
    name varchar(90) not null,
    media_link text not null,
    delivery_price decimal(15, 2) not null,
    katalog_link text not null,
    contact varchar(12) not null
);













-- create table if not exists users (
--     id serial primary key,
--     username varchar(60) not null,
--     contact varchar(13) not null,
--     status varchar(120) not null default 'active'
-- );

-- create table if not exists payment (
--     id serial primary key,
--     name varchar(40) not null,
--     telegram_button varchar(30) not null,
--     link text not null,
--     status varchar(120) not null default 'enabled'
-- );

-- create table if not exists offers (
--     id serial primary key,
--     created_at timestamp default current_timestamp,
--     offer text not null,
--     status varchar(120) not null default 'active',
--     user_id int not null references users(id)
-- );

create table if not exists orders (
    id serial primary key,
    created_at timestamp default current_timestamp,
    count int not null default 1,
    user_id int not null references users(id) on delete cascade,
    driver_id int not null references drivers(id) on delete cascade,
    sub_product_id int not null references sub_products(id) on delete cascade,
    payment_id int not null references payment(id) on delete cascade,
    status varchar(120) not null default 'no order'
);

