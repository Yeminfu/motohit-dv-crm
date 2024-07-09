import dbConnection from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, telegram_username } = await req.json();
  console.log(name, telegram_username);
  const res = await createUser(name, telegram_username);

  return NextResponse.json(res);
}

async function createUser(
  name: string,
  telegram_username: string
): Promise<t_res> {
  const connection = await dbConnection();
  const res: t_res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_users
    set
        name = ?,
        telegram_username = ?
    `,
      [name, telegram_username]
    )
    .then(([x]) => {
      //   console.log("xxx", x);
      return {
        success: true,
      };
    })
    .catch((error) => {
      console.log("error #f84n", error);
      return {
        success: false,
        error: "#fd4mn " + error.code,
      };
    });
  console.log();
  await connection.end();
  return res;
}

interface t_res {
  success: boolean;
  error?: string;
}
