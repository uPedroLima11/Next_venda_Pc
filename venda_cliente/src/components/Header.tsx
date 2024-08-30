import Link from "next/link";

export function Header() {
  return (
    <nav className="bg-slate-600 border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between ml-5 items-center mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="./logo.png" className="h-16" alt="Flowbite Logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            PC Store
          </span>
        </Link>
        <div className="flex max-lg:ml-auto space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-xl font-bold text-white border-2 border-[#ffffff] bg-[#B20000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#ffffff]"
          >
            Registro
          </Link>

          <button id="toggleOpen" className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* <div className="flex items-center space-x-6 mr-5 rtl:space-x-reverse ">
            <span className="text-gray-500 dark:text-white hover:underline">Identifique-se</span>
            <Link href="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Entrar</Link>
        </div> */}
      </div>
    </nav>
  );
}
