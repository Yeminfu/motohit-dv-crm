import dbWorker from "@/db/dbWorker";
import { AttributeType } from "../categories/attributes";

export default async function getAllAttributes(): Promise<AttributeType[]> {
    const attributes = await dbWorker(
        `
      select
          *
      from ${process.env.TABLE_PREFIX}_attributes
      `,
        []
    );
    return attributes;
}