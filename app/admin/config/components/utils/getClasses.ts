import dbWorker from "#db/dbWorker.ts";

export default async function getClasses(): Promise<
  {
    id: number;
    name: string;
    title: string;
    description: string;
    idParent: number | null;
  }[]
> {
  return dbWorker(
    `
      select * from chbfs_sys$classes order by name
    `,
    []
  );
}
