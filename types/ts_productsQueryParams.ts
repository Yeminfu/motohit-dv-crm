export default interface ts_productsQueryParams {
  table: string,
  columns: string[],
  where: string,
  orderBy?: string,
  limit?: string,
  offset?: string,
  params: (string | number)[],
}