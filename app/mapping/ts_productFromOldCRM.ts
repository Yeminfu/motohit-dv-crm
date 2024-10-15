export default interface ts_productFromOldCRM {
    id: number
    site_id: number,
    category_id: string,
    name: string,
    code: string,
    purchase_price: number,
    image: string | null,
    cost_type: string
    cost_value: number,
    note: string,
    archive: boolean,
    birm_products: any | null,
    title_color: string
}