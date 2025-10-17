export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-xl w-full">
        <div className="flex justify-center items-center gap-2 mb-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold animate-pulse whitespace-nowrap">
            🚧 Em Construção 🚧
          </h1>
        </div>
        <p className="text-3xl text-white/80 mb-8">Comecei</p>
        <div className="flex justify-center">
          <a
            href="https://github.com/Levisq"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition whitespace-nowrap"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
