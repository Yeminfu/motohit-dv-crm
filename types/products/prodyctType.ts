import { ImageFromDB } from "./ImageFromDB";
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
  isArchived: boolean
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
  // images: any;
}

export type ProductsFull = ProductFromDB & {
  images: ImageFromDB[];
  retailPrices: ts_retailPricesByProductIdGroupedByCity[];
  stock: StockFromDBInterface[];
};

export interface StockFromDBInterface {
  id: number;
  idShop: number;
  // shopName: string;
  count: string;
}
