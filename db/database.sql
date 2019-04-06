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
values (1, null, 'Fashion');

insert into categories(category_id, parent_id, category_name)
values (2, null, 'Electronics');

insert into categories(category_id, parent_id, category_name)
values (3, null, 'Books');

insert into categories(category_id, parent_id, category_name)
values (4, null, 'Home');

insert into categories(category_id, parent_id, category_name)
values (5, null, 'Sports & Outdoor');

insert into categories(category_id, parent_id, category_name)
values (6, null, 'Music');

-- insert into categories(category_id, parent_id, category_name)
-- values (7, 1, 'Clothing');

-- insert into categories(category_id, parent_id, category_name)
-- values (8, 7, 'Men');

-- insert into categories(category_id, parent_id, category_name)
-- values (9, 7, 'Women');

-- insert into categories(category_id, parent_id, category_name)
-- values (10, 2, 'Computer & Accessories');

-- insert into categories(category_id, parent_id, category_name)
-- values (11, 2, 'Cell Phone & Accessories');

-- insert into categories(category_id, parent_id, category_name)
-- values (12, 2, 'Video Games');

-- insert into categories(category_id, parent_id, category_name)
-- values (13, 2, 'TV & Home Audio');

-- insert into categories(category_id, parent_id, category_name)
-- values (14, 3, 'Textbook');

-- insert into categories(category_id, parent_id, category_name)
-- values (15, 3, 'Comics');

-- insert into categories(category_id, parent_id, category_name)
-- values (15, 3, 'Novel');

-- insert into categories(category_id, parent_id, category_name)
-- values (16, 15, 'Top Sellers');

-- insert into categories(category_id, parent_id, category_name)
-- values (17, 15, 'Romance');

-- insert into categories(category_id, parent_id, category_name)
-- values (18, 15, 'Business & Investing');

-- insert into categories(category_id, parent_id, category_name)
-- values (19, 4, 'Furniture');

-- insert into categories(category_id, parent_id, category_name)
-- values (20, 4, 'Kitchen');

-- insert into categories(category_id, parent_id, category_name)
-- values (21, 4, 'Lawn & Garden');

-- insert into categories(category_id, parent_id, category_name)
-- values (22, 4, 'Home Improvement');

-- insert into categories(category_id, parent_id, category_name)
-- values (23, 5, 'Sports & Fitness');

-- insert into categories(category_id, parent_id, category_name)
-- values (24, 5, 'Cycling');

-- insert into categories(category_id, parent_id, category_name)
-- values (25, 5, 'Skateboards');

-- insert into categories(category_id, parent_id, category_name)
-- values (26, 5, 'Camping & Hiking');

-- insert into categories(category_id, parent_id, category_name)
-- values (27, 5, 'Sports & Fitness');

-- insert into categories(category_id, parent_id, category_name)
-- values (28, 6, 'Musical Instruments');

-- insert into categories(category_id, parent_id, category_name)
-- values (29, 6, 'Band Posters');

-- insert into categories(category_id, parent_id, category_name)
-- values (30, 6, 'CDs');

-- insert into categories(category_id, parent_id, category_name)
-- values (31, 28, 'Guitars & Amps');

-- insert into categories(category_id, parent_id, category_name)
-- values (31, 28, 'Piano & Keyboards');

-- insert into categories(category_id, parent_id, category_name)
-- values (31, 28, 'Recording');

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
values ('Laptop Computer2','This is pretty clean status',120,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer3','This is pretty clean status',300,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer4','This is pretty clean status',260,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer5','This is pretty clean status',210,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer6','This is pretty clean status',900,1,2);

insert into items(item_name,description,price,post_by,item_category)
values ('Laptop Computer7','This is pretty clean status',210,1,2);

