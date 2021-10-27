create database Project;

create table superadmin(
    username varchar(36) not null,
    password varchar(36) not null
);

insert into superadmin (username, password) values ('admin', 'admin11');

create table admins(
    user_id serial primary key,
    username varchar(36) not null,
    password varchar(36) not null
);

insert into admins (username, password) values ('abdullo', '123');

create table category(
    category_id serial primary key,
    category_name varchar(256) not null,
    category_status boolean not null
);

insert into category(category_name, category_status) values
('Texnika', true),
('Gullar', true),
('Kiyimlar', false),
('Telefonlar', true),
('Oziq-ovqat', true);

create table subCategory(
    subCategory_id serial primary key,
    subCategory_name varchar(256) not null,
    subCategory_goods smallint not null,
    subCategory_phone varchar(36) not null,
    subCategory_address varchar(256) not null,
    subCategory_isActive boolean not null,
    category_id int references category(category_id)

);

insert into subCategory(subCategory_name, subCategory_goods, subCategory_phone, subCategory_address,subCategory_isActive, category_id) values
('Evos',  7  , '998941710000', 'Abay street', true, 1),
('Oqtepa lavash', 10, '998941710000', 'A.Navoiy street', false, 1),
('MaxWay', 7, '998941700001', 'Shirin street', true, 1),
('KFC', 18, '998949990000', 'Chilonzor street', true, 1),
('Chopar Pizza', 13, '998990010000', 'Sebzor street', true, 1),
('Texnomart', 57, '998887750000', 'Mirobod street', true, 2),
('Artel', 68, '998941710000', 'Algoritm street', true, 2),
('HOFFMAN', 12, '998941710000', 'Abay street', true, 2),
('TechnoShop', 12, '998941710000', 'Abu Sahiy 7/24', true, 2),
('Flowers', 44, '998941710000', 'Chilonzor street', true, 3);


create table childSubCategory(
    childSubCategory_id serial primary key,
    childSubCategory_name varchar(36) not null,
    childSubCategory_count int not null,
    childSubCategory_isActive boolean not null,
    subCategory_id int references subCategory(subCategory_id)
); 

insert into childSubCategory(childSubCategory_name, childSubCategory_count, childSubCategory_isActive, subCategory_id) values
('Pizza', 9, true, 2),
('Lavash', 7, true, 1),
('Gamburger', 0, false, 1),
('Ichimliklar', 4, true, 1),
('Lavash', 7, true, 1);

create table productSubCategory(
    productSubCategory_id serial primary key,
    productSubCategory_name varchar(36) not null,
    productSubCategory_title varchar(256) not null,
    productSubCategory_price varchar(36) not null,
    productSubCategory_isActive boolean not null,
    childSubCategory_id int references childSubCategory(childSubCategory_id)
);

insert into productSubCategory(productSubCategory_name, productSubCategory_title, productSubCategory_price, productSubCategory_isActive, childSubCategory_id) values
('Lavash mini', 'Shaurma sotib olinadigan turdagisiga o’xshash bo’lishi va undan go’sht va sabzavot sharbatlari chiqib ketmasligi uchun, uni qanday qilib lavashga o’rash kerakligini o’rganish muhimdir. Dastavval lavash xamirini stol ustiga yoyish va biroz suv sepish kerak.', '20 000', true, 1),
('Lavash mini(pishloq)', 'Shaurma sotib olinadigan turdagisiga o’xshash bo’lishi va undan go’sht va sabzavot sharbatlari chiqib ketmasligi uchun, uni qanday qilib lavashga o’rash kerakligini o’rganish muhimdir. Dastavval lavash xamirini stol ustiga yoyish va biroz suv sepish kerak.', '20 000', false,1),
('Lavash', 'Shaurma sotib olinadigan turdagisiga o’xshash bo’lishi va undan go’sht va sabzavot sharbatlari chiqib ketmasligi uchun, uni qanday qilib lavashga o’rash kerakligini o’rganish muhimdir. Dastavval lavash xamirini stol ustiga yoyish va biroz suv sepish kerak.', '20 000', true,1),
('Lavash big', 'Shaurma sotib olinadigan turdagisiga o’xshash bo’lishi va undan go’sht va sabzavot sharbatlari chiqib ketmasligi uchun, uni qanday qilib lavashga o’rash kerakligini o’rganish muhimdir. Dastavval lavash xamirini stol ustiga yoyish va biroz suv sepish kerak.', '20 000', true,1);





create table add_product(
    add_product_id serial primary key,
    add_product_name varchar(30) not null,
    add_product_title text not null,
    add_product_link text not null,
    add_product_price int not null,
    category_id int references category(category_id),
    subCategory_id int references subCategory(subCategory_id),
    childSubCategory_id int references childSubCategory(childSubCategory_id),
    productSubCategory_id int references productSubCategory(productSubCategory_id)
);


insert into add_product(add_product_name,
                        add_product_title,
                        add_product_link,
                        add_product_price,
                        category_id,
                        subCategory_id,
                        childSubCategory_id,
                        productSubCategory_id    
) values
(
    'Pepperoni pitsasi',
    'Pepperoni pitsasi: kolbasa, pishloq, pomidor sousi',
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2FPizzaHutTanzania%2Fposts%2F2100751530193859%3Fcomment_id%3D2167026840232994%26reply_comment_id%3D2168809623388049%26comment_tracking%3D%257B%2522tn%2522%253A%2522R9%2522%257D&psig=AOvVaw0AuiSW5TiAKtfbVuy1HSzI&ust=1635314712797000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiUmJq05_MCFQAAAAAdAAAAABAD',
    '55000',
    1,
    2,
    1,
    1
);







create table drivers(
    driver_id serial primary key,
    driver_fullname varchar(60) not null,
    driver_birthday varchar(30) not null,
    driver_phone varchar(12) not null,
    driver_number varchar(12) not null,
    driver_type varchar(30) not null,
    driver_isActive boolean not null
);

insert into drivers(driver_fullname,
                    driver_birthday,
                    driver_phone, 
                    driver_number,
                    driver_type, 
                    driver_isActive) values
    ('Alijon','11.11.1989','998951252525','01 A 001 AA','Nexia',true),
    ('nodir','11.11.2001','998951252525','01 A 002 AA','Matiz',false),
    ('habib','11.11.1989','998951252525','01 A 003 AA','Cobalt',true)
    ;

create table company(
    company_name varchar(36) not null,
    company_media_link text not null,
    company_delivery int not null,
    company_catalog_link text not null,
    company_phone varchar(12) not null 
);


insert into company( company_name, 
                    company_media_link, 
                    company_delivery, 
                    company_catalog_link, 
                    company_phone) values
                    ('Rocketman',
                    'http://Rocketman.uz',
                    '12000',
                    'http://Rocketman.uz',
                    '998900001000'
                    );


with old_data as (
                            select
                                category_id,
                                category_name,
                            from category
                            where category_id = $1
                        ) update category c set
                            category_name = (
                            case
                                when length($2) > 1 THEN $2
                                else o.category_name
                            end
                            )
                        from old_data o
                        where c.category_id = $1
                        returning c.*