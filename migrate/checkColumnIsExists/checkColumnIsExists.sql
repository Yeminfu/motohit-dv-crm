
drop function if exists checkColumnIsExists;

DELIMITER //

CREATE FUNCTION checkColumnIsExists(a INT, b INT)
RETURNS INT
DETERMINISTIC
BEGIN
    SET @count = 0;

    SELECT count(1) 
    INTO @count
    FROM information_schema.COLUMNS 
    where
    TABLE_NAME = 'huyomboyom_sys$config'
    and COLUMN_NAME = 'id';

    return @count;
END //

DELIMITER ;