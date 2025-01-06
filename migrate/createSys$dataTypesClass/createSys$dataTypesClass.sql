drop procedure if exists createSys$dataTypesClass;

DELIMITER $$
create procedure createSys$dataTypesClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists huyomboyom_sys$dataTypes (
    id int auto_increment primary key,
    created_date datetime default current_timestamp,
    name varchar(250) not null unique,
    lengthIsRequired bit not null
  );

  insert ignore into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_sys$dataTypes','Типы данных для колонок',1);

end $$
DELIMITER ;
