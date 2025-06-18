'use client';
import { Camera, Headphones, Home, Laptop, Shirt, ShoppingBag, ToyBrick, Watch } from 'lucide-react';

const categories = [
    {
        name: 'Electronics',
        icon: <Headphones size={24} />,
        items: 1284,
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        name: 'Computers',
        icon: <Laptop size={24} />,
        items: 876,
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
        name: 'Fashion',
        icon: <Shirt size={24} />,
        items: 1532,
        bgColor: 'bg-pink-100 dark:bg-pink-900/30',
        textColor: 'text-pink-600 dark:text-pink-400',
    },
    {
        name: 'Watches',
        icon: <Watch size={24} />,
        items: 342,
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
        name: 'Home & Garden',
        icon: <Home size={24} />,
        items: 765,
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-600 dark:text-green-400',
    },
    {
        name: 'Photography',
        icon: <Camera size={24} />,
        items: 231,
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-600 dark:text-red-400',
    },
    {
        name: 'Toys & Games',
        icon: <ToyBrick size={24} />,
        items: 543,
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
        textColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
        name: 'Other',
        icon: <ShoppingBag size={24} />,
        items: 987,
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-600 dark:text-gray-400',
    },
];

const ShopCategoriesIcons = () => {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Categories</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Browse products from our most popular categories</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md ${category.bgColor}`}
                    >
                        <div className="relative z-10">
                            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor} ${category.textColor}`}>
                                {category.icon}
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{category.items} items</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-white/20 transition-all duration-500 group-hover:scale-[8] dark:bg-black/20"></div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button className="rounded-lg border-2 border-gray-900 px-6 py-2 font-medium text-gray-900 transition-colors duration-300 hover:bg-gray-900 hover:text-white dark:border-gray-300 dark:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900">
                    View All Categories
                </button>
            </div>
        </div>
    );
};

export default ShopCategoriesIcons;
