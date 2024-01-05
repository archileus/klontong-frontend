export type CreateProductInput = {
    categoryId: number,
    name: string,
    description: string,
    sku: string,
    weight: number,
    width: number,
    length: number,
    height: number,
    image: string,
    price: number,
}

export type ProductData = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    sku: string;
    weight: number;
    width: number;
    length: number;
    height: number;
    image: string;
    price: number;
}


export type ErrorMap = { [key: string]: string }