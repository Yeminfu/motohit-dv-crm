import dbWorker from "@/db/dbWorker2";
import { AttributeType } from "../categories/attributes";

export default async function getAllAttributes(): Promise<AttributeType[]> {
    const attributes = await dbWorker(
        `
      select
          *
      from ${process.env.TABLE_PREFIX}_attributes
      `,
        []
    ).then(x => x.result);
    return attributes;
}