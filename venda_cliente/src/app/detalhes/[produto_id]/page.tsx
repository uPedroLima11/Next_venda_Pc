"use client"
import { Textarea } from "@/components/ui/textarea"
import { useClienteStore } from "@/context/cliente"
import { toast } from "@/hooks/use-toast"
import { ProdutoI } from "@/utils/types/produtos"
import { ToastAction } from "@radix-ui/react-toast"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const { cliente } = useClienteStore();
  const [produto, setProduto] = useState<ProdutoI>()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${params.produto_id}`)
      const dados = await response.json()
      setProduto(dados)
    }
    getDados()
  }, [])

  async function enviaProposta(data: Inputs) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteid: cliente.id,
        produtoId: Number(params.produto_id),
        descricao: data.descricao,
        nota:5
      })
    })
  
    if (response.status == 201) {
      toast({
        variant: "default",
        title: "Avalição enviada",
        description: "Sua Avalição foi enviada com sucesso",
      });
      reset()
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
    <section className="my-10">
      <h1 className="ms-48 mt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Deseja avaliar o Produto :{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
          {produto?.marca.nome} {produto?.modelo}?
        </span>
      </h1>

      <div className="flex flex-col mt-10 mx-auto items-center border rounded-lg  shadow md:flex-row md:max-w-5xl border-gray-700 bg-gray-800">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg" src={produto?.foto} alt="Imagem do Carro" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{produto?.marca.nome} {produto?.modelo}</h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">Configuração: <br/><br/> {produto?.configuracao}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Preço: 
            <span className="text-green-600"> R${Number(produto?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
          </h5>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight mt-5 text-white">Faça uma avalição do produto!</h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Descreva a sua proposta" 
                  required
                  {...register("descricao")}></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Proposta</button>
              </form>
            </>
            :
            <h3 className="text-xl font-bold tracking-tight text-orange-700">Faça login para fazer avaliação sobre este Produto</h3>
          }
        </div>
      </div>
    </section>
  )
}