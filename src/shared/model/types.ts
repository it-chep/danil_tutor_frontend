


export interface IItem {
    id: number;
    name: string;
}

export interface IFormError<T> {
    field: keyof T;
    text: string;
}

