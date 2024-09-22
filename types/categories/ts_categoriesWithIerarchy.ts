export type ts_categoriesWithIerarchy = {
    id: number
    slug: string
    category_name: string
    description: string
    idParent?: number
    children?: ts_categoriesWithIerarchy[]
}