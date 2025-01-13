import { ts_imageFromDB } from "./ts_imageFromDB";
import ts_retailPricesByProductIdGroupedByCity from "./ts_retailPricesByProductIdGroupedByCity";

export interface ProductFromDB {
  id: number;
  name: string;
  note: string;
  idCategory: number;
  purchase_price: number;
  idCostPriceType: number;
  costPriceValue: number;
  color: string;
  code: string;
  description: string
  isArchived: boolean;
}

export interface ts_attributeToCreate {
  idAttributeValue: string;
}

export type ProductsFull = ProductFromDB & {
  images: ts_imageFromDB[];
  retailPrices: ts_retailPricesByProductIdGroupedByCity[];
  stock: (StockFromDBInterface | null)[];
};

export interface StockFromDBInterface {
  id: number;
  idShop: number;
  // shopName: string;
  count: string;
}
