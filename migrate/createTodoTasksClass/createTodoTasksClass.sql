drop procedure if exists createTodoTasksClass;

DELIMITER $$
create procedure createTodoTasksClass (
  in value varchar(250)
) 
begin

  set @value = value;

  create table if not exists chbfs_todoTasks (
      id int auto_increment primary key,
      created_date datetime default current_timestamp,
      title varchar(250) not null,
      description text not null,
      done boolean not null default 0
  );

  set @tasksConfigName = 'todoTasks';

  insert ignore into chbfs_sys$config
  (name,title)
  values
  (@tasksConfigName,'Задачи');

  set @idTasksConfig = (
    select 
      id
    from chbfs_sys$config
    where
      name COLLATE utf8mb4_unicode_ci = @tasksConfigName
  );

  insert ignore into chbfs_sys$classes
  (name,title,idConfig)
  values
  ('chbfs_todoTasks','Задачи',@idTasksConfig);



end $$
DELIMITER ;
