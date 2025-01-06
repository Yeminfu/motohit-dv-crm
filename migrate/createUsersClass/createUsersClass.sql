drop procedure if exists createUsersClass;

DELIMITER $$
create procedure createUsersClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_users;

  create table if not exists huyomboyom_users (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      is_active boolean not null default 1,
      name varchar(250) not null,
      telegram_username varchar(250) not null unique,
      tg_chat_id bigint unique,
      is_boss int not null
  );

end $$
DELIMITER ;
