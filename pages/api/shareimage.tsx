/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const loadBoldFont = fetch(
  new URL("../../public/fonts/OpenSans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const loadRegularFont = fetch(
  new URL("../../public/fonts/OpenSans-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function shareImage(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lyrics = searchParams.get("lyrics")?.split("\n\n");
    const topics = searchParams.get("topics");
    const boldFontData = await loadBoldFont;
    const regularFontData = await loadRegularFont;

    return new ImageResponse(
      (
        <div
          tw="flex flex-col w-full h-full bg-white justify-between"
          style={{
            fontFamily: "Open Sans",
            backgroundImage:
              "linear-gradient(to bottom, #c8ebff, #ffe1de, #faf7de)",
          }}
        >
          <div
            style={{
              whiteSpace: "pre-line",
            }}
            tw="flex px-10 pt-24 items-center text-[28px] leading-snug tracking-tight"
          >
            <div tw="flex flex-wrap w-full justify-center">
              <div tw="flex flex-col flex-wrap h-[1250px] max-w-full">
                {lyrics?.map((words, idx) => (
                  <div tw="mb-10 mx-4" key={idx}>
                    {words}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div tw="bg-black flex w-full px-10 self-end">
            <div tw="flex flex-row w-full pb-12 px-4 justify-between p-8">
              <h2
                tw="flex flex-col text-4xl tracking-tight text-white text-left"
                style={{ fontFamily: "Open Sans Bold" }}
              >
                <span>AI Bad Bunny Lyrics</span>
                <span tw="text-3xl" style={{ fontFamily: "Open Sans" }}>
                  Topics: {topics}
                </span>
              </h2>
              <div tw="mt-8 flex text-white text-4xl">
                <span style={{ fontFamily: "Open Sans Bold" }}>
                  elbotbunny.com
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1500,
        height: 1500,
        fonts: [
          {
            name: "Open Sans",
            data: regularFontData,
            weight: 400,
          },
          {
            name: "Open Sans Bold",
            data: boldFontData,
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
