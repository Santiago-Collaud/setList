import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-300 flex flex-col">
      <header className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <h1 className="text-xl font-bold">
            SetList Viewer
          </h1>
        </div>

        <button className="btn btn-primary">
          Importar
        </button>
      </header>

      <section className="flex-1 flex items-center justify-center">
        <p className="text-base-content/60">
          Ningún SetList cargado
        </p>
      </section>
    </main>
  );
}
