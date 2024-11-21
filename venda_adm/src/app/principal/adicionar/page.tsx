"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import BannerCategory from "@/components/bannerCategory";

import Cookies from "js-cookie";

type Inputs = {
  modelo: string;
  preco: number;
  foto: string;
  config: string;
  tipo: string;
  marcaId: number;
};
type Marca = {
  id: number;
  nome: string;
};

export default function Adicionar() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { toast } = useToast();
  const router = useRouter();

  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`);
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
      }
    }
    fetchMarcas();
  }, []);

  async function adicionarProduto(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelo: data.modelo,
        preco: data.preco,
        foto: data.foto,
        configuracao: data.config,
        tipo: data.tipo,
        marcaId: data.marcaId,
      }),
    });

    console.log(response);
    if (response.status === 201) {
      router.push("/principal/listarProdutos");
      toast({
        variant: "default",
        title: "Cadastro do produto efetuado com sucesso",
        description: `O produto foi cadastrado com sucesso`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: "Verifique se os dados estão corretos",
      });
    }
  }

  return (
    <section className="mb-10">
      <BannerCategory />
      <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 m space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Adição de Produtos</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(adicionarProduto)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Modelo
                </label>
                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("modelo")} />
              </div>
              <div>
                <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Preço
                </label>
                <input type="number" id="preco" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("preco")} />
              </div>
              <div>
                <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Foto
                </label>
                <input type="foto" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("foto")} />
              </div>
              <div>
                <label htmlFor="config" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Configuração
                </label>
                <input type="config" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("config")} />
              </div>
              <div className="mb-5">
                <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipo do Produto
                </label>
                <select id="tipo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register("tipo")}>
                  <option>MONITOR</option>
                  <option>TECLADO</option>
                  <option>MOUSE</option>
                  <option>HEADSET</option>
                  <option>CADEIRA</option>
                  <option>MESA</option>
                  <option>GABINETE</option>
                  <option>PLACA_DE_VIDEO</option>
                  <option>PLACA_MAE</option>
                  <option>PROCESSADOR</option>
                  <option>MEMORIA_RAM</option>
                  <option>HD</option>
                  <option>SSD</option>
                  <option>FONTE</option>
                  <option>COOLER</option>
                  <option>WEBCAM</option>
                  <option>MICROFONE</option>
                  <option>CAIXA_DE_SOM</option>
                  <option>OUTRO</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="marcaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Marca
                </label>
                <select id="marcaId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register("marcaId", { valueAsNumber: true })} required>
                  <option value="" disabled>
                    Selecione uma marca
                  </option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
