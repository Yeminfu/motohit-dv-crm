import ts_booleanField from "#app/attributes/get/[id]/components/types/ts_booleanField.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const dataFromClient: ts_booleanField = await req.json();
  const sql = `
    update motohit_dv_crm.chbfs_attributes
    set
      ${dataFromClient.fieldName} = ${dataFromClient.attributeInitValue}
    where
      id = ${dataFromClient.idAttribute}
  `;
  const res = await dbWorker(sql, [
    dataFromClient.attributeInitValue,
    dataFromClient.idAttribute

  ]);
  if (!res.result) {
    return NextResponse.json({
      success: false,
      error: '#kfsdf94'
    })
  }
  return NextResponse.json({
    success: true,
    res
  })
}