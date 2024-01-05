
import ProductDetail from '@/components/Product/Detail';

export default function Page({ params }: { params: { productId: string } }) {

    return (
        <ProductDetail productId={params.productId} />
    )
}

