import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Nexus Gaming",
  description: "Loja de Computadores PC store",
  keywords: ["PC", "Loja", "Computadores"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-[#e0dfdf]">
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
