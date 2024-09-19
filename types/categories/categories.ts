import { AttributeWithValues } from "./attributes"

export type CategoryFromDBInterface = {
    id: number
    slug: string
    category_name: string
    description: string
    parent: number
}

export type CategoryWithAttributes = CategoryFromDBInterface & { attributes: AttributeWithValues[] };