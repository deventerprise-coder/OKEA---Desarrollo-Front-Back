import React from "react";
import {SidebarMenu} from "../../components/ecomerce/Filtro";
import {ProductCard} from "../../components/ecomerce/ProductCard";
import {Products} from "../../components/ecomerce/Productos";
import { PaginacionBar } from "../../components/ecomerce/PaginacionBar";
import { ProdRelacionados } from "../../components/ecomerce/ProdRelacionados";
import { Panel } from "../../components/ecomerce/Panel";
import { BreadCrum } from "../../components/ecomerce/BreadCrum";
export default function Categoria() {
  return (
    <>
      <BreadCrum/>
      <Panel/>
      <div className="flex mt-30">
        <SidebarMenu/>
        <aside className="flex flex-col justify-center items-center">
          <PaginacionBar/>
          <Products/>
          <PaginacionBar/>
        </aside>
      </div>
      <div className="flex items-center justify-center">
        <ProdRelacionados/>
      </div> 
    </>
  );
}