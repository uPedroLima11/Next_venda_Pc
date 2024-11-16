'use client';

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CircleDollarSign } from "lucide-react";

interface AvaliacoesI {
  id: number;
  nota: number;
  descricao: string;
  cliente: {
    id: string;
    nome: string;
    foto?: string; 
  } | null;
  produto: {
    id: number;
    modelo: string;
  } | null;
  createdAt: string;
}

export default function AvaliacoesCard() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesI[]>([]);

  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes?limit=3`);
        const data = await response.json();
        setAvaliacoes(data);
      } catch (error) {
        console.error("Erro ao carregar as avaliações:", error);
      }
    }
    fetchAvaliacoes();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">Últimas Avaliações</CardTitle>
          <CircleDollarSign className="ml-auto h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {avaliacoes.length > 0 ? (
          avaliacoes.map((avaliacao) => (
            <article key={avaliacao.id} className="flex items-start gap-3 border-b py-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={avaliacao.cliente?.foto || "/avatar.png"} 
                  alt={avaliacao.cliente?.nome || "Cliente"}
                />
                <AvatarFallback>
                  {avaliacao.cliente?.nome?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
               
                <p className="text-sm sm:text-base font-semibold">
                  {avaliacao.cliente?.nome || "Cliente Anônimo"}
                </p>
                
                <span className="text-xs sm:text-sm text-gray-500">
                  {avaliacao.descricao || "Sem descrição"}
                </span>
               
                <p className="text-xs text-gray-400">
                  Produto: {avaliacao.produto?.modelo || "Não especificado"}
                </p>
               
                <p className="text-xs text-gray-400">Nota: {avaliacao.nota || "N/A"} ⭐</p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma avaliação disponível.</p>
        )}
      </CardContent>
    </Card>
  );
}
