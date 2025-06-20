
import ProductsDataTable from '@/components/dashboard/products-data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem [] =[
    {
        title: "Products",
        href:"/products",
    }
]
const ProductPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
                <ProductsDataTable />
            </div>
        </AppLayout>
    );
};

export default ProductPage;
