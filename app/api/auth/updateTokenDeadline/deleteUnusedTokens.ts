import dbConnection from "@/db/connect";

export default async function deleteUnusedTokens() {
  const connection = await dbConnection();
  await connection.query(
    `DELETE FROM ${process.env.TABLE_PREFIX}_tokens WHERE deadline < now();`
  );
  await connection.end();
}
