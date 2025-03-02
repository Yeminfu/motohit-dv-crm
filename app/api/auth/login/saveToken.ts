import dbWorker from "@/db/dbWorker2";

export default async function saveToken(
  idUser: number,
  token: string,
  confirmCode: number
) {
  await dbWorker(
    `insert into ${process.env.TABLE_PREFIX}_tokens (idUser, token, confirmCode, deadline) values (?, ?, ?, (CURRENT_TIMESTAMP + INTERVAL 1 DAY))`,
    [idUser, token, confirmCode]
  );
}
