import "../styles/globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const title = "El Bot Bunny";
  const description = "AI Bad Bunny lyrics generator";

  return {
    metadataBase: new URL("https://elbotbunny.com"),
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
    openGraph: {
      images: [
        {
          url: "/og.png",
          width: 1920,
          height: 1080,
        },
      ],
    },
    alternates: {
      canonical: "/",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      noarchive: true,
      "max-image-preview": "large",
    },
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </head>
      <body
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #c8ebff, #ffe1de, #faf7de)",
        }}
      >
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
