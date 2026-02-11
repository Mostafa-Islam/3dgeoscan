// components/products/products-content.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/constants/products';
import MainProduct from './main_product';
import FeaturedProducts from './featured_products';

export default function ProductsContent() {
    const searchParams = useSearchParams();
    
    // Get product slug from URL query parameter
    const productSlug = searchParams.get('product');
    
    // Find the product by slug, or default to first product
    const getInitialProduct = (): Product => {
        if (productSlug) {
            const foundProduct = products.find(p => p.slug === productSlug);
            if (foundProduct) return foundProduct;
        }
        return products[0];
    };

    // State to track which product is currently displayed as main
    const [mainProduct, setMainProduct] = useState<Product>(getInitialProduct());

    // Update main product when URL changes
    useEffect(() => {
        if (productSlug) {
            const foundProduct = products.find(p => p.slug === productSlug);
            if (foundProduct) {
                setMainProduct(foundProduct);
            }
        }
    }, [productSlug]);

    // Get all products except the current main product for the featured grid
    const featuredProducts = products.filter(p => p.id !== mainProduct.id);

    // Handler to swap products
    const handleSelectProduct = (selectedProduct: Product) => {
        setMainProduct(selectedProduct);
    };

    return (
        <>
            <MainProduct product={mainProduct} />
            <FeaturedProducts 
                products={featuredProducts} 
                onSelectProduct={handleSelectProduct} 
            />
        </>
    );
}