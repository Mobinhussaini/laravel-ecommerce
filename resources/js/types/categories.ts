export interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    is_active: boolean;
    color: string;
}


export interface CreateCategoryItem {
    name: string;
    slug: string;
    image: File | null;
    description: string;
    is_active: boolean;
    color: string;
}
