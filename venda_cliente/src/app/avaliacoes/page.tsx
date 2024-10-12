'use client'

import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { AvaliacoesI } from "@/utils/types/avaliacoes";

export default function avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes/${cliente.id}`)
      const dados = await response.json()
      setAvaliacoes(dados)
    }
    buscaDados()
  }, [])

  // para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const avaliacoesTable = avaliacoes.map(avaliacao => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {avaliacao.produto.modelo}
      </th>
      <td className="px-6 py-4 w-36">
        <img src={avaliacao.produto.foto} className="fotoProduto" alt="Foto Produto" />
      </td>
      <td className="px-6 py-4">
        <p><b>{avaliacao.descricao}</b></p>
        <p><i>Enviado em: {dataDMA(avaliacao.createdAt)}</i></p>
      </td>
    </tr>
  ))

  return (
    <section className="max-w-7xl mx-auto my-10">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Minhas Propostas</span></h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Modelo do VeÃ­culo
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Proposta
            </th>
            </tr>
        </thead>
        <tbody>
          {avaliacoesTable}
        </tbody>
      </table>
    </section>
  )
}