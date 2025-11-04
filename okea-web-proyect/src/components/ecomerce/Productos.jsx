import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { PaginacionBar } from "./PaginacionBar";
import { useSort } from "./useSort";

function useScreenSize() {
    const [screenSize, setScreenSize] = useState('');

    useEffect(() => {
        const getScreenSize = () => {
            const width = window.innerWidth;
            if (width < 768) return 'sm';
            else if (width >= 768 && width < 1024) return 'md';
            else if (width >= 1024 && width < 1280) return 'lg';
            else if (width >= 1280 && width < 1536) return 'xl';
            else return '2xl';
        };

        setScreenSize(getScreenSize());

        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScreenSize(getScreenSize());
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return screenSize;
}

export function Products({ products, categoria, isLight }) {
    const [page, setPage] = useState(1);
    const { selected, sortProducts } = useSort();
    const screenSize = useScreenSize();

    const getProductsPerPage = (size) => {
        switch (size) {
            case 'sm': return 20;
            case 'md': return 21; 
            case 'lg': return 20; 
            case 'xl': return 21; 
            case '2xl': return 20; 
            default: return 20;
        }
    };

    const productsPerPage = getProductsPerPage(screenSize);
    
    const sortedProducts = sortProducts(products, selected);
    
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = sortedProducts.slice(start, end);

    useEffect(() => {
        setPage(1);
    }, [screenSize]);
    return (
        <div className="flex flex-col items-center w-full min-h-[980px]">
            <PaginacionBar
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                isLight={isLight}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-9 gap-y-6 2xl:gap-y-9 w-[95%] mt-6 mb-6 place-items-center">
                {productsToShow.map(product => (
                    <ProductCard key={product.id} {...product} categoria={categoria} isLight={isLight} />
                ))}
            </div>
            <div className="mt-auto w-full">
                <PaginacionBar
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    isLight={isLight}
                />
            </div>
        </div>
        
    );
}