import { ThemeProvider } from '@/components/theme-provider';
import { ReactNode } from 'react';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
};

export default GlobalLayout;
