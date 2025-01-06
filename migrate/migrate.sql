drop procedure if exists migrate;

DELIMITER $$
create procedure migrate (
  in value varchar(250)
) 
begin
  call createUsersClass(1);
  call createSys$classesClass(1);
end $$

DELIMITER ;

call migrate('yomame')