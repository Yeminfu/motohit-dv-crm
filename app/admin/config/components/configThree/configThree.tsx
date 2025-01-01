import dbWorker from "#db/dbWorker2.ts";

export default async function ConfigThree() {
  const configThree = await getConfigThree();
  return (
    <>
      <div>ConfigThree</div>
      <pre>{JSON.stringify(configThree, null, 2)}</pre>
    </>
  );
}

async function getConfigThree() {
  return await dbWorker(`select * from chbfs_config`, []);
}
