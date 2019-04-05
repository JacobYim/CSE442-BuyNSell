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
    file_path varchar(60),
    available BOOLEAN not null
);

create table items(
item_id serial primary key,
item_name varchar(50) not null,
time_post timestamp default current_timestamp,
description text,
availability boolean not null default 't',
price int not null,
post_by int references user_profile(user_id)
--item_category varchar(20) references categories(category_id)
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
-- insert into user_profile(ubid, email, username, password)
-- values ('50187324', 'something@buffalo.edu', 'something', 'randompassword');
-- insert into user_profile(ubid, email, username, password)
-- values ('50217474', 'someoneelse@buffalo.edu', 'BuyEverything', 'anotherrandompassword');

--ignore this part for now, work on it until we start working on item database
--insert into items(item_id, description, post_by)
--values (1, 'testing 123', '50166666');
--insert into items(item_id, description, post_by)
--values (2, 'test 123', '50187324');
--insert into items(description, post_by)
--values ('some 666666 item', '50166666');
--insert into items(description, post_by)
--values ('i want to sell this shit', '50187324');

--insert into transaction(item, from_user, to_user)
--values (2, '50166666', '50217474');
--insert into transaction(item, from_user, to_user)
--values (3, '50187324', '50217474');