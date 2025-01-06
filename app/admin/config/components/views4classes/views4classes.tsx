import dbWorker from "#db/dbWorker2.ts";

export default async function Views4classes() {
  const views = await getViews();
  return (
    <>
      Views4classes
      <pre>{JSON.stringify(views)}</pre>
    </>
  );
}

async function getViews() {
  return dbWorker(`select * from chbfs_sys$views`, []);
}
