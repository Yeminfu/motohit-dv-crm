drop procedure if exists createSys$proceduresClass;

DELIMITER $$
create procedure createSys$proceduresClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_sys$procedures (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      SQLString text not null,
      description text,
      idConfig int
  );

  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_sys$procedures','Процедуры',1);

end $$
DELIMITER ;
