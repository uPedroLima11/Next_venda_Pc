import { ClienteI } from '@/utils/types/clientes'
import { create } from 'zustand'

type ClienteStore = {
  cliente: ClienteI
}

export const useClienteStore = create<ClienteStore>((set) => ({
  // cliente: {} as ClienteI,
  cliente: {
    id: '1',
    nome: 'Ana',
    email: 'ana@gmail.com'
  }
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}))
