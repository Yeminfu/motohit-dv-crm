import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectProcedures() {
  return await dbWorker(
    `
      select * from chbfs_sys$procedures
    `,
    []
  );
}
