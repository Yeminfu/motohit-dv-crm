import createAttribute from "#db/crud/createAttribute.ts";
import getUserByToken from "@/utils/users/getUserByToken";
import { NextRequest, NextResponse } from "next/server";
import ts_requestBody from "./types/ts_requestBody";

export async function POST(request: NextRequest) {
  const data: ts_requestBody = await request.json();
  const { cookies } = request;

  const authToken = String(cookies.get("auth")?.value);
  if (!authToken) {
    return NextResponse.json({
      success: false,
      error: '#ksdfsdf94jao'
    })
  }

  const user = await getUserByToken(authToken);
  if (!user) {
    return NextResponse.json({
      success: false,
      error: '#dksd39'
    })
  }

  const newAttribute = await createAttribute({
    attribute_name: data.attributeName,
    created_by: user.id,
    view_in_filter: 1,
    idCategory: data.idCategory,
    is_main: 1
  });


  return NextResponse.json(newAttribute);
}

