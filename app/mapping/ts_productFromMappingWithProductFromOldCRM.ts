import ts_productFromMapping from "./ts_productFromMapping";
import ts_productFromOldCRM from "./ts_productFromOldCRM";

type ts_productFromMappingWithProductFromOldCRM = ts_productFromMapping & {
    productFromOldCRM: ts_productFromOldCRM
};

export default ts_productFromMappingWithProductFromOldCRM