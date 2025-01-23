import { getDocument } from "@/firebase";
import { PostSample } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ url: string }> }
) {
  const url = (await params).url;
  const req = fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/postSamples`
  ).then((res) => res.json());
  const postSample = await req.then((res) =>
    res.find((post: PostSample) => post.url === url)
  );
  const postData = await getDocument("servicePosts", postSample?.id);
  if (postData) {
    const post = {
      title: postData.data.title,
      shortDesc: postData.data.shortDesc,
      title2: postData.data.text1Title,
      desc2: postData.data.text1Desc,
      imageAlt: postData.data.text2Title,
      imageAlt2: postData.data.text3Title,
      imageAlt3: postData.data.text4Title,
      googleTitle: postData.data.googleTitle,
      googleDescription: postData.data.googleDescription,
      googleKeywords: postData.data.googleKeywords,
      images: postData.data.images,
      section2: postData.data.section2,
      section3: postData.data.section3,
      section4: postData.data.section4,
      section5: postData.data.section5,
      section6: postData.data.section6,
      section7: postData.data.section7,
      id: postData.data.id,
      tags: postData.data.tags,
    };
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ error: "Post doesn't exist!" });
  }
}
