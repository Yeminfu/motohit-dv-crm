import dbWorker from "@/db/dbWorker2";

export default async function getUsers(idGroup: number): Promise<({
  id: string,
  name: string
}[]) | null> {
  const sql = `
    select
      U.id,
      U.name
    from chbfs_sys$groupsAndUsers as GU
      inner join chbfs_users as U on U.id = GU.idUser
    where
      GU.idGroup = ?
  `;
  const query = await dbWorker(sql, [idGroup]);
  if (query.error) {
    return null;
  }
  return query.result
}
