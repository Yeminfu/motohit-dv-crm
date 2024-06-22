import dbConnection from "@/db/connect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  const token = requestData.token;

  const tokenIsValid = await checkTokenIsValid(token);
  if (tokenIsValid) {
    return NextResponse.json({
      success: true,
    });
  } else {
    return new Response(null, {
      status: 401,
    });
  }
}

async function checkTokenIsValid(token: string) {
  const connection = await dbConnection();
  const isValid = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_tokens where token = ? and deadline > NOW() `,
      [token]
    )
    .then(([x]: any) => {
      if (x.length) return true;
      return false;
    });

  await connection.end();
  return isValid;
}
