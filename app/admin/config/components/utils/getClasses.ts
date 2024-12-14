import dbWorker from "#db/dbWorker.ts";

export default async function getClasses(): Promise<
  {
    id: number;
    className: string;
    title: string;
    description: string;
    idParent: number | null;
  }[]
> {
  return dbWorker(
    `
      select * from chbfs_sys$classes
    `,
    []
  );
}
