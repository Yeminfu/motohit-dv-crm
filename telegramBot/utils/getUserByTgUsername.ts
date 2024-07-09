import { t_user } from "../types/ts_user";
import dbConnection from "./connect";

export default async function getUserByTgUsername(
  tgUserName: string
): Promise<t_user | null> {
  const connection = await dbConnection();

  const user = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_users where telegram_username = ?`,
      [tgUserName]
    )
    .then(([x]: any) => {
      if (x.length) return x.pop();
      return null;
    })
    .catch((error) => {
      return null;
    });
  await connection.end();
  return user;
}
