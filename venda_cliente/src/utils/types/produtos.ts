import { MarcaI } from "./marcas";

export interface ProdutoI{
    id: number;
    modelo: string;
    preco: number;
    foto: string;
    configuracao: string;
    tipo: string;
    cor: string;
    adicional: string;
    destacado: boolean;
    createdAt: Date;
    updatedAt: Date;
    marca: MarcaI;
    marcaId: number;
}