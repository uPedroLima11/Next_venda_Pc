"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  idProduto: number;
};

export default function Remover() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { toast } = useToast();
  const router = useRouter();

  async function removerProduto(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${data.idProduto as number}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const dados = await response.json();
      toast({
        variant: "default",
        title: "Produto removido com sucesso",
        description: `O produto foi removido com sucesso`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: "Verifique se o ID do produto está correto",
      });
    }
  }

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 m space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Remover de Produtos</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(removerProduto)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ID do produto a ser removido
                </label>
                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("idProduto")} />
              </div>
              <button type="submit" className="w-full text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Remover
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
