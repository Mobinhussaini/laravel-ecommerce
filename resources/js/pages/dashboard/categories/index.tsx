import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CatgoriesDataTable from '@/components/dashboard/categories-data-table';
import { CategoryItem } from '@/types/categories';

const breadcrumbs: BreadcrumbItem [] =[
    {
        title: "Categories",
        href:"/categories",
    }
]

const Categories = ({categories}:{categories: CategoryItem[]}) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
                <CatgoriesDataTable categories={categories} />
            </div>
        </AppLayout>
    );
};

export default Categories;
