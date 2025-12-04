import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerOfertop = ({ backgroundImage }) => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full h-32 md:h-40 bg-cover bg-center flex flex-col justify-center items-center relative overflow-hidden shadow-sm rounded-lg"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="text-center text-white px-4 z-10">
                <h2 className="text-md md:text-3xl mb-5 md:mb-7 drop-shadow-lg">
                    ¡Invita amigos a Ofertop
                    {" "}
                    <span className="font-bold">y gana S/ 40.00!</span>
                </h2>                
                <button className="bg-white lg:cursor-pointer text-red-600 text-sm md:text-base font-bold py-2 px-6 md:px-8 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300" onClick={() => navigate('/')}>
                    ENTÉRATE DE MÁS
                </button>
            </div>
        </div>
    );
};

export default BannerOfertop;