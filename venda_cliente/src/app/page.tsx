"use client";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemProdutos } from "@/components/ItemProdutos";
import { ProdutoI } from "@/utils/types/produtos";
import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
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
      <h1 className="mt-5 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Produtos{" "}
      </h1>
      <section className=" mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaProdutos}
      </section>
    </div>
    </>
  );
}
