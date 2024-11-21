import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function BannerCategory() {
  return (
    <div className={`bg-[#262626] rounded h-full ${poppins.className} flex justify-around flex-col shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] lg:flex-row items-center `}>
      <section className="flex px-10 items-center gap-3 ">
        <Image alt="Logo" width={572} height={530} src="/logo.png" className="hidden w-1/4 lg:block" />
        <div>
          <h1 className="text-center font-bold text-2xl pb-5 text-white">
            Zona administrativa da <span className="text-[#cba35c]">Nexus</span> Gaming
          </h1>
          <h1 className="text-center font-semibold text-lg pb-5 text-white">área exclusiva para administradores do sistema</h1>
        </div>

      </section>
    </div>
  );
}
