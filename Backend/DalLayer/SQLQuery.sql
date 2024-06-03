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
--0 means private acess 1 means public 

create table Groups (
[group_id] int constraint pk_groupid primary key identity(1,1),
[group_name] varchar(50) not null,
[group_admin] int not null,
[member_count] int default 0,
[visibility] int default 1,
[write_access] int default 1,
[profile_url] varchar(255) ,
[date_created] datetime  default getdate(),
[description] varchar(500) ,
[vice_admin] int 





)

create table [GroupJoined](

[id] int primary Key identity(1,1),
[group_id] int not null,
[user_id] int not null,
[date_joined] datetime not null


);



-- table for group messages 
create table [GroupMessages](

[Id] int  constraint pk_groupMessageId Primary Key  Identity(1,1),
[msg] varchar(max) NOT NULL ,
[groupId] int constraint fk_groupid references Groups([group_id]),
[sendersId] int constraint fk_sendersId references Users([Id]),
[time] datetime  default GETDate()




)


-- table for storing one to one chat messages 
create table [UserMessages](

[Id] int  constraint pk_userMessageId Primary Key  Identity(1,1),
[msg] varchar(max) NOT NULL ,
[recieversId] int constraint fk_recieversId references Users([Id]),
[sendersId] int constraint fk_sendersIdUser references Users([Id]),
[time] datetime  default GETDate()




)