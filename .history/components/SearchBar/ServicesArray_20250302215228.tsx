import { ICity, IService } from "@/types";
import Link from "next/link";

export default function ServicesArray({
  city,
  services,
}: {
  city: ICity;
  services: IService[];
}) {
  return (
    <div className="mt-3 mx-auto bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-scroll flex items-center px-4 py-3 gap-3">
        {services.map((serviceItem: IService, i: number) => (
          <div
            className={
              i !== services.length - 1
                ? "after:h-full after:w-[2px] after:bg-pink-400/50 after:absolute after:right-[-7px] after:top-0 relative"
                : ""
            }
            key={i}
          >
            <Link
              className="text-zinc-700 text-xs block w-max hover:bg-pink-400 hover:text-white p-2"
              href={`/${serviceItem.flatten_name}/${city.id}`}
            >
              {serviceItem.real_name.toUpperCase()} {city.name.toUpperCase()}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
