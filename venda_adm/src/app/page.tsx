"use client";
import { ProdutoI } from "@/utils/types/produtos";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import Banner from "@/components/banner";
import Image from "next/image";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function getCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`);
      if (response.status === 200) {
        const dados = await response.json();
        logaCliente(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const clienteSalvo = localStorage.getItem("client_key") as string;
      getCliente(clienteSalvo);
    }

    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
      const dados = await response.json();
      setProdutos(dados);
    }
    getDados();
  }, []);

  return (
    <>
      <Banner />
      <section className="grid grid-cols-4 p-20">
          <div className="w-72 max-w-sm bg-[#202020] border-gray-200 rounded-3xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <a href="#">
              <img className="p-5 rounded-[2rem]" src={"/placamae.png"} alt="product image" />
            </a>
          </div>
          <div className="w-72 max-w-sm bg-[#202020] border-gray-200 rounded-3xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <a href="#">
              <img className="p-5 rounded-[2rem]" src={"/amd.jpg"} alt="product image" />
            </a>
          </div>
          <div className="w-72 max-w-sm bg-[#202020] border-gray-200 rounded-3xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <a href="#">
              <img className="p-5 rounded-[2rem]" src={"/placamae.png"} alt="product image" />
            </a>
          </div>
          <div className="w-72 max-w-sm bg-[#202020] border-gray-200 rounded-3xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <a href="#">
              <img className="p-5 rounded-[2rem]" src={"/placamae.png"} alt="product image" />
            </a>
          </div>
      </section>
    </>
  );
}
