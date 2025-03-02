import dbWorker from "@/db/dbWorker2";
import { UserType } from "@/types/users/userType";

export default async function getUserByToken(
  token: string
): Promise<UserType | null> {

  const qs = `
    select 
      U.* 
    from ${process.env.TABLE_PREFIX}_tokens T
      join ${process.env.TABLE_PREFIX}_users U on U.id = T.idUser
    where
      T.token = ?
  `;

  const user = await dbWorker(
    qs,
    [token]
  )
    .then(x => x.result)
    .then((data: any) => {
      if (!data.length) return null;
      return data.pop();
    })
    .catch((error) => {
      console.error("err #c93no", error);
      return;
    });

  return user;
}
