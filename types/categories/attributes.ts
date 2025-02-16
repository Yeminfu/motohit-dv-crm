export interface AttributeType { // FIXME DEPRECATED
    id: number
    attribute_name: string
    view_in_filter: 1 | 0
    isOpenInFilter: 1 | 0
    is_main: 1 | 0
    category_name: string
    idCategory: number
}

export interface AttributeValueInterface {
    id: number
    value_name: string
}

export interface AttributeFromDBInterface {
    id: number;
    attribute_name: string;
    created_date: string;
    created_by: number;
    category: number;
    view_in_filter: boolean;
    isOpenInFilter: boolean;
    is_main: boolean;
}

export type AttributeWithValues = AttributeFromDBInterface & { values: AttributeValueInterface[] }