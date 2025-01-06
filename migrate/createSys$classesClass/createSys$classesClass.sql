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

  /*
  drop table huyomboyom_users;
  */

end $$
DELIMITER ;

--call createSys$classesClass(1)


-- set @count

-- SELECT @count:=COUNT(*) 
-- FROM information_schema.COLUMNS 
-- WHERE TABLE_NAME = 'chbfs_users' 
-- AND COLUMN_NAME = 'id';

-- select @count 