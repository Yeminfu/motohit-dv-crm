import dbConnection from "@/db/connect";

export default async function saveToken(
  idUser: number,
  token: string,
  confirmCode: number
) {
  const connection = await dbConnection();
  await connection.query(
    `insert into ${process.env.TABLE_PREFIX}_tokens (idUser, token, confirmCode, deadline) values (?, ?, ?, (CURRENT_TIMESTAMP + INTERVAL 1 DAY))`,
    [idUser, token, confirmCode]
  );
  await connection.end();
}
