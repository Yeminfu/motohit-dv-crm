drop procedure if exists createSys$viewsClass;

DELIMITER $$
create procedure createSys$viewsClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_sys$views;

  create table if not exists huyomboyom_sys$views (
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
  ('huyomboyom_sys$views','Представление (views)',1);

end $$
DELIMITER ;
