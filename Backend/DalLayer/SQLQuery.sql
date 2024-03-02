create database TaskApp;
use TaskApp;




-- user tabel creation query
create table Users(

[Id] int  constraint pk_UserName Primary Key  Identity(1,1),
[user_name] varchar(255) constraint unique_userName not null unique,
[password] varchar(255) not null,
[dob] date constraint chk_dob check(Datediff(year,dob,getDate())>=18),
[emailId] varchar(255) not null unique,
[role] varchar(10) constraint default_role default 'user',
[followers_count] int default 0,





);


--0 means no acess 1 means acess granted
create table [Group](
[id] int constraint pk_id Primary Key identity(1,1),
[admin_user_id] int not null,
[rating] int default 0,
[member_count] int default 1,
[access_read] int default 1,
[access_write] int default 0,
[LastUpdatedTime] datetime NOT NULL,
);


create table [GroupJoined](

[id] int primary Key identity(1,1),
[group_id] int not null,
[user_id] int not null,
[date_joined] datetime not null


);

