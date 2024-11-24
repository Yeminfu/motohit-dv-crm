import dbConnection from "@/db/connect";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const idProduct = params.params.id;
  const success = await sendToArchive(Number(idProduct));
  return NextResponse.json({ success: success });
}

async function sendToArchive(idProduct: number) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `update ${process.env.TABLE_PREFIX}_products set isArchived = 1 where id = ?`,
      [idProduct]
    )
    .then(([x]: any) => {
      addHistoryEntry("send-to-archive", {
        idProduct: idProduct,
        success: true,
        dbData: x,
      });
      return Boolean(x.affectedRows);
    })
    .catch((x) => {
      addHistoryEntry("send-to-archive", {
        idProduct: idProduct,
        success: false,
        dbData: x,
      });
      console.error("err #fjn5v", x);
      return false;
    });
  await connection.end();
  return res;
}
