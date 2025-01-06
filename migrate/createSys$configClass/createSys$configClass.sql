drop procedure if exists createSys$configClass;

DELIMITER $$
create procedure createSys$configClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_sys$config;

  create table if not exists huyomboyom_sys$config (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      description text,
      idParent int
  );

  insert into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_sys$config','Базовая конфигурация',1);

  insert into huyomboyom_sys$config
  (name,title)
  values
  ('system','Базовая конфигурация');

end $$
DELIMITER ;
