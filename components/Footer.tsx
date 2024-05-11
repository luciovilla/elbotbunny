export default function Footer() {
  return (
    <footer className="text-sm w-full sm:py-4 py-2 border-t mt-5 px-3 sm:mb-0">
      <div>
        Built by{" "}
        <a
          href="https://luciovilla.com"
          target="_blank"
          className="font-bold underline underline-offset-2"
        >
          Lucio Villa
        </a>{" "}
        and powered by{" "}
        <a
          href="https://openai.com/blog/chatgpt"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline underline-offset-2"
        >
          ChatGPT
        </a>
        .
      </div>
    </footer>
  );
}
