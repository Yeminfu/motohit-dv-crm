import dbWorker from "@/db/dbWorker2";
import { NextResponse } from "next/server";

export async function GET() {
  const codes = await dbWorker(`
    select
      u.name,
      t.confirmCode 
    from chbfs_tokens as t
      inner join chbfs_users as u on u.id = t.idUser 
    where
      t.deadline  > CURDATE()
      and u.id>1;
    `, []).then(x=>x.result);
  return NextResponse.json(codes);
  return NextResponse.json({ i: 1239 })
}
