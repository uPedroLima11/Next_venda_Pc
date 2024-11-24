'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trash } from 'lucide-react';
import Cookies from 'js-cookie';
import BannerCategory from '@/components/bannerCategory';

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

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesI[]>([]);

  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes?limit=all`);
        const data = await response.json();
        setAvaliacoes(data);
      } catch (error) {
        console.error('Erro ao carregar as avaliações:', error);
      }
    }
    fetchAvaliacoes();
  }, []);

  async function excluirAvaliacao(id: number) {
    try {
      const token = Cookies.get('admin_logado_token');
      if (!token) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAvaliacoes((prevAvaliacoes) => prevAvaliacoes.filter((avaliacao) => avaliacao.id !== id));
      } else {
        console.error('Erro ao excluir avaliação:', response.status);
        alert('Erro ao excluir a avaliação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar requisição de exclusão:', error);
    }
  }

  return (
    <section className="max-w-5xl mx-auto my-10">
      <BannerCategory/>
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Todas as Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          {avaliacoes.length > 0 ? (
            avaliacoes.map((avaliacao) => (
              <article key={avaliacao.id} className="flex items-start gap-4 border-b py-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={avaliacao.cliente?.foto || '/avatar.png'}
                    alt={avaliacao.cliente?.nome || 'Cliente'}
                  />
                  <AvatarFallback>
                    {avaliacao.cliente?.nome?.charAt(0).toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{avaliacao.cliente?.nome || 'Cliente Anônimo'}</p>
                  <p className="text-sm text-gray-500">Produto: {avaliacao.produto?.modelo || 'Não especificado'}</p>
                  <p className="text-sm text-gray-500">Nota: {avaliacao.nota || 'N/A'} ⭐</p>
                  <p className="text-sm text-gray-400 mt-2">{avaliacao.descricao || 'Sem descrição'}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
                        excluirAvaliacao(avaliacao.id);
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma avaliação disponível.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
