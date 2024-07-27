import dbConnection from "@/db/connect";
import { UserType } from "@/types/users/userType";

export default async function getUserByToken(
  token: string
): Promise<UserType | null> {
  const connection = await dbConnection();

  const qs = `
    select 
      U.* 
    from ${process.env.TABLE_PREFIX}_tokens T
      join ${process.env.TABLE_PREFIX}_users U on U.id = T.idUser
    where
      T.token = ?
  `;

  const user = await connection
    .query(
      qs,
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
