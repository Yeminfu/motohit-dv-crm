export default interface ts_dublicate {
  idProduct1: number,
  productName1: string,
  purchase_price1: number,
  idCostPriceType1: number,
  costPriceValue1: number,
  description1: string,
  isArchived1: boolean,

  idProduct2: number,
  productName2: string,
  purchase_price2: number,
  idCostPriceType2: number,
  costPriceValue2: number,
  description2: string,
  isArchived2: boolean,

  perPage: number,
  page: number,
  offset: number,
}