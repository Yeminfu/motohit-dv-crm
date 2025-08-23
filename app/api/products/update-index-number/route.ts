import { NextRequest, NextResponse } from "next/server";
import dbWorker from "@/db/dbWorker2";

export async function POST(request: NextRequest) {
  const data: {
    id: string,
    indexNumber: string
  }[] = await request.json();
  for (let index = 0; index < data.length; index++) {
    const product = data[index];
    await dbWorker(
      `
        update chbfs_products
        set indexNumber = ?
        where id = ?
      `, [product.indexNumber, product.id]
    );
  }

  return NextResponse.json({});
}
