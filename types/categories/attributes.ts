export interface AttributeType { // FIXME DEPRECATED
    id: number
    attribute_name: string
    view_in_filter: 1 | 0
    is_open_in_filter: 1 | 0
    is_main: 1 | 0
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
    is_open_in_filter: boolean;
    is_main: boolean;
}

export type AttributeWithValues = AttributeFromDBInterface & { values: AttributeValueInterface[] }