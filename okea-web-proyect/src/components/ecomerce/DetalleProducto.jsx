import { FavoritoCardIcon } from "../../assets/iconos/Icons"
import{ useState } from "react";
import { CalificacionOptions } from "./Filtro";
import { OpinioneDetalleIcon, RemoveProductIcon, AddProductIcon, AddProductToCarIcon } from "../../assets/iconos/Icons";
import {ShoppingCartIcon} from "../../assets/iconos/iconoHome";
import {EnvioEstadarIcon, EnvioExpressoIcon, DevolucionesDetalleIcon, EntregaDetalleIcon} from "../../assets/iconos/Icons";
export default function DetalleProducto() {
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);
    const iconColor =added ? "#FFFFFF" : "#484900";
    return (
        <div className="flex mt-20 justify-center">
            <div className="w-[60%]"> </div>
            <aside className="flex flex-col w-[40%] gap-4 mr-10">
                <div className="flex justify-between">
                    <h2 className="text-[45px] font-semibold font-[Poppins, sans-serif] text-[#001947]">iPhone 12</h2>
                    <button className="cursor-pointer mr-4" onClick={() => setLiked(!liked)}>
                        <FavoritoCardIcon color={liked ? "#EB5A45" : "#C4C6D3"} size="24"/>
                    </button>
                </div>
                <p className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[12px] underline">By Apple</p>
                <div className="flex gap-5">
                    <span className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[16px] flex items-center gap-2">
                        5.0 <CalificacionOptions calificacion={5} width={20} height={19.07} />
                    </span>
                    <span className="text-[#919094] font-[Poppins, sans-serif] font-medium text-[12px] flex items-center gap-1">
                        <OpinioneDetalleIcon /> 110 opiniones
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="text-[36px] font-bold font-[Poppins, sans-serif] text-[#F4604B]">S/200</span>
                    <span className="text-[24px] font-[Poppins, sans-serif] font-regular line-through text-[#D8D8D8]">S/200</span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[12px] underline">Cuotas sin intereses</p>
                    <p className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[12px] underline">Stock disponible</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-[#2B2B2B] font-[Poppins, sans-serif] font-medium text-[12px]">Color:</p>
                    <div className="flex gap-2">
                        <div className="w-[32px] h-[32px] rounded-full bg-[#053559] ml-3"></div>
                        <div className="w-[32px] h-[32px] rounded-full bg-[#16141F]"></div>
                        <div className="w-[32px] h-[32px] rounded-full bg-[#BFB6EB]"></div>
                        <div className="w-[32px] h-[32px] rounded-full bg-[#DDF4D8]"></div>
                        <div className="w-[32px] h-[32px] rounded-full bg-[#F9F6F1]"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <p className="text-[#2B2B2B] font-[Poppins, sans-serif] font-medium text-[12px]">Tamaño:</p>
                    <div className="flex gap-3 ml-2">
                        <div className="w-[84px] h-[48px] rounded-[20px] bg-[#E4E2E6] text-[#001947] 
                        text-[16px] font-[Poppins, sans-serif] font-medium flex items-center justify-center cursor-pointer border border-[#AAABB4] hover:border-[#001947] border-[1.5px]">
                            64 GB
                        </div>
                        <div className="w-[84px] h-[48px] rounded-[20px] bg-[#E4E2E6] text-[#001947] 
                        text-[16px] font-[Poppins, sans-serif] font-medium flex items-center justify-center cursor-pointer border border-[#AAABB4] hover:border-[#001947] border-[1.5px]">
                            128 GB
                        </div>
                        <div className="w-[84px] h-[48px] rounded-[20px] bg-[#E4E2E6] text-[#001947] 
                        text-[16px] font-[Poppins, sans-serif] font-medium flex items-center justify-center cursor-pointer border border-[#AAABB4] hover:border-[#001947] border-[1.5px]">
                            256 GB
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <p className="text-[#2B2B2B] font-[Poppins, sans-serif] font-medium text-[12px]">Cantidad:</p>
                    <div className="flex items-center gap-3">
                        <button className="w-[38px] h-[38px] rounded-full bg-[#E4E2E6] text-[#001947] border border-[#C7C6CA] items-center justify-center flex cursor-pointer">
                            <RemoveProductIcon />
                        </button>
                        <span className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[24px]">0</span>
                        <button className="w-[38px] h-[38px] rounded-full bg-[#E4E2E6] text-[#001947] border border-[#C7C6CA] items-center justify-center flex cursor-pointer">
                            <AddProductIcon />
                        </button>
                    </div>
                </div>
                <div className="flex gap-4 mt-2 items-center justify-between">
                    <button
                        className={`w-[98%] h-[32px] flex items-center justify-center gap-2 py-2 px-7 rounded-4xl cursor-pointer ${added ? 'bg-[#EB5A45] text-white' : 'bg-[#DFE162] text-[#484900]'} transition-colors duration-500 ease-out font-[Poppins, sans-serif] font-medium text-[14px]`}
                        onClick={() => setAdded(!added)}>
                        <span
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 300ms ease',
                            transform: added ? 'translateX(130px)' : 'translateX(0)',
                            }}
                        >
                            <ShoppingCartIcon color={iconColor} />
                        </span>
                        <span
                            style={{
                            transition: 'color 300ms',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            marginLeft: added ? '-40px' : '0',
                            }}
                        >
                            {added ? 'Producto agregado' : 'Agregar al carrito'}
                        </span>
                    </button>
                    <button
                        className={`flex items-center justify-center w-[44px] h-[44px] cursor-pointer ${added ? 'bg-[#EB5A45]' : 'bg-[#F5F692]'} transition-colors duration-500 ease-out rounded-full`}
                        onClick={() => setAdded(!added)}
                    >
                        <AddProductToCarIcon />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <section className="flex gap-3">
                        <div className="rounded-[15px] flex items-center justify-center w-[72px] h-[48px] bg-[#E4E2E6]">
                            <EnvioEstadarIcon />
                        </div>
                        <div>
                            <h6 className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[16px]">Envío estándar</h6>
                            <p className="text-[#ACAAAF] font-[Poppins, sans-serif] font-medium text-[12px]">
                                <span className="text-[#001947]">Gratis</span> / Jue.13 - Mart.15 Junio
                            </p>
                        </div>
                    </section>
                    <section className="flex gap-3">
                        <div className="rounded-[15px] flex items-center justify-center w-[72px] h-[48px] bg-[#E4E2E6]">
                            <EnvioExpressoIcon />
                        </div>
                        <div>
                            <h6 className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[16px]">Envío expresso</h6>
                            <p className="text-[#ACAAAF] font-[Poppins, sans-serif] font-medium text-[12px]">
                                <span className="text-[#001947]">s/20.00</span> / Dom.10 Junio
                            </p>
                        </div>
                    </section>
                    <section className="flex gap-3">
                        <div className="rounded-[15px] flex items-center justify-center w-[72px] h-[48px] bg-[#E4E2E6]">
                            <DevolucionesDetalleIcon />
                        </div>
                        <div>
                            <h6 className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[16px]">Política de devoluciones</h6>
                            <p className="text-[#ACAAAF] font-[Poppins, sans-serif] font-medium text-[12px]">
                                <span className="text-[#001947]">Gratis</span> /  En 30 días
                            </p>
                        </div>
                    </section>
                    <section className="flex gap-3">
                        <div className="rounded-[15px] flex items-center justify-center w-[72px] h-[48px] bg-[#E4E2E6]">
                            <EntregaDetalleIcon />
                        </div>
                        <div>
                            <h6 className="text-[#001947] font-[Poppins, sans-serif] font-medium text-[16px]">Entregas a tiempo</h6>
                            <p className="font-[Poppins, sans-serif] font-medium text-[12px] text-[#001947]">
                               Estándar / Expreso
                            </p>
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    )
}