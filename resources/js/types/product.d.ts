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
export interface SimilarProduct {
    id: string;
    name: string;
    price: number;
    reviewCount: number;
    image: string;
}
export interface CreateProductItem {
    name: string;
    category_id: string;
    slug: string;
    price: number;
    original_price: number;
    description: string;
    features: string;
    image: File | null;
    galary: File[] | null;
    colors: string;
    is_featured: boolean;
};




