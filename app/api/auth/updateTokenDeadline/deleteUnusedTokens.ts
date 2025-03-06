import dbWorker from "@/db/dbWorker2";

export default async function deleteUnusedTokens() {
  await dbWorker(
    `DELETE FROM ${process.env.TABLE_PREFIX}_tokens WHERE deadline < now();`
    , []).then(x => x.result);
}
