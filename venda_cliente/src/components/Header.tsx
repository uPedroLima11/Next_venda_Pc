import Link from "next/link";

export function Header(){
    return (
    <nav className="bg-slate-600 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between ml-5 items-center mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="./logo.png" className="h-16" alt="Flowbite Logo" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">PC Store</span>
            </Link>
        <div className="flex items-center space-x-6 mr-5 rtl:space-x-reverse ">
            <span className="text-gray-500 dark:text-white hover:underline">Identifique-se</span>
            <Link href="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Entrar</Link>
        </div>
        </div>
    </nav>
    );
}