"use client";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const { cliente, logaCliente, deslogaCliente } = useClienteStore();
  const router = useRouter();

  useEffect(() => {
    async function buscaUsuarios(idUsuario: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${idUsuario}`
      );
      if (response.status === 200) {
        const dados = await response.json();
        logaCliente(dados);
      }
    }
    if (localStorage.getItem("client_key")) {
      const usuarioSalvo = localStorage.getItem("client_key") as string;
      const usuarioValor = usuarioSalvo.replace(/"/g, "");
      buscaUsuarios(usuarioValor);
    }
  }, []);

  function sairCliente() {
    deslogaCliente();
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/");
  }

  return (
    <nav className="bg-[#262626] sticky top-0 z-40 border-gray-200 ">
      <div className="flex flex-wrap justify-between ml-5 items-center mx-auto pr-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.png" className="h-28" alt="Flowbite Logo" />
          <span className=" text-[#F0F0F0] aself-center text-2xl font-bold whitespace-nowrap">
            <span className="text-[#cba35c]">Nexus</span> Gaming
          </span>
        </Link>
        <div className="flex items-center max-lg:ml-auto space-x-3">
          {cliente.id ? (
            <>
              <span className="flex items-center font-semibold justify-center text-[#cba35c]">
                Olá, {cliente.nome}{" "}
                <span className="mx-3">
                  <Avatar>
                    <AvatarImage src="https://media.istockphoto.com/id/885234758/pt/vetorial/male-avatar-profile-picture-silhouette-light-shadow.jpg?s=612x612&w=0&k=20&c=fwyGS425x9Zyv1tLVsTTX6nwNWi4BiZJeP27qtbU8K0=" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
              </span>
              <Link href="/avaliacoes" className=" cursor-pointer hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] sm:inline-block">
                Minhas Avaliações
              </Link>
              <span
                className=" cursor-pointer hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] sm:inline-block"
                onClick={sairCliente}
              >
                Sair
              </span>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] sm:inline-block"
              >
                Login
              </Link>
              <Link
                href="/registro"
                className="hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#ffffff] bg-[#cba35c] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#ffffff] sm:inline-block"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
