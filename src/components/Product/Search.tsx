import { useSearchParams } from "next/navigation";
import { ProductProvider, initialState, useProductContext } from "./context/ProductContext"
import { useEffect } from "react";
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { ApiResponse } from "@/types";
import { DispatchTypes } from "./context/reducers";
import { ApiProductListResponse, Product } from "./context/types";
import ProductList from "./ProductList";


const ProductSearch = () => {
    const { dispatch } = useProductContext();
    const searchParams = useSearchParams();
    const textSearch = searchParams.get('text');
    const [runFetch] = useLazyFetch<ApiProductListResponse>();

    useEffect(() => {
        const runSearch = async () => {
            if (!textSearch) return
            const { data } = await runFetch({}, `${process.env.API_URL}/product/search?text=${textSearch}`)

            const productSearchList = data?.data as Product[] || [];
            const searchCount = data?.total
            dispatch({
                type: DispatchTypes.SET_STATE,
                payload: {
                    productList: productSearchList,
                    total: searchCount,
                    skip: initialState.skip,
                    take: initialState.take,
                    textSearch: textSearch
                }
            })
        }

        runSearch()
    }, [textSearch])

    return (
        <>
            <div className='container mt-8'>
                <span className='font-bold text-lg mr-4'>
                    Search Result For:
                </span>
                <span>{textSearch}</span>
            </div>
            <ProductList hideTitle />
        </>
    )
}

const ProductSearchWithProvider = () => (
    <ProductProvider>
        <ProductSearch />
    </ProductProvider>
)
export default ProductSearchWithProvider;