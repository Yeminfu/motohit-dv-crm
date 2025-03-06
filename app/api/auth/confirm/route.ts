import dbWorker from "@/db/dbWorker2";
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
  const res = await dbWorker(
    `select token from ${process.env.TABLE_PREFIX}_tokens where confirmCode = ?`,
    [confirmCode]
  )
    .then(x => x.result)
    .then((x: any) => {
      if (x.length) return x.pop().token;
      return null;
    })
    .catch((error) => {
      console.error("err #fvfd8", error);
      return null;
    });
  return res;
}
