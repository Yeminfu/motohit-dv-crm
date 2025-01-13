import { ts_attributeToCreate } from "./prodyctType";
import { RetailPriceFromDB } from "./retailPriceFromDB";

export default interface ts_product4create {
  name: string;
  code: string;
  color: string;
  cost_price: { type: number; value: number };
  internetPrice: string;
  note: string;
  purchase_price: number;
  retail_price: RetailPriceFromDB[];
  stock: {
    idShop: number;
    shopName: string;
    count: number;
  }[];
  idCategory: number;
  attributes: ts_attributeToCreate[];
}
