import xlsx from 'node-xlsx';
import fs from 'fs/promises';

export default async function createXls(pathToFile: string, stockFromDb: any) {
  console.log('createXls begin');

  const arr = [
    Object.keys(stockFromDb[0]),
    ...stockFromDb.map(Object.values)
  ];

  const sheetOptions = { '!cols': [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] };

  //@ts-ignore
  var buffer = xlsx.build([{ name: 'mySheetName', data: arr }], { sheetOptions }); // Returns a buffer

  try {
    await fs.writeFile(pathToFile, buffer, 'utf-8');
    console.log('createXls end');
    return buffer;
  } catch (error) {
    console.log('createXls end');
    return buffer;
  }
}
