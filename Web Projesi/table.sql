create table tbl_user
(
    userId int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE  (email)
);


insert into tbl_user(name, contactNumber, email, password, status, role) values
                    ('Admin', '1231231231', 'admin@gmail.com', 'admin', 'true', 'admin');
                    
insert into tbl_user(name, contactNumber, email, password, status, role) values
                    ('omer', '9876543210', 'omer.yilmaz2700@gmail.com', 'omer123', 'true', 'user');


create  table tbl_category
(
    categoryId int NOT NULL AUTO_INCREMENT,
    name varchar(100),
    primary key(categoryId)
);