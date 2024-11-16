'use client';

import { useEffect, useState } from "react";

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

export default function ProdutosList() {
    const [produtos, setProdutos] = useState<ProdutoI[]>([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }
        fetchProdutos();
    }, []);

    return (
        <section className="max-w-7xl mx-auto my-10">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Lista de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Produtos</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        className="flex flex-col items-center bg-white rounded-lg shadow-md dark:bg-gray-800 p-4"
                    >
                        <img
                            src={produto.foto || "/default-product.png"}
                            alt={produto.modelo}
                            className="w-full h-40 object-cover rounded-lg"
                        />

                        <div className="mt-4 text-center">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                {produto.modelo}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <b>Marca:</b> {produto.marca?.nome || "Marca desconhecida"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <b>Preço:</b> R$ {typeof produto.preco === "number" ? produto.preco.toFixed(2) : "Não disponível"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <b>ID:</b> {produto.id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
