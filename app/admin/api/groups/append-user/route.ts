import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  // const { isGroup, idUser } = data;

  const sql = `
    insert into chbfs_sys$groupsAndUsers
    (idGroup, idUser)
    values
    (?, ?)
  `;

  const response = await dbWorker(sql, [data.idGroup, data.idUser]);

  return NextResponse.json(response);
}
