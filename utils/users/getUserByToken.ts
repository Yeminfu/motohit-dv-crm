import dbConnection from "@/db/connect";
import { UserType } from "@/types/users/userType";

export default async function getUserByToken(
  token: string
): Promise<UserType | null> {
  const connection = await dbConnection();

  const user = await connection
    .query(
      `
        select 
          U.* 
        from ${process.env.TABLE_PREFIX}_users  U
          join ${process.env.TABLE_PREFIX}_tokens T on T.token = ?;
      `,
      [token]
    )
    .then(([data]: any) => {
      if (!data.length) return null;
      return data.pop();
    })
    .catch((error) => {
      console.error("err #c93no", error);
      return;
    });
  await connection.end();

  return user;
}
