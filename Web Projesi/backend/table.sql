----------------------------------------------------------------
-- CREATING TABLES --
----------------------------------------------------------------
create table tbl_user
(
    userId int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    isActive varchar(20),
    role varchar(20),
    UNIQUE  (email)
);

create  table tbl_category
(
    categoryId int NOT NULL AUTO_INCREMENT,
    name varchar(100),
    primary key(categoryId)
);

create  table tbl_game
(
    gameId int NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    description varchar(200),
    price int,
    isActive varchar(10),
    categoryId int NOT NULL,
    primary key(gameId)
);
/*
create  table tbl_bill
(
    billId int NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    email varchar(200),
    contactNumber varchar(60) NOT NULL,
    paymentMethod varchar(60) NOT NULL,
    total int NOT NULL,
    createdBy varchar(60) NOT NULL,
    primary key(billId)
);
*/
----------------------------------------------------------------
--ADDING DATAS--
----------------------------------------------------------------

--USER--

insert into tbl_user(name, contactNumber, email, password, isActive, role) values
                    ('Admin', '1231231231', 'admin@gmail.com', 'admin', 'true', 'admin');

insert into tbl_user(name, contactNumber, email, password, isActive, role) values
                    ('omer', '9876543210', 'omer.yilmaz2700@gmail.com', 'omer123', 'true', 'user');

--CATEGORY--

insert into tbl_category (name) values ("2D Platformer");

--GAME--
insert into tbl_game (name, description, price, isActive, categoryId) values
                     ("Foxy","Help Foxy to save the Forrest!!!", 20,'true',1);

