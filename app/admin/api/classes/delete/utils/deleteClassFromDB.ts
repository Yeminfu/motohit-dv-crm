import dbWorker2 from "#db/dbWorker2.ts";

export default async function deleteClassFromDB(className: string) {
  const res = await dbWorker2(
    `call dropClass(
      ?,
      @v
    )`,
    [className]
  );

  return res;
}
