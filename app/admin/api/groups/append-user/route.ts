import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const sql = `
    insert into chbfs_sys$groupsAndUsers
    (idGroup, idUser)
    values
    (?, ?)
  `;

  const response = await dbWorker(sql, [data.idUser, data.idGroup]);

  return NextResponse.json(response);
}
