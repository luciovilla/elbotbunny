import Form from "../components/Form";

export default function Home() {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center pt-10 sm:pt-5 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-10">
        <h1 className="sm:text-7xl text-5xl mb-1 font-bold text-slate-900">
          El Bot Bunny
        </h1>
        <p className="sm:text-2xl text-lg text-slate-900">
          Generate Bad Bunny lyrics powered by AI
        </p>
        <Form />
      </main>
    </div>
  );
}
