"use client"
import { Textarea } from "@/components/ui/textarea"
import { useClienteStore } from "@/context/cliente"
import { ProdutoI } from "@/utils/types/produtos"
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

  return (
    <section className="my-10">
      <h1 className="ms-48 mt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Deseja confirmar a comprar do seguinte Produto? :{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
          {produto?.marca.nome} {produto?.modelo}
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
          {!cliente.id ? <>
          <h5 className="text-[#cba35c]">Você deve se logar para realizar uma proposta</h5>
          </> :
          <>
          <div>
            <form>
              <h5 className="text-white font-bold">Email: {cliente.email}</h5>
              <Textarea className="bg-white mt-5" {...register("descricao")} />
            </form>
            </div> 
            </>
          }
        </div>
      </div>
    </section>
  )
}