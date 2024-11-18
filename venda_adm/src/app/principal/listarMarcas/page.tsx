"use client";

import { useEffect, useState } from "react";

interface Marca {
  id: number;
  nome: string;
}

export default function MarcasList() {
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`);
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      }
    }
    fetchMarcas();
  }, []);

  return (
    <section className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Lista de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Marcas</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marcas.map((marca) => (
          <div
            key={marca.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md dark:bg-gray-800 p-4"
          >
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {marca.nome}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <b>ID:</b> {marca.id}
              </p>
            </div>
          </div>
        ))}
      </div>

      {marcas.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          <p>Nenhuma marca encontrada.</p>
          <br />
        </div>
      )}
    </section>
  );
}
