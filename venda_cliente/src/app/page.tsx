"use client";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemProdutos } from "@/components/ItemProdutos";
import { ProdutoI } from "@/utils/types/produtos";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function getCliente(idCliente: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`
      );
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/produtos`
      );
      const dados = await response.json();
      setProdutos(dados);
    }
    getDados();
  }, []);

  const listaProdutos = produtos.map((produto) => (
    <ItemProdutos data={produto} key={produto.id} />
  ));

  return (
    <>
      <InputPesquisa setProdutos={setProdutos} />
      <div className="mx-auto max-w-screen-xl ">
        <h1 className=" p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-slate-600 from-yellow-400">
            Promoções
          </span>
        </h1>
        <section className=" mb-10 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {listaProdutos}
        </section>
        <Pagination className="mb-10 mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
