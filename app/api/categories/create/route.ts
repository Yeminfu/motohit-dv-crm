import dbConnection from "@/db/connect";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;
  const res = await createCategory(name);
  return NextResponse.json(res);
}

async function createCategory(name: string) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_categories (name) values (?)`,
      [name.trim()]
    )
    .then(([x]: any) => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      console.log("err #d9dn3", err.code);

      const errors: any = {
        ER_DUP_ENTRY: "Категория с таким названием уже создана",
      };

      const errorText = errors[err.code]
        ? errors[err.code]
        : "Что-то пошло не так #f9fn4";

      return {
        success: false,
        error: errorText,
      };
    });

  await connection.end();
  await addHistoryEntry("createCategory", {
    name,
    res,
  });
  return res;
}
