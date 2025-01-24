import Viewer from "@/components/AdminComponents/Viewer";
import CtaRegisterButton from "@/components/Cta";
import PostSamples from "@/components/PostSamples";
import SearchBar from "@/components/SearchBar";
import { PostSample } from "@/types";
import { getPost } from "@/utils/getPost";
import { getPostSamples } from "@/utils/getPostSamples";
import { Viewport } from "next";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getPostSamples();
  return posts.map((sample: PostSample) => ({
    params: sample.url,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  const post = await getPost(url);
  return (
    <div className="">
      <SearchBar slugCity="" />
      <section className="mt-3 p-6 rounded-lg bg-white min-w-full">
        <div className="prose lg:prose-lg min-w-full text-center">
          <h1 className="font-bold">{post.title}</h1>
          <p>{post.shortDesc}</p>
          <h2>{post.title2}</h2>
          <p>{post.desc2}</p>
        </div>
        <Image
          src={post.images[0].src}
          width={1024}
          height={1024}
          alt={`Obrazek sekcji ${post.title}`}
          className="w-full xl:w-1/2 mx-auto my-12 rounded-3xl"
        />
        <Viewer value={post.section2.content} />
        <Image
          src={post.images[1].src}
          width={1024}
          height={1024}
          alt={`Obrazek sekcji ${post.imageAlt}`}
          className="w-full xl:w-1/2 mx-auto my-12 rounded-3xl"
        />
        <Viewer value={post.section3.content} />
        <Image
          src={post.images[2].src}
          width={1024}
          height={1024}
          alt={`Obrazek sekcji ${post.imageAlt2}`}
          className="w-full xl:w-1/2 mx-auto my-12 rounded-3xl"
        />
        <Viewer value={post.section4.content} />
        {post?.images[3]?.src.length && (
          <Image
            src={post.images[3].src}
            width={1024}
            height={1024}
            alt={`Obrazek sekcji ${post.imageAlt3}`}
            className="w-full xl:w-1/2 mx-auto my-12 rounded-3xl"
          />
        )}
        <Viewer value={post.section5.content} />
        <Viewer value={post.section6.content} />
        <Viewer value={post.section7.content} />
        <p>{post.tags}</p>
      </section>
      <div className="py-12 p-6 bg-white mt-3 rounded-lg items-center justify-center flex flex-col text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Zacznij już dziś
        </h2>
        <p className="max-w-xl mb-3">
          Utwórz profil Salonu Kosmetycznego lub Pojedynczego Specjalisty,
          skonfiguruj listę oferowanych usług i wyświetlaj je w swoim mieście!
        </p>
        <CtaRegisterButton />
      </div>
      <div className="p-6 rounded-lg bg-gray-200 mt-3">
        <PostSamples />
      </div>
    </div>
  );
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ec4899",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  const post = await getPost(url);
  return {
    title: post.googleTitle,
    description: post.googleDescription,
    publisher: "wesiudev.com",
    url: `https://manikuracja.pl/blog/${post.url}`,
    authors: [
      {
        name: "Manikuracja",
        url: "https://manikuracja.pl",
      },
    ],
    icons: [
      {
        url: "/fav.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      url: `https://manikuracja.pl/blog/${post.url}`,
      title: post.googleTitle,
      description: post.googleDescription,
      siteName: "Manikuracja",
      images: [
        {
          url: post.images[0].src,
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Manikuracja",
      title: post.googleTitle,
      description: post.googleDescription,
      image: {
        url: post.images[0].src,
      },
    },
    meta: [
      {
        name: "theme-color",
        content: "#ec4899",
      },
    ],
  };
}
