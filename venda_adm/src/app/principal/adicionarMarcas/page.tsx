"use client";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import BannerCategory from "@/components/bannerCategory";

type Inputs = {
    nome: string;
};

export default function AdicionarMarca() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { toast } = useToast();

    async function adicionarMarca(data: Inputs) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome: data.nome }),
        });

        if (response.status === 201) {
            const dados = await response.json();
            console.log(dados);
            toast({
                variant: "default",
                title: "Marca criada com sucesso",
                description: `A marca "${dados.nome}" foi adicionada ao sistema.`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Erro ao criar marca",
                description: "Verifique se os dados estão corretos.",
            });
        }
    }

    return (
        <section className="mb-10">
            <BannerCategory />
            <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 m space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Adicionar Marca
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(adicionarMarca)}
                        >
                            <div>
                                <label
                                    htmlFor="nome"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nome da Marca
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("nome")}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white  bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
