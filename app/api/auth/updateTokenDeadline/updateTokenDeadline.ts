import dbWorker from "@/db/dbWorker2";

export default async function updateTokenDeadline(token: string) {
  await dbWorker(
    `UPDATE ${process.env.TABLE_PREFIX}_tokens SET deadline = (CURRENT_TIMESTAMP + INTERVAL 1 DAY) WHERE token = ?`,
    [token]
  )
    .then(x => x.result)
    .catch((err) => {
      console.error("error #ck4nh", err);
    });
}
