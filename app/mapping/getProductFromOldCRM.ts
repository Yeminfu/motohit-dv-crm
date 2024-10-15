import dbWorkerOldCRM from "./dbWorkerOldCRM";
import ts_productFromOldCRM from "./ts_productFromOldCRM";

export default async function getProductFromOldCRM(idProductFromOldCRM: string): Promise<ts_productFromOldCRM[]> {
    const qs = `
        SELECT 
          id, 
          name
        FROM birm_products
        where
          id = ?
      `;
    const res = await dbWorkerOldCRM(qs, [idProductFromOldCRM]);
    //@ts-ignore
    return res[0][0]
}