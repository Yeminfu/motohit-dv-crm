import ts_class4create from "#app/admin/config/types/ts_class4create.ts";
import insertClassToDB from "#app/admin/config/utils/insertClassToDB.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const jsonFromRequest: ts_class4create = await request.json();
  const res = await insertClassToDB(jsonFromRequest);
  return NextResponse.json(res);
}

/*
DELIMITER //
CREATE PROCEDURE
  createClass (
    IN className varchar(250),
    out id int
  )
BEGIN
  set @tableName = className;
  set @sql = CONCAT('CREATE TABLE ', @tableName, ' (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), age INT)');
  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

  insert into chbfs_sys$classes
  (className)
  values
  (className);
  SELECT LAST_INSERT_ID() AS id;
END//
*/
