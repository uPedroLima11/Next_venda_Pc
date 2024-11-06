import { ProdutoI } from "./produtos";

export interface AvaliacoesI {
    id: number
    nota: number,
    clienteId: string
    produtoId: number
    produto: ProdutoI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}