import dbConnection from "./connect";

export default async function saveTgChatId(
  idUser: number,
  idTgChat: number
): Promise<boolean> {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `update ${process.env.TABLE_PREFIX}_users set tg_chat_id = ? where id = ?`,
      [idTgChat, idUser]
    )
    .then(([x]: any) => {
      return !!x.changedRows;
    })
    .catch((err) => {
      console.error("err #fsdf", err);
      return false;
    });

  await connection.end();
  return res;
}
