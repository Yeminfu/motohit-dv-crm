export default interface ts_attributesFromAPI {
    attribute_id: number
    attribute_name: string
    values: {
        value_id: number
        value_name: string
    }[]
}