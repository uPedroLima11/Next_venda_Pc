import { ClienteI } from "@/utils/types/clientes";
import { create } from "zustand";

type ClienteStore = {
  cliente: ClienteI;
  logaCliente: (cliente: ClienteI) => void;
  deslogaCliente: () => void;
};

export const useClienteStore = create<ClienteStore>((set) => ({
  cliente: {} as ClienteI,
  logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
  deslogaCliente: () => set({ cliente: {} as ClienteI })
}));
