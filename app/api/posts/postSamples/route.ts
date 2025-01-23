import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getDocuments("servicePosts");
  const postSamples = posts.map((post) => ({
    url: post.data.url,
    id: post.data.id,
    type: post.data.type,
    title: post.data.title,
    shortDesc: post.data.shortDesc,
    tags: post.data.tags,
    image: post.data.images[0].src,
    text1Title: post.data.text1Title,
    text1Desc: post.data.text1Desc,
    text2Title: post.data.text2Title,
    text2Desc: post.data.text2Desc,
    text3Title: post.data.text3Title,
    text3Desc: post.data.text3Desc,
    text4Title: post.data.text4Title,
    text4Desc: post.data.text4Desc,
    text5Title: post.data.text5Title,
    text5Desc: post.data.text5Desc,
    text6Title: post.data.text6Title,
    text6Desc: post.data.text6Desc,
    text7Title: post.data.text7Title,
    text7Desc: post.data.text7Desc,
  }));
  return NextResponse.json(postSamples);
}
