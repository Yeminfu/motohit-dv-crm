import fs from "fs";
import xlsx from 'node-xlsx';
import dayjs from 'dayjs';

export default async function (pathToFile: string, data: any) {
  const today = dayjs().format("DD-MM-YYYY");

  // const fileName = process.env.PATH_TO_FILES + `sales-${today}.xlsx`;


  const arr = [
    Object.keys(data[0]),
    ...data.map(Object.values)
  ];
}