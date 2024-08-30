import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
      <body className="bg-gray-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
