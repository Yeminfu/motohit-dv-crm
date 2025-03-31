import dbWorker from "@/db/dbWorker2";
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
  const isValid = await dbWorker(
    `
      select
        *
      from ${process.env.TABLE_PREFIX}_tokens T
        inner join chbfs_users as U on U.id = T.idUser and U.is_active = 1
      where
        T.token = ?
      and T.deadline > NOW() `,
    [token]
  )
    .then(x => x.result)
    .then((x: any) => {
      if (x.length) return true;
      return false;
    });

  return isValid;
}
