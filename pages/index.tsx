import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown from "../components/DropDown";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";

import songs from "../data/lyrics.json";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [hideInput, setHideInput] = useState(false);

  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const song = selectedSong
    ? songs.filter((song) => song.title === selectedSong)
    : null;

  const generateLyrics = async (e: any) => {
    e.preventDefault();
    setHideInput(true);
    setGeneratedLyrics("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        song,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedLyrics((prev) => prev + chunkValue);
    }
    setLoading(false);
    textAreaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetLyrics = () => {
    setHideInput(false);
    setGeneratedLyrics("");
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [generatedLyrics]);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>AI Bad Bunny Lyrics Generator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-10">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate Bad Bunny lyrics powered by AI
        </h1>
        <div className="max-w-xl w-full">
          {!hideInput && (
            <>
              <div className="flex mt-10 items-center space-x-3">
                <p className="text-left font-medium">Topics:</p>
              </div>
              <textarea
                value={topic}
                rows={1}
                spellCheck={false}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mt-2 mb-5"
                placeholder={"los angeles, web development, scorpios"}
                required
              />
              <div className="flex mb-2 items-center space-x-3">
                <p className="text-left font-medium">
                  (Optional) Based on this song:
                </p>
              </div>
              <div className="block">
                <DropDown
                  song={selectedSong}
                  setSong={(newSong) => setSelectedSong(newSong)}
                />
              </div>
            </>
          )}

          {!loading && !hideInput && (
            <>
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => generateLyrics(e)}
                disabled={!topic ? true : false}
              >
                Generate lyrics &rarr;
              </button>
              {!topic && (
                <span className="text-xs text-red-600 font-bold">
                  *Type in a topic or few above
                </span>
              )}
            </>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              Auto perreo in progress{" "}
              <LoadingDots color="white" style="large" />
            </button>
          )}
          {!loading && hideInput && (
            <>
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={resetLyrics}
              >
                Generate new lyrics &rarr;
              </button>
            </>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="my-10 max-w-xl w-full">
          {generatedLyrics && (
            <>
              <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto mb-5">
                El Bot Bunny lyrics:
              </h2>
              <div className="text-left">
                <textarea
                  value={generatedLyrics}
                  rows={15}
                  ref={textAreaRef}
                  readOnly
                  className="whitespace-pre-line w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mt-2 mb-5"
                />
              </div>
              {!loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLyrics);
                    toast("Lyrics copied to clipboard", {
                      icon: "✂️",
                    });
                  }}
                >
                  Copy lyrics
                </button>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
