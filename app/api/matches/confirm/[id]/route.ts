import dbWorker from "@/db/dbWorker";
import { NextResponse } from "next/server";

export async function POST(_: any, b: { params: { id: string } }) {
  const { id } = b.params;
  const mapping: { affectedRows?: number } = await dbWorker(`
    update motohit_dv_mapping.products
    set
      isValid = 1
    where
      id = ?
    `, [id]);

  return NextResponse.json({
    ...mapping
  })
}
