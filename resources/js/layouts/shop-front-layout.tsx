import ShopFooter from '@/components/frontend/shop-footer';
import ShopHeader from '@/components/frontend/shop-header';
import { ReactNode } from 'react';
import GlobalLayout from './global-layout';

const ShopFrontLayout = ({ children }: { children: ReactNode }) => {
    return (
        <GlobalLayout>
            <ShopHeader />
            {children}
            <ShopFooter />
        </GlobalLayout>
    );
};

export default ShopFrontLayout;
