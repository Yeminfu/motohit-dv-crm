import { ts_imageFromDB } from "./ts_imageFromDB";
import { RetailPriceFromDB } from "./retailPriceFromDB";
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
  isArchived: boolean;
}

export interface ts_attributeToCreate {
  idAttributeValue: string;
}

export interface ProductOnCreate {
  name: string;
  code: string;
  color: string;
  cost_price: { type: number; value: number };
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
  // images: any;
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
