/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
const openai = new OpenAI({
  organization: "org-33Zg7MbY4ION1Emx89iluRp0",
  project: "proj_HGPAXd5tkLtZQRaJj6XphnqK",
  apiKey: process.env.OPENAI_API_KEY!,
});
export const generateImage = async (prompt: string, size: string) => {
  try {
    const imageParameters: any = {
      prompt: prompt,
      n: 1,
      size: size,
      response_format: "b64_json",
      style: "natural",
      quality: "hd",
      model: "dall-e-3",
    };
    const response = await openai.images.generate(imageParameters);
    const url = response.data[0].b64_json;
    const id = uuidv4();
    const imageRef = ref(storage, id);
    const image = uploadString(imageRef, url!, "base64", {
      contentType: "text/plain",
    }).then(() =>
      getDownloadURL(imageRef).then((url) => {
        return url;
      })
    );
    return image;
  } catch (error: any) {
    console.log(error);
  }
};
