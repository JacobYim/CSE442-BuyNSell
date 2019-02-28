create table user_profile(
ubid varchar(12) unique not null primary key,
email varchar(50) unique not null,
username varchar(50) unique not null,
password varchar(50) not null,
age int not null
);

create table items(
item_id serial primary key,
time_post timestamp on default current_timestamp,
description text,
availability boolean not null default 't',
post_by int(12) references user_profile(ubid)
);

create table transaction(
item int references items(item_id),
from_user varchar(12) references user_profile(ubid),
to_user varchar(12) references user_profile(ubid),
transaction_date timestamp on default current_timestamp
);

--some random input data--
insert into user_profile(ubid, email, username, password, age)
values ('50166666', 'mrliu@buffalo.edu', 'mr666', '666666', 66);
insert into user_profile(ubid, email, username, password, age)
values ('50187324', 'something@buffalo.edu', 'something', 'randompassword', 21);
insert into user_profile(ubid, email, username, password, age)
values ('50217474', 'someoneelse@buffalo.edu', 'BuyEverything', 'anotherrandompassword', '20');

insert into items(description, post_by)
values ('some 666666 item', '50166666');
insert into items(description, post_by)
values ('i want to sell this shit', '50187324');

insert into transaction(item, from_user, to_user)
values (2, '501666666', '50217474');
insert into transaction(item, from_user, to_user)
values (3, '50187324', '50217474');
