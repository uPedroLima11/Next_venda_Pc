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
      <th scope="row" className="flex items-center text-center gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {avaliacao.nota} <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
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
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Minhas Avaliações</span></h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Produto
            </th>
            <th scope="col" className="px-6 py-3">
              Nota
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Avaliação
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