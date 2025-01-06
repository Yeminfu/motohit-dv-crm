drop procedure if exists createSys$fieldsClass;

DELIMITER $$
create procedure createSys$fieldsClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists huyomboyom_sys$fields (
    id int auto_increment primary key,
    created_date datetime default current_timestamp,
    name varchar(250) not null unique,
    params varchar(250) not null,
    idClass int not null
  );

  insert ignore into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_sys$fields','Колонки (поля) классов',1);




end $$
DELIMITER ;
