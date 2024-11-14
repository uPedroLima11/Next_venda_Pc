import { CircleDollarSign, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Sales() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">Ultimas Avaliações</CardTitle>
          <CircleDollarSign className="ml-auto h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/PedroHSiqueira.png" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Pedro Siqueira</p>
            <span className="text-xs sm:text-sm text-gray-500">R$ 1.000,00</span>
          </div>
        </article>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/PedroHSiqueira.png" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Pedro Siqueira</p>
            <span className="text-xs sm:text-sm text-gray-500">R$ 1.000,00</span>
          </div>
        </article>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/PedroHSiqueira.png" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Pedro Siqueira</p>
            <span className="text-xs sm:text-sm text-gray-500">R$ 1.000,00</span>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
