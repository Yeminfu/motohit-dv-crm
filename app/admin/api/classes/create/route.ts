import ts_class4create from "#app/admin/config/types/ts_class4create.ts";
import insertClassToDB from "#app/admin/config/utils/insertClassToDB.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const jsonFromRequest: ts_class4create = await request.json();
  const res = await insertClassToDB(jsonFromRequest);
  return NextResponse.json(res);
}

/*
delimiter //
create procedure
  createClass (
    in className varchar(250),
    out id int
  )
begin
  set @tableName = className;
  set @sql = concat('create table ', @tableName, ' (id int auto_increment primary key, name varchar(100))');
  prepare stmt from @sql;
  execute stmt;
  deallocate prepare stmt;

  insert into chbfs_sys$classes
  (className)
  values
  (className);
  select last_insert_id() as id;
end//
*/
