import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Banner() {
  return (
    <div className={`bg-[#262626] rounded-3xl pb-10 h-full ${poppins.className} flex justify-around flex-col shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] lg:flex-row items-center `}>
      <section className="px-10 flex flex-col items-center gap-3 ">
        <Image alt="Logo" width={672} height={630} src="/logo.png" className="hidden w-2/5 lg:block" />
        <h1 className="text-center font-bold text-2xl pb-5 text-white">
          Zona administrativa da <span className="text-[#cba35c]">Nexus</span> Gaming
        </h1>
        <h1 className="text-center font-semibold text-lg pb-5 text-white">área exclusiva para administradores do sistema</h1>

      </section>
    </div>
  );
}
