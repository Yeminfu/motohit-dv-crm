export interface RetailPriceFromDB {
  id: number;
  idRecord?: number;
  idPriceType: number;
  priceValue: number;
  idProduct: number;
  idShop: number;
  shopName: string;
  priceType: string;
}
