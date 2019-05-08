create table user_profile(
    user_id serial primary key,
    fname varchar(24) not null,
    lname varchar(12) not null,
    ubid varchar(12) unique not null,
    email varchar(50) unique not null,
    password varchar(60) not null,
    address1 varchar(60) not null,
    address2 varchar(60),
    city varchar(60),
    zip int not null,
    states varchar(2) not null,
    file_path varchar(60) default null,
    available BOOLEAN not null
);

CREATE TABLE categories(
category_id int unique not null primary key,
parent_id int,
category_name varchar(20) not null
);

insert into categories(category_id, parent_id, category_name)
values (1, null, 'Clothing');

insert into categories(category_id, parent_id, category_name)
values (2, null, 'Electronics');

insert into categories(category_id, parent_id, category_name)
values (3, null, 'Furnitures');

insert into categories(category_id, parent_id, category_name)
values (4, null, 'Cars');


create table items(
item_id serial primary key,
item_name varchar(50) not null,
time_post timestamp default current_timestamp,
description text,
availability boolean not null default 't',
price int not null,
file_path varchar(60) default null,
post_by int references user_profile(user_id),
item_category int references categories(category_id)
);

create table transaction(
item int references items(item_id),
from_user int references user_profile(user_id),
to_user int references user_profile(user_id),
transaction_date timestamp default current_timestamp
);

--some random input data--
insert into user_profile(fname, lname, ubid, email, password, address1, address2, city, zip, states, file_path, available)
values ('Chulsoo', 'Lim', 'limch', 'limch@buffalo.edu','sha1$f0e604d8$1$d7ae3e858408c66a29af59862a55e94183fc7260','277 American Campus Drive',null,'Amherst',12345,'NY','resource/images/member/limch.jpg','1');

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer1','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer2','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer3','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer4','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer5','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer6','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer7','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer8','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer9','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer10','This is pretty clean status',200,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Sofa1','This is pretty clean status',200,1,3);

insert into items(item_name,description,price,post_by,item_category)
values ('Sofa2','This is pretty clean status',200,1,3);

insert into items(item_name,description,price,post_by,item_category)
values ('Sofa3','This is pretty clean status',200,1,3);

insert into items(item_name,description,price,post_by,item_category)
values ('Sofa4','This is pretty clean status',200,1,3);

insert into items(item_name,description,price,post_by,item_category)
values ('Sofa5','This is pretty clean status',200,1,3);

insert into items(item_name,description,price,post_by,item_category)
values ('Jacket6','This is pretty clean status',200,1,1);

insert into items(item_name,description,price,post_by,item_category)
values ('Jacket7','This is pretty clean status',200,1,1);

insert into items(item_name,description,price,post_by,item_category)
values ('Jacket8','This is pretty clean status',200,1,1);

insert into items(item_name,description,price,post_by,item_category)
values ('Jacket9','This is pretty clean status',200,1,1);

insert into items(item_name,description,price,post_by,item_category)
values ('Jacket10','This is pretty clean status',200,1,1);

