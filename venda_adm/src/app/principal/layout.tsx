"use client";
import { Sidebar } from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { Titulo } from "@/components/Titulo";
// import { MenuLateral } from "@/components/MenuLateral";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [logado, setLogado] = useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get("admin_logado_id")) {
      setLogado(true);
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      {logado && (
        <div>
          <div>
            <Sidebar />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
