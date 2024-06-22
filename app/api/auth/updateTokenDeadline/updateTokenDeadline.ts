import dbConnection from "@/db/connect";

export default async function updateTokenDeadline(token: string) {
  const connection = await dbConnection();
  await connection
    .query(
      `UPDATE ${process.env.TABLE_PREFIX}_tokens SET deadline = (CURRENT_TIMESTAMP + INTERVAL 1 DAY) WHERE token = ?`,
      [token]
    )
    .catch((err) => {
      console.error("error #ck4nh", err);
    });
}
