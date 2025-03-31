import dbConnection from "@/db/connect";
import { UserType } from "@/types/users/userType";

export default async function getUserByTg(
  tgUsername: string
): Promise<UserType | null> {
  const connection = await dbConnection();
  const sql = `
    select
      *
    from ${process.env.TABLE_PREFIX}_users where telegram_username = ? and is_active = 1`;
  const user = await connection
    .query(sql, [tgUsername])
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
