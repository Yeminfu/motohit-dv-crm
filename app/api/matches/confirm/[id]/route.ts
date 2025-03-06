import dbWorker from "@/db/dbWorker2";
import { NextResponse } from "next/server";

export async function POST(_: any, b: { params: { id: string } }) {
  const { id } = b.params;
  const mapping: { affectedRows?: number } = await dbWorker(`
    update motohit_dv_mapping.products
    set
      isValid = 1
    where
      id = ?
    `, [id]).then(x => x.result);

  return NextResponse.json({
    ...mapping
  })
}
