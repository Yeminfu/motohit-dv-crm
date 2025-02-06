import ts_keyFromDB from "#app/admin/config/types/ts_keyFromDB.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_keyFromDB = await request.json();
  const res = await editKey(data);
  return NextResponse.json({ data, res });
}

async function editKey(key: ts_keyFromDB) {
  const sql = `
    update chbfs_sys$keys
      set
      name = ?,
      SQLString = ?,
      description = ?,
      title = ?,
      tableName = ?
    where id = ?;
    
    alter table ${key.tableName}
    drop index ${key.name}; 

    ${key.SQLString};
  `;
  const res = await dbWorker(sql, [
    key.name,
    key.SQLString,
    key.description,
    key.title,
    key.tableName,
    key.id,
  ]);
  return res;
}
