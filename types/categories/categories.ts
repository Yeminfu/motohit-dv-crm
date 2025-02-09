import { AttributeWithValues } from "./attributes"

export type CategoryFromDBInterface = {
    id: number
    slug: string
    category_name: string
    description: string
    idParent?: number
}

export type CategoryWithAttributes = CategoryFromDBInterface & { attributes: AttributeWithValues[] };

export interface ts_categoryToRequestCreate {
    category_name: string;
    idParent?: number;
    inserted_youtube_url?: any;
    description?: string;
}