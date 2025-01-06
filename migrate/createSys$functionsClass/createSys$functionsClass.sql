drop procedure if exists createSys$functionsClass;

DELIMITER $$
create procedure createSys$functionsClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_sys$functions;

  create table if not exists huyomboyom_sys$functions (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      description text,
      idConfig int not null
  );

  insert into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_sys$functions','Скалярные функции',1);


end $$
DELIMITER ;
