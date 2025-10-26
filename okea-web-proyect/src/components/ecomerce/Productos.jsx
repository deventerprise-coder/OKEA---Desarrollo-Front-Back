import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { PaginacionBar } from "./PaginacionBar";
import { useSort } from "./useSort";
export function Products({ products , categoria, isLight}) {
    const [page, setPage] = useState(1);
    const { selected, sortProducts } = useSort();
    const productsPerPage = 20;
    
    const sortedProducts = sortProducts(products, selected);
    
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = sortedProducts.slice(start, end);
    return (
        <div className="flex flex-col items-center w-full min-h-[980px]">
            <PaginacionBar
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                isLight={isLight}
            />
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-x-9 gap-y-6 2xl:gap-y-9 w-[95%] mt-6 mb-6 place-items-center">
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