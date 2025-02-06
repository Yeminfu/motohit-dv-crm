drop procedure if exists createSys$functionsClass;

DELIMITER $$
create procedure createSys$functionsClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_sys$functions (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      description text,
      idConfig int not null
  );

  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_sys$functions','Скалярные функции',1);


end $$
DELIMITER ;
