
drop function if exists checkColumnIsExists;

DELIMITER //

CREATE FUNCTION checkColumnIsExists(tableName varchar(250), b INT)
RETURNS INT
DETERMINISTIC
BEGIN
    SET @count = 0;
    SET @tableName = tableName;

    SELECT count(1) 
    INTO @count
    FROM information_schema.COLUMNS 
    where
    TABLE_NAME = @tableName
    and COLUMN_NAME = 'id';

    return @count;
END //

DELIMITER ;