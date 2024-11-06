import { ProdutoI } from "@/utils/types/produtos";
import { useForm } from "react-hook-form";

type Inputs = {
  termo: string;
};

type InputPesquisaProps = {
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoI[]>>;
};

export function InputPesquisa({ setProdutos }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      alert("Digite ao menos 2 caracteres para pesquisar");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/produtos/pesquisa/${data.termo}`
    );
    const dados = await response.json();

    if (dados.length === 0) {
      alert("Nenhum veiculo encontrado");
      reset({ termo: "" });
      return;
    }

    setProdutos(dados);
  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
    const dados = await response.json();
    setProdutos(dados);
    reset({ termo: "" });
  }

  return (
    <div className="flex max-w-5xl mx-auto mt-3">
      <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-[#202020] border border-gray-300 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Qual o produto Desejado?"
            {...register("termo")}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Buscar
          </button>
        </div>
      </form>
      <button
        type="button"
        className="ms-3 mt-2 focus:outline-none text-white bg-[#cba35c] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:bg-red-900 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        onClick={mostraDestaques}
      >
        Destaques
      </button>
    </div>
  );
}
