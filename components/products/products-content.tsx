'use client';

import { useState } from 'react';
import { products, Product } from '@/constants/products';
import MainProduct from './main_product';
import FeaturedProducts from './featured_products';

export default function ProductsContent() {
    // State to track which product is currently displayed as main
    const [mainProduct, setMainProduct] = useState<Product>(products[0]);

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