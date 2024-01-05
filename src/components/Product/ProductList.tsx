import { toIDR } from "@/helpers/toIDR";
import { Card, Spinner } from "@material-tailwind/react";
import { Pagination } from "./Pagination";
import { useProductContext } from "./context/ProductContext";


const ProductListPage = () => {

    const { state } = useProductContext();
    const { loadingProductList, productList } = state;


    const renderProducts = () => {
        return productList.map((item) => {
            const { id, name, price, image } = item;

            return (
                <div className='w-[50%] md:w-[33.33%] lg:w-[25%] p-3' key={id}>
                    <Card placeholder='' className='overflow-hidden'>
                        <a href={`/product/detail/${id}`}>
                            <div className='w-full'>
                                <img src={image} className='' />
                            </div>
                            <div className="p-3">
                                <div className='text-sm'>{name} </div>
                                <div className='font-bold'>{toIDR(price)}</div>
                            </div>
                        </a>
                    </Card>
                </div>
            )
        })

    }


    return (
        <div className="container mt-8 pb-24">
            <div className='font-bold text-black text-lg mt-8'>Product List</div>

            <div className='flex flex-wrap mt-4'>
                {loadingProductList ? <Spinner color="teal" className="h-12 w-12 m-auto" /> : renderProducts()}

            </div>
            <div className='mt-8'>
                <Pagination />
            </div>
        </div>
    )
}

export default ProductListPage;