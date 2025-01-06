
drop function if exists checkColumnIsExists;

DELIMITER //

CREATE FUNCTION checkColumnIsExists(tableName varchar(250), colName varchar(250))
returns boolean
deterministic
begin
    set @count = 0;
    set @tableName = tableName;
    set @colName = colName;

    select count(1) 
    into @count
    from information_schema.COLUMNS 
    where
    TABLE_NAME = @tableName
    and COLUMN_NAME = @colName;

    return @count > 0;
END //

DELIMITER ;
