drop procedure if exists createSys$configClass;

DELIMITER $$
create procedure createSys$configClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_sys$config (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      description text,
      idParent int
  );

  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_sys$config','Базовая конфигурация',1);

  insert ignore into chbfs_sys$config
  (name,title)
  values
  ('system','Базовая конфигурация');

end $$
DELIMITER ;
