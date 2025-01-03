import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectClass(idClass: number): Promise<
  | {
      id: number;
      className: string;
      title: string | null;
      description: string | null;
      idParent: string | null;
    }
  | undefined
> {
  const res = await dbWorker(
    `
      select
        id,
        className,
        title,
        description,
        idConfig
      from chbfs_sys$classes where id = ?
    `,
    [idClass]
  );

  if (!res) {
    console.error("err #kasd9");
    return;
  }

  //@ts-ignore
  if (res.error) {
    console.error("err #9dajsdn");
    return;
  }

  if (!res.result) {
    console.error("err #kd983");
    return;
  }

  if (!res.result.length) {
    console.error("err #as9d3j");
    return;
  }

  return res.result[0];
}
