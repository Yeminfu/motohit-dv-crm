drop procedure if exists createTokensClass;

DELIMITER $$
create procedure createTokensClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_tokens (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      idUser int not null,
      token varchar(250) not null,
      confirmCode varchar(250) not null,
      deadline datetime not null
  );


  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_tokens','Токены', 2);

end $$
DELIMITER ;
