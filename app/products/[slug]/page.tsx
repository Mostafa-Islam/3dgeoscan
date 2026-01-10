'use client';

import { useParams } from 'next/navigation';
import { products } from '@/constants/products';
import { useState } from 'react';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [show3D, setShow3D] = useState(false);

  if (!product) return <p className="p-10">Product not found</p>;

  return (
    <section className="min-h-screen pt-28 px-6 max-w-6xl mx-auto snap-start">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Product Image */}
        <div
          onClick={() => setShow3D(true)}
          className="cursor-pointer bg-gray-50 rounded-3xl p-8"
        >
          <img
            src={product.productImage}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Click to view 3D model
          </p>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <h3 className="font-semibold mb-2">Package Includes</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {product.packageIncludes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Software</h3>
          <p className="text-gray-600">{product.software}</p>
        </div>
      </div>

      {/* 3D MODAL */}
      {show3D && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden">
            <button
              onClick={() => setShow3D(false)}
              className="absolute top-3 right-3 z-10 bg-white rounded-full px-3 py-1 text-sm font-semibold"
            >
              ✕ Close
            </button>

            <iframe
              src={product.sketchfabUrl}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}