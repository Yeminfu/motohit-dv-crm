import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await switchIsArchived(data.idProduct);

  return NextResponse.json(res);
}

async function switchIsArchived(idProduct: number) {
  const sql = `
    set @idProduct = ?;
    update chbfs_products
    set isArchived = not isArchived
    where id = @idProduct;
    
    select isArchived from chbfs_products
    where id = @idProduct; 
  `;
  return await dbWorker(sql, [idProduct])
}




