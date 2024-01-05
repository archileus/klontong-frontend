import { CreateProductInput, ErrorMap } from "./types";


export const validateCreateProductInput = (param: CreateProductInput) => {

    const { categoryId, name, description, height, image, length, price, sku, weight, width } = param;
    const errorMap = {} as ErrorMap;
    if (!categoryId) errorMap['categoryId'] = 'Category is not selected'
    if (!name) errorMap['productName'] = 'Product name is empty'
    if (!description) errorMap['description'] = 'Description is empty'
    if (!height) errorMap['height'] = 'Height is empty or not a number'
    if (!width) errorMap['width'] = 'Width is empty or not a number'
    if (!length) errorMap['productLength'] = 'Length is empty or not a number'
    if (!weight) errorMap['weight'] = 'Weight is empty or not anumber'
    if (!sku) errorMap['sku'] = 'SKU is empty'
    if (!image) errorMap['image'] = 'Image url is empty'
    if (!price) errorMap['price'] = 'Price is empty or not a number'

    if (Object.keys(errorMap).length > 0) return { isSuccess: false, errorMap: errorMap }
    return { isSuccess: true };
}