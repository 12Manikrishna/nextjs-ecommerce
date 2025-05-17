'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

// Extended product type with additional details
interface ProductDetails {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  specifications: {
    [key: string]: string;
  };
  features: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
}

// Product database with detailed information
const productDatabase: { [key: number]: ProductDetails } = {
  1: {
    id: 1,
    name: "MacBook Pro 2024",
    price: 1299,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    description: "Experience the power of Apple's latest M3 chip in this stunning MacBook Pro. Perfect for professionals and creatives who demand the best performance.",
    specifications: {
      "Processor": "Apple M3 Pro chip",
      "Memory": "16GB unified memory",
      "Storage": "512GB SSD",
      "Display": "14-inch Liquid Retina XDR display",
      "Battery": "Up to 18 hours",
      "Weight": "3.5 pounds"
    },
    features: [
      "ProMotion technology with adaptive refresh rates",
      "1080p FaceTime HD camera",
      "Six-speaker sound system",
      "Magic Keyboard with Touch ID",
      "Thunderbolt 4 ports"
    ],
    category: "Laptops",
    brand: "Apple",
    stock: 15,
    rating: 4.8,
    reviews: 234
  },
  2: {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fHww",
    description: "The most advanced iPhone ever. Featuring a titanium design, A17 Pro chip, and an advanced camera system.",
    specifications: {
      "Processor": "A17 Pro chip",
      "Memory": "8GB RAM",
      "Storage": "256GB",
      "Display": "6.1-inch Super Retina XDR",
      "Battery": "Up to 23 hours",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
    },
    features: [
      "Titanium design",
      "Dynamic Island",
      "Always-On display",
      "Emergency SOS via satellite",
      "USB-C charging"
    ],
    category: "Smartphones",
    brand: "Apple",
    stock: 25,
    rating: 4.9,
    reviews: 567
  },
  // Add more products with their details...
};

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const productId = Number(params.id);
  const product = productDatabase[productId];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-50 opacity-95"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-2xl font-bold text-indigo-600 mt-2">${product.price}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">In Stock: {product.stock}</span>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 