export default interface Inputs {
    product_name: string
    price: number
    description: string
    short_description: string
    category: number
    stock_status: number
    attributes: AttributeType[]
    images: any
    video: string[]
    videoAppender: string
}

interface AttributeType {
    attribute_id: number
    attribute_value_id: number | ""
}