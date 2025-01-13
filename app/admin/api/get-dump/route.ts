// import { headers } from 'next/headers'

import path from 'path';

import { NextResponse } from "next/server";
import dayjs from 'dayjs';
import createDump from './utils/createDump';

export async function GET() {

  const now = dayjs().format('DD_MM_YYYY_HH_mm_ss');
  const fileName = `dump_${now}.sql`;
  const dumpFilePath = path.join(process.cwd(), fileName);

  const success = await createDump(dumpFilePath);
  if (!success) return NextResponse.json({ success });

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename=${fileName}`
    },
  })
}
