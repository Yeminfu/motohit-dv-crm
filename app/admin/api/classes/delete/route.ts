import { NextRequest, NextResponse } from "next/server";
import ts_class4delete from "./types/ts_class4delete";
import deleteClassFromDB from "./utils/deleteClassFromDB";

export async function POST(request: NextRequest) {
  const jsonFromRequest: ts_class4delete = await request.json();

  const res = await deleteClassFromDB(jsonFromRequest.name);

  return NextResponse.json(res);
}

/*
delimiter //
create procedure
  dropClass (
    in className varchar(250),
    out id int
  )
begin
  set @className = className;
  set @sql = concat('drop table ', @className);
  prepare stmt from @sql;
  execute stmt;
  deallocate prepare stmt;

  delete from chbfs_sys$classes where className = @className;
end//
*/
