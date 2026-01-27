import React from 'react';
import { Star } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Premium Product 1',
        price: '₹1,200',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=989&q=80',
        category: 'Category A'
    },
    {
        id: 2,
        name: 'Premium Product 2',
        price: '₹2,500',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        category: 'Category B'
    },
    {
        id: 3,
        name: 'Premium Product 3',
        price: '₹850',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        category: 'Category A'
    },
    {
        id: 4,
        name: 'Premium Product 4',
        price: '₹3,200',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
        category: 'Category C'
    },
];

const ProductGrid: React.FC = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Featured Products
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Check out our most popular items, curated just for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative pb-[100%]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                    </div>
                                </div>
                                <button className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-primary transition-colors duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
