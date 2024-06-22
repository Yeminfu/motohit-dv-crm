import dbConnection from "@/db/connect";

export default async function addHistoryEntry(action: string, data: any) {
  console.log("addHistoryEntry", { action, data });
  const connection = await dbConnection();
  await connection.query(
    `insert into ${process.env.TABLE_PREFIX}_history (action, data) values (?,?)`,
    [action, JSON.stringify(data)]
  );
  await connection.end();
}
