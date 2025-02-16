import ts_inputs from "@/app/attributes/get/[id]/components/attributeValueCreator/types/ts_inputs";
import { NextRequest, NextResponse } from "next/server";
import createAttributeValue from "./utils/createAttributeValue";
import getUserByToken from "@/utils/users/getUserByToken";

export async function POST(request: NextRequest) {
  const data: ts_inputs = await request.json();

  const { cookies } = request;
  const authToken = String(cookies.get("auth")?.value);
  if (!authToken) {
    return NextResponse.json({
      error: "#ksdfsdf934i"
    })
  }

  const user = await getUserByToken(authToken);
  if (!user) {
    return NextResponse.json({
      error: "#lfds94jmw"
    })
  }

  const res = await createAttributeValue(data, user.id)
  return NextResponse.json(res)
}
