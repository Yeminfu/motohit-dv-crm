drop procedure if exists createSys$proceduresClass;

DELIMITER $$
create procedure createSys$proceduresClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_sys$procedures;

  create table if not exists huyomboyom_sys$procedures (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      SQLString text not null,
      description text,
      idConfig int
  );

  insert into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_sys$procedures','Процедуры',1);

end $$
DELIMITER ;

--call createSys$proceduresClass(1)
