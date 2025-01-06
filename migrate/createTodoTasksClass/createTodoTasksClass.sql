drop procedure if exists createTodoTasksClass;

DELIMITER $$
create procedure createTodoTasksClass (
  in value varchar(250)
) 
begin

  set @value = value;

  drop table if exists huyomboyom_todoTasks;

  create table if not exists huyomboyom_todoTasks (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      title varchar(250) not null,
      description text not null,
      done boolean not null default 0
  );

  insert ignore into huyomboyom_sys$classes
  (name,title,idConfig)
  values
  ('huyomboyom_todoTasks','Задачи',2);

  insert ignore into huyomboyom_sys$config
  (name,title)
  values
  ('todoTasks','Задачи');

end $$
DELIMITER ;
