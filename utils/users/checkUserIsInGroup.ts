import dbWorker from "@/db/dbWorker2";

export default async function checkUserIsInGroup(idUser: number, groupName: string): Promise<boolean> {
  const collationName: string | null = await dbWorker(`
    select 
      COLLATION_NAME
    from 
      information_schema.columns
    where 
      TABLE_SCHEMA = 'motohit_dv_crm' 
      AND TABLE_NAME = 'chbfs_sys$groups'
      AND COLUMN_NAME = 'name'
    limit 1;
  `, [])
    .then(x => {
      if (!x.result) return null;
      if (x.result[0]) return x.result[0].COLLATION_NAME;
      return null;
    });

  const sql = `
    set @groupName = ?;
    set @idUser = ?;
    select
      U.id,
      U.name
    from chbfs_sys$groups as G
      inner join chbfs_sys$groupsAndUsers as GU on GU.idGroup = G.id
       inner join chbfs_users as U on U.id = GU.idUser
    where
      G.name = @groupName COLLATE ${collationName}
      and U.id = @idUser
  `;

  const result = await dbWorker(sql, [groupName, idUser])
    .then(x => x.result)
    .then(x => x.find(Array.isArray))
    .then(x => Boolean(x[0]))
    ;

  return result;
}
