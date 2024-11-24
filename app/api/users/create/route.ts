import dbConnection from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, telegram_username } = await req.json();
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
      return {
        success: true,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: "#fd4mn " + error.code,
      };
    });
  await connection.end();
  return res;
}

interface t_res {
  success: boolean;
  error?: string;
}
