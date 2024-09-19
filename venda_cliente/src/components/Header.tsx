"use client";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";

export function Header() {
  const {cliente} = useClienteStore();
  return (
    <nav className="bg-[#262626] sticky top-0 z-40 border-gray-200 ">
      <div className="flex flex-wrap justify-between ml-5 items-center mx-auto pr-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="./logo.png" className="h-28" alt="Flowbite Logo" />
          <span className=" text-[#F0F0F0] aself-center text-2xl font-bold whitespace-nowrap">
            <span className="text-[#cba35c]">Nexus</span> Gaming
          </span>
        </Link>
        <div className="flex max-lg:ml-auto space-x-3">
          {cliente.id ? <>
          <span className="flex items-center justify-center text-[#cba35c]">
            Olá, {cliente.nome}
          </span>
            <Link
              href="/login"
              className="hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] sm:inline-block"
            >
              Sair
            </Link>
          </> : <>
            <Link
              href="/login"
              className="hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] sm:inline-block"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="hidden px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#ffffff] bg-[#cba35c] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#ffffff] sm:inline-block"
            >
              Registro
            </Link>
          </>}
        </div>
      </div>
    </nav>
  );
}
