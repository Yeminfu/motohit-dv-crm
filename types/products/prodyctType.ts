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
}

export interface ProductOnCreate {
  name: string;
  code: string;
  color: string;
  cost_price: { type: string; value: number };
  note: string;
  purchase_price: string;
  retail_price: RetailPriceFromDB[];
  stock: {
    idShop: number;
    shopName: string;
    count: number;
  }[];
  idCategory: number;
}

export type ProductsFull = ProductFromDB & {
  images: ImageFromDB[];
  retailPrices: ts_retailPricesByProductIdGroupedByCity[];
  stock: StockFromDBInterface[];
};

interface StockFromDBInterface {
  id: number;
  idShop: number;
  shopName: string;
  count: string;
}
