
drop function if exists checkColumnIsExists;

DELIMITER //

CREATE FUNCTION checkColumnIsExists(tableName varchar(250), colName varchar(250))
RETURNS INT
DETERMINISTIC
BEGIN
    SET @count = 0;
    SET @tableName = tableName;
    SET @colName = colName;

    SELECT count(1) 
    INTO @count
    FROM information_schema.COLUMNS 
    where
    TABLE_NAME = @tableName
    and COLUMN_NAME = @colName;

    return @count;
END //

DELIMITER ;