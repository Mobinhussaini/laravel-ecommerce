import ProductList from '@/components/frontend/product-list';
import ShopBanner from '@/components/frontend/shop-banner';
import ShopCategories from '@/components/frontend/shop-categories';
import ShopFrontLayout from '@/layouts/shop-front-layout';
import ProductDetails from './product-details';

const Home = () => {
    return (
        <ShopFrontLayout>
            <div className="h-full w-full">
                <ShopBanner />
                <div className="py-16">
                    <ShopCategories />
                </div>
                <div className='py-12'>
                    <ProductList />
                </div>
            </div>
        </ShopFrontLayout>
    );
};

export default Home;
