import dbWorkerMapping from "./dbWorkerMapping";
import getProductFromOldCRM from "./getProductFromOldCRM";
import ts_productFromMapping from "./ts_productFromMapping";
import ts_productFromMappingWithProductFromOldCRM from "./ts_productFromMappingWithProductFromOldCRM";

export default async function getMatches(idProductFromShop: number): Promise<ts_productFromMappingWithProductFromOldCRM[]> {

    const productsFromMapping: ts_productFromMapping[] = await dbWorkerMapping(`
      select
        *
      from products
      where
        idProductFromShop = ?
    `, [idProductFromShop]).then((x: any) => x[0]);
    //@ts-ignore
    const matchesWithProductFromOldCRM: ts_productFromMappingWithProductFromOldCRM[] = await Promise.all(productsFromMapping.map(async (productFromMapping) => {
        const productFromOldCRM = await getProductFromOldCRM(productFromMapping.idProductFromOldCrm);
        return {
            ...productFromMapping,
            productFromOldCRM
        }
    }))

    return matchesWithProductFromOldCRM;
}
