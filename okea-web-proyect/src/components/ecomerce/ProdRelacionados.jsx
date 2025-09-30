import { CardProductosRel } from "./CardProductosRel";
export function ProdRelacionados() {
    return(
        <div className="w-[1568px] h-[368px] mt-20 mb-50">
            <h1 className="text-[45px] mb-10 flex justify-center mb-20" style={{fontFamily: 'Inter'}}>Productos Relacionados</h1>
            <div className="flex gap-10 overflow-x-auto scrollbar-hide justify-center">
                <CardProductosRel/>
                <CardProductosRel/>
                <CardProductosRel/>
                <CardProductosRel/>
                <CardProductosRel/>
                <CardProductosRel/>
            </div>
        </div>
    )
}