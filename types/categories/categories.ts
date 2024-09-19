import { AttributeWithValues } from "./attributes"

export type CategoryFromDBInterface = {
    id: number
    slug: string
    category_name: string
    description: string
    parent: number
}

export type CategoryWithAttributes = CategoryFromDBInterface & { attributes: AttributeWithValues[] };

export interface ts_categoryToRequestCreate {
    category_name: string;
    parent?: number;
    inserted_youtube_url?: any;
    description?: string;
}