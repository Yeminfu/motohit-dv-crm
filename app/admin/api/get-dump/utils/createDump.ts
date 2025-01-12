import { exec } from 'child_process';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export default async function createDump(dumpFilePath: string): Promise<boolean> {
  const dumpCommand = `mysqldump -u ${dbUser} -p${dbPassword} ${dbName} > ${dumpFilePath}`;
  const success: boolean = await new Promise(r => {
    exec(dumpCommand, (error, stdout, stderr) => {
      console.log({ error, stdout, stderr });
      r(error === null);
    });
  })
  return success;
}