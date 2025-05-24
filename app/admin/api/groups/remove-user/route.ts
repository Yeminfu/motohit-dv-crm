import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const sql = `
    delete from chbfs_sys$groupsAndUsers
    where 
      idGroup = ?
      and idUser = ?
  `;

  const response = await dbWorker(sql, [data.idGroup, data.idUser]);

  return NextResponse.json(response);
}
