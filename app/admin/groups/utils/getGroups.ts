import dbWorker from "@/db/dbWorker2";

export default async function getGroups(): Promise<({
  id: number,
  name: string
}[]) | null> {
  const sql = `
    select
      id,
      name
    from chbfs_sys$groups
    where
      id > 1
  `;
  const query = await dbWorker(sql, []);
  if (query.error) {
    return null;
  }
  return query.result
}