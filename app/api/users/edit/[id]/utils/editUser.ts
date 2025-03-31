import dbWorker from "@/db/dbWorker2";
import ts_editUserData from "@/app/users/components/editUser/types/ts_editUserData";

export default async function editUser(idUser: number, editUserData: ts_editUserData) {

  const sql = `
    set @idUser = ?;
    set @is_active = ?;
    update chbfs_users
    set is_active = @is_active
    where id = @idUser;
  `;
  const res = await dbWorker(sql, [idUser, Number(editUserData.is_active)]);
  return res;
}