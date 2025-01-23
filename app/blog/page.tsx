import SearchBar from "@/components/SearchBar";
import { PostSample } from "@/types";
import { getPostSamples } from "@/utils/getPostSamples";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const samples = await getPostSamples();
  return (
    <div>
      <SearchBar slugCity="" />
      {samples.map((item: PostSample, i: number) => (
        <div
          key={i}
          className="relative flex flex-col lg:flex-row mt-3 bg-white rounded-lg p-6"
        >
          <div className="lg:sticky lg:top-6 h-max left-0 w-full lg:w-1/3 xl:w-1/4">
            <Image
              width={512}
              height={512}
              src={item.image}
              alt={`Obrazek postu manicure ${item.title}`}
              className="w-full rounded-lg"
            />
            <Link
              href={`${process.env.NEXT_PUBLIC_BLOG_URL}/blog/${item.url}`}
              title={`Cały post ${item.title}`}
              className="text-center mt-3 rounded-md block py-3 w-full bg-green-500 text-white hover:bg-green-600 duration-150"
            >
              Czytaj całość
            </Link>
          </div>
          <div className="w-full lg:pl-6 prose pt-6 lg:pt-0">
            <h2 className="">{item.title}</h2>
            <p>{item.shortDesc}</p>
            <h4>W skrócie:</h4>
            <h3>{item.text1Title}</h3>
            <p>{item.text1Desc}</p>
            <h3>{item.text2Title}</h3>
            <p>{item.text2Desc}</p>
            <h3>{item.text3Title}</h3>
            <p>{item.text3Desc}</p>
            <h3>{item.text4Title}</h3>
            <p>{item.text4Desc}</p>
            <h3>{item.text5Title}</h3>
            <p>{item.text5Desc}</p>
            <h3>{item.text6Title}</h3>
            <p>{item.text6Desc}</p>
            <h3>{item.text7Title}</h3>
            <p>{item.text7Desc}</p>
            <h4>{item?.tags}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
