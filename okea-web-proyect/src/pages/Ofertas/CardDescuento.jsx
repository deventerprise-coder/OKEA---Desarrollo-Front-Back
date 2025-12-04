import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardDescuento = ({ discount, discountArea, area, image }) => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full max-w-[516px] h-[380px] overflow-hidden rounded-xl shadow-md">
            <img
                src={image}
                alt={`Descuento en ${discountArea}`}
                draggable="false"
                className="w-full h-full object-cover select-none lg:hover:scale-105 lg:transition-transform lg:duration-300 lg:cursor-pointer"
                onClick={() => navigate(`/catalogo/${area}`)}
            />
            <div className="absolute top-1 left-1 bg-[#DCE775] text-[#37401C] pt-3 pb-2 px-3 rounded-lg shadow-sm w-36 flex flex-col">
                <span className="text-[10px] font-semibold tracking-wider ml-1">
                    HASTA
                </span>
                <div className="flex flex-row items-center gap-1 leading-none mt-1 -ml-2 w-full">
                    <span className="text-[4.5rem] font-black tracking-tighter leading-none h-full">
                        {discount}
                    </span>
                    <div className="flex flex-col items-center h-full">
                        <span className="text-6xl font-semibold leading-[0.8]">
                            %
                        </span>
                        <span className="text-[10px] font-bold leading-none mt-1">
                            DCTO.
                        </span>
                    </div>
                </div>
                <div className="mt-1 ml-1 flex items-baseline gap-1">
                    <p className="text-[10px] font-medium text-[#5a633a]">
                        EN TODO LOS
                    </p>
                    <p className="text-sm font-black uppercase text-[#37401C]">
                        {discountArea}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CardDescuento;