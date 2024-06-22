import dbConnection from "@/db/connect";
import { UserType } from "@/types/users/userType";

export default async function getUserByTg(
  tgUsername: string
): Promise<UserType | null> {
  const connection = await dbConnection();
  const user = await connection
    .query(
      `SELECT * FROM ${process.env.TABLE_PREFIX}_users WHERE telegram_username = ? AND is_active = 1`,
      [tgUsername]
    )
    .then(([data]: any) => {
      if (!data.length) return null;
      return data.pop();
    })
    .catch((error) => {
      console.error("err #vlc35", error);
      return;
    });
  await connection.end();
  return user;
}
