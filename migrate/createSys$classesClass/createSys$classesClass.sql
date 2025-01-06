drop procedure if exists createSys$classesClass;

DELIMITER $$
create procedure createSys$classesClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_sys$classes;

  create table if not exists huyomboyom_sys$classes (
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
  ('huyomboyom_sys$classes','Базовые классы',1);


end $$
DELIMITER ;
