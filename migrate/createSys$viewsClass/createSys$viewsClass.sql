drop procedure if exists createSys$viewsClass;

DELIMITER $$
create procedure createSys$viewsClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_sys$views (
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
  ('chbfs_sys$views','Представление (views)',1);

end $$
DELIMITER ;
