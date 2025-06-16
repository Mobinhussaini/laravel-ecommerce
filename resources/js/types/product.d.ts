export type Product = {
    id: string;
    name: string;
    originalPrice: number;
    discountPrice: number;
    discountPercentage: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    isNew?: boolean;
    favorite?: boolean;
    inCart?: boolean;
    stock: number;
};


