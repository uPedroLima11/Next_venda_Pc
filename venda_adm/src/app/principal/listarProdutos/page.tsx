"use client";

import BannerCategory from "@/components/bannerCategory";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ProdutoI {
  id: number;
  modelo: string;
  descricao: string;
  preco: number;
  foto: string;
  marca: {
    id: number;
    nome: string;
  } | null;
}

const tiposDeProduto = [
  "MONITOR", "TECLADO", "MOUSE", "HEADSET", "CADEIRA", "MESA",
  "GABINETE", "PLACA_DE_VIDEO", "PLACA_MAE", "PROCESSADOR",
  "MEMORIA_RAM", "HD", "SSD", "FONTE", "COOLER", "WEBCAM",
  "MICROFONE", "CAIXA_DE_SOM"
];

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const url = tipoSelecionado
          ? `${process.env.NEXT_PUBLIC_URL_API}/produtos?tipo=${tipoSelecionado}`
          : `${process.env.NEXT_PUBLIC_URL_API}/produtos`;
        const response = await fetch(url);
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    fetchProdutos();
  }, [tipoSelecionado]);

  const handleFiltroClick = (tipo: string | null) => {
    setTipoSelecionado(tipo);
    setMostrarFiltro(false);
  };

  async function removerProduto(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      });

      if (response.ok) {
        setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== id));
        console.log(`Produto com ID ${id} removido com sucesso.`);
      } else {
        console.error(`Erro ao remover produto com ID ${id}. Código: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição de remoção:", error);
    }
  }

  return (
    <section className="max-w-7xl mx-auto my-10">
      <BannerCategory />
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Lista de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Produtos</span>
        </h1>
        <div className="relative">
          <button
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
            className="bg-orange-400 text-white py-2 px-4 rounded-md"
          >
            Filtrar
          </button>
          {mostrarFiltro && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48">
              <button
                onClick={() => handleFiltroClick(null)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Todos
              </button>
              {tiposDeProduto.map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => handleFiltroClick(tipo)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  {tipo}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 w-full"
          >
            <img
              src={produto.foto || "/default-product.png"}
              alt={produto.modelo}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4 text-left w-full">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                ID: {produto.id} - {produto.modelo}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <b>Marca:</b> {produto.marca?.nome || "Marca desconhecida"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <b>Preço:</b> R$ {typeof produto.preco === "number" ? produto.preco.toFixed(2) : "Não disponível"}
              </p>
              <button
                onClick={() => removerProduto(produto.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {produtos.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          <p>Nenhum produto encontrado.</p>
        </div>
      )}
    </section>
  );
}
