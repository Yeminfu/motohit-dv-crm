import dbWorker from "@/db/dbWorker2";

export default async function getGroups(): Promise<({
  id: string,
  name: string
}[]) | null> {
  const sql = `
    select
      id,
      name
    from chbfs_sys$groups
  `;
  const query = await dbWorker(sql, []);
  if (query.error) {
    return null;
  }
  return query.result
}