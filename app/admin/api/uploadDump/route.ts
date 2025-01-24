import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: NextRequest) {
  const data: any = await request.formData();
  const dumpFile = data.get("file");

  console.log(dumpFile);

  const buffer = await dumpFile.arrayBuffer();

  const fileName = dumpFile.name

  console.log('buffer', buffer);
  console.log('fileName', fileName);

  const projectRoot = process.cwd();
  const tmpFolder = projectRoot + "/tmp";

  console.log({ tmpFolder });

  const filePath = tmpFolder + "/" + fileName;

  fs.writeFileSync(filePath, Buffer.from(buffer));


  return NextResponse.json({
    success: null
  })
}