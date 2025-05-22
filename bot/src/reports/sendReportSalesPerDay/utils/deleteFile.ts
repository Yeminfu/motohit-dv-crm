import fs from "fs";

export default function deleteFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Ошибка при удалении файла:', err);
      } else {
        console.log('Файл успешно удален.');
      }
    });
  } else {
    console.log('Файл не существует.' + filePath);
  }
}
