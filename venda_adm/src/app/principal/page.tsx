"use client";
import { ProdutoI } from "@/utils/types/produtos";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import Banner from "@/components/banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, TextIcon, Users } from "lucide-react";
import ChartOverview from "@/components/chart";
import Sales from "@/components/sales";
import { ClienteI } from "@/utils/types/clientes";
import { MarcaI } from "@/utils/types/marcas";
import { AvaliacoesI } from "@/utils/types/avaliacoes";

interface geralDadosI {
  clientes: number
  carros: number
  propostas: number
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);
  const [pessoas, setPessoas] = useState<ClienteI[]>([])
  const [marcas, setMarcas] = useState<MarcaI[]>([])
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesI[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function getCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`);
      if (response.status === 200) {
        const dados = await response.json();
        logaCliente(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const clienteSalvo = localStorage.getItem("client_key") as string;
      getCliente(clienteSalvo);
    }

    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
      const dados = await response.json();
      setProdutos(dados);
    }
    getDados();

    async function getPessoas(){
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`);
      const dados = await response.json();
      setPessoas(dados);
    }
    getPessoas()

    async function getMarcas(){
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`);
      const dados = await response.json();
      setMarcas(dados);
    }
    getMarcas()

    async function getAvaliacoes(){
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`);
      const dados = await response.json();
      setAvaliacoes(dados);
    }
    getAvaliacoes()
  }, []);

  return (
    <div  className="sm:ml-14 p-4">
      <Banner />
      <section className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Qtd. de Produtos
              </CardTitle>
              <Package className="ml-auto w-4 h-4 "/>
            </div>
            <CardContent >
              <h1 className="mt-3 text-base sm:text-lg font-bold">{produtos.length}</h1>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Marcas Cadastradas
              </CardTitle>
              <Users className="ml-auto w-4 h-4 "/>
            </div>
            <CardContent >
              <h1 className="mt-3 text-base sm:text-lg font-bold">{marcas.length}</h1>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Usuarios Cadastrados
              </CardTitle>
              <Users className="ml-auto w-4 h-4 "/>
            </div>
            <CardContent >
              <h1 className="mt-3 text-base sm:text-lg font-bold">{pessoas.length}</h1>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Avaliações Recebidas
              </CardTitle>
              <TextIcon className="ml-auto w-4 h-4 "/>
            </div>
            <CardContent >
              <h1 className="mt-3 text-base sm:text-lg font-bold">{avaliacoes.length}</h1>
            </CardContent>
          </CardHeader>
        </Card>
      </section>
      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Sales />
      </section>
    </div>
  );
}
