drop procedure if exists migrate;

delimiter $$
create procedure migrate (
  in value varchar(250)
)
begin
  call createSys$classesClass(1);
  call createSys$configClass(1);
  call createSys$proceduresClass(1);
end $$

delimiter ;

call migrate(1);