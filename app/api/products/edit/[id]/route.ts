import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "./updateProduct";

export async function POST(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const data: any = await req.formData();
  const mainProductFields = JSON.parse(data.get("mainProductFields"));

  await updateProduct(mainProductFields);

  return NextResponse.json({ success: null });
}
