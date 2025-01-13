import fs from "fs";

export default function deleteFileAsync(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Ошибка при удалении файла: ${err.message}`);
      return;
    }
    console.log(`Файл ${filePath} успешно удален.`);
  });
}