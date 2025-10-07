import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { PaginacionBar } from "./PaginacionBar";
export function Products({ products , categoria}) {
    const [page, setPage] = useState(1);
    const productsPerPage = 20;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = products.slice(start, end);
    return (
        <div className="flex flex-col items-center">
            <PaginacionBar
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
            <div className="grid grid-cols-4 gap-3 w-[1295px] max-h-[3525px] mt-6 mb-6">
                {productsToShow.map(product => (
                    <ProductCard key={product.id} {...product} categoria={categoria}/>
                ))}
            </div>
            <PaginacionBar
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
        
    );
}