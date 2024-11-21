"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useClienteStore } from "@/context/cliente";

import Cookies from "js-cookie";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

type Inputs = {
  email: string;
  senha: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { toast } = useToast();
  const { logaCliente } = useClienteStore();
  const router = useRouter();
  const [visivel, setVisivel] = useState(false);

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: data.email, senha: data.senha }),
    });
    if (response.status === 200) {
      const dados = await response.json();
      logaCliente(dados);

      Cookies.set("admin_logado_id", dados.id);
      Cookies.set("admin_logado_nome", dados.nome);
      Cookies.set("admin_logado_token", dados.token)

      router.push("/principal");
    } else {
      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: "Verifique suas credenciais e tente novamente",
        action: <ToastAction altText="Repetir">Repetir</ToastAction>,
      });
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login no Sistema</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Seu email
                </label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("email")} />
              </div>
              <div>
                <label htmlFor={"password"} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Senha
                </label>
                <div className="relative mb-6">
                  <input type={visivel ? "text" : "password"} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("senha")} />
                  <div className="absolute cursor-pointer inset-y-0 end-0 flex items-center pe-3.5" onClick={() => setVisivel(!visivel)}>
                    {visivel ? <Eye className="text-gray-400" /> : <EyeClosedIcon className="text-gray-400" />}
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
