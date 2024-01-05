'use client'
import { useFetch } from "@/hooks/useFetch";
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { ApiResponse } from "@/types";
import { Button, Card, Input, Option, Select } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import Loader from "../common/Loader";
import { ToasterProvider, useToasterContext } from "../common/Toaster/context/ToasterContext";
import { validateCreateProductInput } from "./helpers";
import { CreateProductInput, ErrorMap } from "./types";

const CreateProduct = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [inputErrorMap, setInputErrorMap] = useState({} as ErrorMap);
    const { displayToaster } = useToasterContext();

    const { loading, data: dataCategoryList } = useFetch<ApiResponse>(`${process.env.API_URL}/product/category`)
    const [runFetch] = useLazyFetch<ApiResponse>(`${process.env.API_URL}/product/create`)

    if (loading) return <Loader />


    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const param: CreateProductInput = {
            categoryId: parseInt(selectedCategoryId),
            name: e.currentTarget.productName.value,
            description: e.currentTarget.description.value,
            sku: e.currentTarget.sku.value,
            weight: parseInt(e.currentTarget.weight.value),
            width: parseInt(e.currentTarget.width.value),
            length: parseInt(e.currentTarget.productLength.value),
            height: parseInt(e.currentTarget.height.value),
            image: e.currentTarget.image.value,
            price: parseInt(e.currentTarget.price.value),
        }
        const validationResult = validateCreateProductInput(param);

        if (!validationResult.isSuccess) {
            setInputErrorMap(validationResult.errorMap || {})
            return;
        }
        setInputErrorMap({});

        const { data, error } = await runFetch(
            {
                method: 'POST',
                body: JSON.stringify(param),

            })
        if (error) {
            displayToaster({ text: error.message, err: true })
            return
        }
        if (data?.code !== 'SUCCESS') {
            displayToaster({ text: data?.message || 'System Error', err: true })
            return
        }

        displayToaster({ text: 'Create Product Success' })
        setTimeout(() => {
            window.location.reload();
        }, 3000)

    }


    const renderCategoryOption = () => {
        const categoryList = dataCategoryList?.data as [{ id: number, name: string }] || [];
        return categoryList.map(item => {
            const { id, name } = item;
            return (
                <Option key={id} value={String(id)}>
                    {name}
                </Option>
            )
        })

    }

    const renderErrorMessage = (keyName: string) => {
        if (!inputErrorMap[keyName]) return null;
        return <div className="text-red-400 text-sm mt-1 pl-1">{inputErrorMap[keyName]}</div>
    }
    return (
        <div className="container px-4">
            <div className='font-bold text-black text-lg mt-8'>Create Product Page</div>
            <Card placeholder='' className='w-[350px] p-4 mt-8 mx-auto'>
                <form onSubmit={handleRegister}>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <Select label="Category" placeholder="" name='categoryId' onChange={(value) => setSelectedCategoryId(value || '')}>
                                {renderCategoryOption()}
                            </Select>
                            {renderErrorMessage('categoryId')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Product Name' name='productName' />
                            {renderErrorMessage('productName')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Description' name='description' />
                            {renderErrorMessage('description')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='SKU' name='sku' />
                            {renderErrorMessage('sku')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Weight' name='weight' />
                            {renderErrorMessage('weight')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Width' name='width' />
                            {renderErrorMessage('width')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Length' name='productLength' />
                            {renderErrorMessage('productLength')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Height' name='height' />
                            {renderErrorMessage('height')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Image URL' name='image' />
                            {renderErrorMessage('image')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='Price' name='price' />
                            {renderErrorMessage('price')}
                        </div>


                        <Button type='submit' placeholder="" color='green' >
                            Submit
                        </Button>
                    </div>
                </form>
            </Card>

        </div>
    )
}


const CreateProductWithProvider = () => (
    <ToasterProvider>
        <CreateProduct />
    </ToasterProvider>
)

export default CreateProductWithProvider;