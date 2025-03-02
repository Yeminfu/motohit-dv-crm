drop procedure if exists createSys$classesClass;

DELIMITER $$
create procedure createSys$classesClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_sys$classes (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      name varchar(250) not null unique,
      title varchar(250) not null,
      description text,
      idConfig int not null
  );

  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_sys$classes','Базовые классы',1);


 






/*
  drop table if exists fieldsStrings;
  CREATE TABLE fieldsStrings (
    fieldName varchar(255) not null,
    params varchar(255) not null
  );
  INSERT INTO fieldsStrings (fieldName, params) VALUES 

    ('id','int auto_increment primary key'),
    ('created_date','datetime default current_timestamp'),
    ('name','varchar(250) not null unique'),
    ('title','varchar(250) not null'),
    ('description','text'),
    ('idConfig','int not null');

  select 
    -- concat(
    --   '',
    --   fieldName,
    --   params
    -- ),1
    '' as command
    ,fieldName
    ,params
  from fieldsStrings;
  drop table fieldsStrings;


  
  INSERT INTO users (id, name, email)
  VALUES (1, 'Иван', 'ivan@example.com')
  ON DUPLICATE KEY UPDATE
  name = VALUES(name), email = VALUES(email);
*/






/*
  if checkColumnIsExists('chbfs_sys$classes','id') <> 1 
   then
     ALTER TABLE chbfs_sys$classes
     ADD COLUMN id int auto_increment primary key;
  end if;

  if checkColumnIsExists('chbfs_sys$classes','created_date') <> 1 
   then
     ALTER TABLE chbfs_sys$classes
     ADD COLUMN created_date datetime default current_timestamp;
  end if;
*/
end $$
DELIMITER ;
