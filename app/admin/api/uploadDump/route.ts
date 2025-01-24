import { NextRequest, NextResponse } from "next/server";
import dbWorker from "#db/dbWorker2.ts";

export async function POST(request: NextRequest) {
  const data: any = await request.formData();
  const dumpFile = data.get("file");
  const arrayBuffer = await dumpFile.arrayBuffer();
  const fileContent = arrayBufferToString(arrayBuffer); // Преобразуем ArrayBuffer в строку
  const res = await dbWorker(fileContent, []);

  if (!res.result) {
    console.error('error #dfs94mn', res);
    return NextResponse.json({
      success: false
    })
  }


  return NextResponse.json({
    success: true
  })
}

function arrayBufferToString(buffer: ArrayBuffer) {
  const decoder = new TextDecoder('utf-8'); // Создаем декодер для UTF-8
  return decoder.decode(buffer); // Декодируем ArrayBuffer в строку
}
