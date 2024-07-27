import dbConnection from "@/db/connect";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";

export default async function addHistoryEntry(action: string, data: any) {

  const authToken = String(cookies().get("auth")?.value);

  const user = await getUserByToken(authToken);
  console.log('user', user);


  if (!user) return;

  const connection = await dbConnection();

  await connection.query(
    `insert into ${process.env.TABLE_PREFIX}_history (action, data, doneBy) values (?,?,?)`,
    [action, JSON.stringify(data), user.id]
  );
  await connection.end();
}
