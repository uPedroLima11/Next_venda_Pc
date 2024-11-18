"use client"
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";
import { ArchiveRestore, ArchiveX, LogOut, Package, PanelBottom, PlusSquare, ShoppingBag, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/router";

export function Sidebar() {
  const { cliente, logaCliente, deslogaCliente } = useClienteStore();

  function sairCliente() {
    deslogaCliente();
    if (localStorage.getItem("admin_logado_id")) {
      localStorage.removeItem("admin_logado_id");
      localStorage.removeItem("admin_logado_nome");
    }
  }
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
        <nav className=" flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link href={"/principal"} className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full">
              <Package className="w-4 h-4" />
              <span className="sr-only">Dashboard Avatar</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/adicionar"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <ArchiveRestore className="w-5 h-5" />
                  <span className="sr-only">Adicionar Produto</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Adicionar Produto</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/remover"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <ArchiveX className="w-5 h-5" />
                  <span className="sr-only">Remover Produto</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Remover Produto</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/listarProdutos"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Package className="w-5 h-5" />
                  <span className="sr-only">Listar Produtos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Listar Produtos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/adicionarMarcas"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <ArchiveRestore className="w-5 h-5" />
                  <span className="sr-only">Adicionar Marcas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Adicionar Marcas</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/removerMarcas"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <ArchiveX className="w-5 h-5" />
                  <span className="sr-only">Remover Marcas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Remover Marcas</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/principal/listarMarcas"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Package className="w-5 h-5" />
                  <span className="sr-only">Listar Marcas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Listar Marcas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <LogOut onClick={sairCliente} className="w-5 h-5" />
                  <span className="sr-only" >Sair</span>
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-[#262626]">
        <header>
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/principal" className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base" prefetch={false}>
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
                <Link href="/principal/adicionar" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <ArchiveRestore className="h-5 w-5" />
                  Adicionar Produto
                </Link>
                <Link href="/principal/remover" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <ArchiveX className="h-5 w-5" />
                  Remover Produto
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <Users className="h-5 w-5" />
                  Listar Produtos
                </Link>
                <span onClick={sairCliente} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-5 w-5" />
                  Sair
                </span>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
