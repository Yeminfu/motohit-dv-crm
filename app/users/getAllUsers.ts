import dbConnection from "@/db/connect";
import { UserType } from "@/types/users/userType";

export default async function getAllUsers(): Promise<UserType[]> {
  const connection = await dbConnection();
  const users = await connection
    .query(`select * from ${process.env.TABLE_PREFIX}_users where id > 1`)
    .then(([users]: any) => users)
    .catch((error) => {
      console.error("error #c8n4", error);
      return [];
    });
  await connection.end();
  return users;
}
