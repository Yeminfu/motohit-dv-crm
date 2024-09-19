import dbConnection from "@/db/connect";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name,description } = body;
  const res = await createCategory(name,description);
  return NextResponse.json(res);
}

async function createCategory(name: string, description:string) {
  let slug = slugify(
    name.replace(/[^ a-zA-Zа-яА-Я0-9-.]/gim, "")
  );

  const connection = await dbConnection();
  const res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_categories 
        (category_name, slug,created_by, description) 
      values
        (?,?,?,?)
      `,
      [name.trim(), slug, 1,'здравствуйте']
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
