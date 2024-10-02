import dbWorker from "@/db/dbWorker";

export default async function getAllAttributes() {
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