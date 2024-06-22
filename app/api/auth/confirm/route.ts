import dbConnection from "@/db/connect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();
  const token = await getToken(code);
  if (token)
    return NextResponse.json({
      success: true,
      token,
    });
  return NextResponse.json({
    success: false,
  });
}

async function getToken(confirmCode: number) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `select token from ${process.env.TABLE_PREFIX}_tokens where confirmCode = ?`,
      [confirmCode]
    )
    .then(([x]: any) => {
        console.log('xxx234',x);
        
      if (x.length) return x.pop().token;
      return null;
    })
    .catch((error) => {
      console.log("err #fvfd8", error);
      return null;
    });
  await connection.end();
  return res;
}
