import fs from "fs";

export default function readTextFromFile(filePath: string): string {
  const text = fs.readFileSync(filePath,
    { encoding: 'utf8', flag: 'r' });
  return text;
}
