
'use client'
import { useFetch } from "@/hooks/useFetch";
import Loader from "../common/Loader";
import { ApiResponse } from "@/types";
import { ProductData } from "./types";
import { useEffect } from "react";
import { useToasterContext } from "../common/Toaster/context/ToasterContext";
import { toIDR } from "@/helpers/toIDR";

type Props = {
    productId: string;
}
const ProductDetail = (props: Props) => {
    const { displayToaster } = useToasterContext();
    const { productId } = props
    const { loading, data } = useFetch<ApiResponse>(`${process.env.API_URL}/product/detail/${productId}`)
    const { data: productData, code, message } = data || {};
    const { image, name, description, price } = productData as ProductData || {};

    useEffect(() => {
        if (!loading) {
            if (code !== 'SUCCESS') {
                displayToaster({ text: message || 'System Error', err: true })
            }
        }
    }, [loading])

    if (loading) return <Loader />

    return (
        <div className='container'>
            <div className='flex flex-col md:flex-row mt-12 gap-8'>
                <div className='w-full max-w-[600px]'>
                    <img src={image} />
                </div>
                <div>
                    <div className='font-bold text-xl'>{name}</div>
                    <div className='font-bold text-2xl'>{toIDR(price)}</div>

                    <div className='mt-8 flex flex-col gap-4'>
                        <div className='font-bold'>Description</div>
                        <div>{description}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail;