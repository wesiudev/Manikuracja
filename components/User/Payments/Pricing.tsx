import Image from "next/image";
import pricingImage from "../../../public/pricing.png";
import PricingButton from "./PricingButton";
import { User } from "@/types";
export default function Pricing({
  user,
  setPricingOpen,
  pricingOpen,
}: {
  user: User;
  setPricingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pricingOpen: boolean;
}) {
  return (
    <div
      onClick={() => {
        setPricingOpen(false);
      }}
      className={`bg-black/50 z-[92] overflow-y-scroll fixed left-0 top-0 w-screen h-screen flex items-center justify-center ${
        !pricingOpen && "hidden"
      }`}
    >
      <div className="max-h-[80vh] rounded-lg">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-max bg-white mx-auto max-w-[400px] p-6 rounded-xl shadow-sm shadow-zinc-800"
        >
          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <Image
              src={pricingImage}
              alt="Cennik manicure obraz"
              className="absolute inset-0 object-cover w-full h-full"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 my-4">
            Manikuracja Premium
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Zyskaj dostęp do najnowszych funkcji naszej platformy, dodaj
            nielimitowaną ilość usług i wyświetlaj je w swoim mieście!
          </p>
          <div className="text-center">
            <span className="text-4xl font-extrabold text-gray-800">
              100 zł
            </span>
            <span className="text-lg text-gray-600"> / miesiąc</span>
          </div>
          <PricingButton setPricingOpen={setPricingOpen} user={user} />
        </div>
      </div>
    </div>
  );
}
