import { useFetch } from "@/hooks/useFetch";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer, } from "react";
import { Action, DispatchTypes, stateReducer } from "./reducers";
import { ApiProductListResponse, ContextStateType, Product } from "./types";
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { useToasterContext } from "@/components/common/Toaster/context/ToasterContext";


export const initialState = {
    loadingProductList: true,
    productList: [],
    skip: 0,
    take: 20,
    total: 0,
}
const ComponentContext = createContext<{
    state: ContextStateType,
    dispatch: Dispatch<Action>,
    updateProductPageList: (skip: number, take: number) => void
}>({
    state: initialState,
    dispatch: () => { },
    updateProductPageList: (skip = initialState.skip, take = initialState.take) => { }
})

const useComponentContext = () => useContext(ComponentContext);

const ComponentProvider = ({ children }: { children: ReactNode }) => {
    const { displayToaster } = useToasterContext();
    const [state, dispatch] = useReducer(stateReducer, initialState);
    const { loading, data } = useFetch<ApiProductListResponse>(`${process.env.API_URL}/product/list`)
    const [runFetch] = useLazyFetch<ApiProductListResponse>()

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: DispatchTypes.SET_STATE, payload: {
                    loadingProductList: false,
                    productList: (data?.data || []) as Product[],
                    total: data?.total || initialState.total,
                    take: data?.take || initialState.take,
                    skip: data?.skip || initialState.skip
                }
            })
        }
    }, [loading])

    const updateProductPageList = async (skip = initialState.skip, take = initialState.take) => {
        const searchParam = new URLSearchParams({
            skip: String(skip),
            take: String(take),
        })
        const fetchUrl = `${process.env.API_URL}/product/list?${searchParam}`

        dispatch({ type: DispatchTypes.SET_STATE, payload: { loadingProductList: true } });

        const { data } = await runFetch({}, fetchUrl);

        if (data?.code !== 'SUCCESS') {
            dispatch({ type: DispatchTypes.SET_STATE, payload: { loadingProductList: false } });
            displayToaster({ text: data?.message || 'System Error', err: true })
            return;
        }

        dispatch({
            type: DispatchTypes.SET_STATE, payload: {
                loadingProductList: false,
                skip: data.skip,
                total: data.total,
                take: data.take,
                productList: (data.data || []) as Product[],
            }
        })
    }
    return (
        <ComponentContext.Provider value={{ state, dispatch, updateProductPageList }}>
            {children}
        </ComponentContext.Provider>
    )
}
export {
    ComponentContext as ProductContext,
    ComponentProvider as ProductProvider,
    useComponentContext as useProductContext
};
