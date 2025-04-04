export default interface ts_EDitProductFields {
  idProduct: string;
  name: string;
  color: string;
  code: string;
  purchase_price: string;
  internetPrice: string
  cost_price: {
    value: string;
    type: string;
  };
  retail_price: any;
  stock: any;
  note: string;
  idCategory: string;
  description: string;
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[];
}
