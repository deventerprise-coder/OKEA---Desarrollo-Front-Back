import {HeartIconblack, ShoppingCartIcon } from "../../assets/iconos/iconoHome";
import { EstrellaIcon, FavoritoCardIcon } from "../../assets/iconos/Icons";
import { useState } from "react";
import laptopImg from "../../assets/imagenes/laptop.png";
export function CardProductosRel() {
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);
    return(
        <div className="w-[230px] h-[368px] bg-[#F4F3FA] rounded-3xl overflow-hidden hover:border-[#EB5A45] border border-transparent group">
            <div className="relative w-57.5 h-50 bg-[#EEEDF4]">
                <div className="w-full h-[200px] overflow-hidden"> 
                    <img className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-110" src={laptopImg} alt="Product" />
                    </div>
                <div className=" absolute top-3 rounded-3xl bg-[#EB5A45] w-15 font-popins text-sm text-white text-center ml-2">-50%</div>
                <div className="absolute top-2 right-3 cursor-pointer" onClick={() => setLiked(!liked)}> {liked ? <FavoritoCardIcon color="#EB5A45" size="20"/> : <FavoritoCardIcon color="#C4C6D3" size="20"/>}</div>
            </div>
            <div className="info font-popins pt-4 px-3 ">
                <div className="flex  text-black justify-between">
                    <h1 className='text-2xl'>Label</h1>
                    <div className="flex p-0.5 justify-center items-center">
                        <div className="staricon"> <EstrellaIcon color="#EB5A45" TamanoIcon="15"/></div>
                        <h1 className='font-popins-light text-[14px]'>4.9</h1>
                    </div>
                </div>
                <h1>Wooden Sofa Chair</h1>
                <div className="flex">
                    <h1 className='text-2xl text-[#EB5A45]'>$80.00</h1>
                    <h1 className='font-popins-light text-[#747782] line-through text-xs pt-2 ml-4'>s/ 160.00</h1>    
                </div>
                <div className="justify-center flex">
                    <button 
                    className={`flex py-3  w-49.5 px-7 mt-3 mb-4 h-10 rounded-4xl ${added ? 'bg-[#1C4390] text-white' : 'bg-[#DFE162]/80 text-[#484900]'} cursor-pointer`} 
                    onClick={() => setAdded(!added)}>
                        <div className="scale-120 flex">    
                            <div className="scale-60 "
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'transform 300ms ease',
                                transform: added ? 'translateX(180px)' : 'translateX(0)',
                                }}> 
                                <ShoppingCartIcon color={added ? "#FFFFFF" : "#484900"}/>
                            </div>
                            <h1 className='text-xs' 
                            style={{
                                transition: 'color 300ms',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                marginLeft: added ? '-7px' : '0',
                            }}>
                                {added ? 'Ítem agregado' : 'Agregar al carrito'}
                            </h1>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}