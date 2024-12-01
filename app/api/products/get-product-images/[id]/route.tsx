import getProductImages from "#utils/getProductImages.ts";
import { NextResponse } from "next/server";

export async function POST(a: any, props: { params: { id: string } }) {
  const images = await getProductImages(Number(props.params.id));
  return NextResponse.json({
    success: null,
    images,
  });
}
