import { NextResponse } from "next/server";
import deleteAttributeValue from "./utils/deleteAttributeValue";

export async function POST(_: '_', params: { params: { id: string } }) {
  const res = await deleteAttributeValue(Number(params.params.id));
  // if (!res.) {
  //   console.log('error #ksdff94', res);
  // }
  return NextResponse.json(res)
}
