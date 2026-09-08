export default function Scanner() {
  return (
    <main className="min-h-screen bg-black p-6 text-white">

      <h1 className="text-2xl font-bold">
        Scan Ticket
      </h1>

      <div className="mt-10 flex aspect-square items-center justify-center rounded-3xl border-2 border-dashed">

        <div className="text-center">
          <div className="text-5xl">▦</div>

          <p className="mt-4 text-gray-400">
            QR Scanner
          </p>
        </div>

      </div>

      <button
        className="mt-8 w-full rounded-xl bg-white py-4 font-semibold text-black"
      >
        Simulate Scan
      </button>

    </main>
  );
}