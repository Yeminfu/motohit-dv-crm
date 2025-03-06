import dbWorker from "@/db/dbWorker2";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";

export default async function getPriceTypes(): Promise<
  PriceTypesFromDBInterface[]
> {
  const qs = `select * from ${process.env.TABLE_PREFIX}_price_types`;
  const res = await dbWorker(qs, []).then(x => x.result);
  return res;
}
