import ts_productFromMappingWithProductFromOldCRM from "./ts_productFromMappingWithProductFromOldCRM"
import ts_productFromShop from "./ts_productFromShop"

type ts_productFromShopWithMatches =
    ts_productFromShop
    & {
        matches: ts_productFromMappingWithProductFromOldCRM[],
    }

export default ts_productFromShopWithMatches