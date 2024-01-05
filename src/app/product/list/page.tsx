'use client'
import ProductListPage from '@/components/Product/ProductList';
import { ProductProvider } from '@/components/Product/context/ProductContext';
import { ToasterProvider } from '@/components/common/Toaster/context/ToasterContext';

export default function Page() {
  return (
    <ToasterProvider>
      <ProductProvider>
        <ProductListPage />
      </ProductProvider>
    </ToasterProvider>
  )
}
