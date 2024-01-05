import { ApiResponse } from "@/types";
import { CreateProductInput } from "../types";

export type ContextStateType = {
    loadingProductList: boolean,
    productList: Product[],
    skip: number,
    take: number,
    total: number,
    textSearch: string,
}

export type Product = {
    id: number
} & CreateProductInput;

export type ApiProductListResponse = {
    total: number,
    skip: number,
    take: number,
} & ApiResponse