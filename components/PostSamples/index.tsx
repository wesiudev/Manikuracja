import { PostSample } from "@/types";
import { getPostSamples } from "@/utils/getPostSamples";
import Image from "next/image";
import Link from "next/link";

export default async function PostSamples() {
  const samples = await getPostSamples();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8 2xl:gap-10">
      {samples.map((item: PostSample) => (
        <div
          key={item.id}
          className="rounded-lg flex flex-col relative overflow-hidden"
        >
          <Image
            src={item.image}
            alt={`Obrazek postu ${item.title}`}
            className="h-[200px] absolute inset-0 object-cover w-full"
            width={400}
            height={400}
          />
          <div className="h-[200px] w-full"></div>
          <div className="p-4 rounded-b-lg border-x border-b border-gray-500/50">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-600">
              {item.text1Desc.length > 100
                ? `${item.text1Desc.slice(0, 100)}...`
                : item.text1Desc}
            </p>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/blog/${item.url}`}
              className="text-blue-700"
            >
              Czytaj więcej
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
