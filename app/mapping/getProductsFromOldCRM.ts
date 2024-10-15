// import ts_productFromOldCRM from "../types/ts_productFromOldCRM";
// import dbWorkerOldCRM from "./dbWorkerOldCRM";

import dbWorkerOldCRM from "./dbWorkerOldCRM";
import ts_productFromOldCRM from "./ts_productFromOldCRM";

export default async function getProductsFromOldCRM(): Promise<ts_productFromOldCRM[]> {
  const qs = `
      SELECT id, name FROM birm_products
    `;
  const res = await dbWorkerOldCRM(qs, []);
  //@ts-ignore
  return res[0]
}