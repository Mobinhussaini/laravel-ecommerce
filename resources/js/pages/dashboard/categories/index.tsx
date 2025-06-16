import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem [] =[
    {
        title: "Categories",
        href:"/categories",
    }
]

const Categories = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
                <h2>This is the Category page11111111!</h2>
            </div>
        </AppLayout>
    );
};

export default Categories;
