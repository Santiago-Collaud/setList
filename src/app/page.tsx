"use client";
import { useState , useEffect } from "react";
import { useSetList } from "../app/hoocks/useSetList";

import CurrentItem from "@/components/viewer/CurrentItem";
import PreviousItems from "@/components/viewer/PreviousItem";
import NextItem from "@/components/viewer/NextItem";
import EmptyState from "@/components/viewer/emptyState";
import AppMenu from "@/components/viewer/AppMenu";
import MySetListsModal from "@/components/viewer/MySetListsModal";
import QRScanner from "../components/qr/QRScanner";



export default function Home() {
  const {
  setList,
  currentIndex,
  currentItem,
  previousItem,
  nextItem,
  importSetList,
  getStoredSetLists,
  openSetList,
  deleteStoredSetList,
  next,
  previous,
  importDemo,
  clearCurrentSetList,
} = useSetList();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMySetLists, setShowMySetLists] = useState(false);

  const [infoModal, setInfoModal] = useState<
  "licencia" | "contacto" | "about" | null
>(null);

  //PWA
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const [showQRScanner, setShowQRScanner] = useState(false);


  useEffect(() => {
  const handler = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  document.addEventListener("fullscreenchange", handler);

  return () => {
    document.removeEventListener("fullscreenchange", handler);
  };
}, []);

  function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

useEffect(() => {

  const handler = (e: any) => {
    e.preventDefault();
    setInstallPrompt(e);
  };

  window.addEventListener("beforeinstallprompt", handler);

  if (
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    setIsInstalled(true);
  }

  return () => {
    window.removeEventListener(
      "beforeinstallprompt",
      handler
    );
  };

}, []);

async function installApp() {

  if (!installPrompt) return;

  installPrompt.prompt();

  const result = await installPrompt.userChoice;

  if (result.outcome === "accepted") {
    setIsInstalled(true);
  }

  setInstallPrompt(null);

}
/*
HANDLEQRScann para debuguear
async function handleQRScan(url: string) {

  try {

    alert("QR recibido:\n" + url);

    alert(
      "Origen:\n" + window.location.origin
    );

    alert("Antes del fetch");

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
    });

    alert(
      "Fetch OK status: " + response.status
    );

    const text = await response.text();

    alert(
      "Respuesta:\n" + text.substring(0,150)
    );

    const json = JSON.parse(text);

    const file = new File(
      [JSON.stringify(json)],
      "setlist.setlist",
      {
        type: "application/json",
      }
    );

    await importSetList(file);

    alert("Importado OK");

  } catch (err) {

    alert(
      "Error QR:\n" + err
    );

  }

}
*/

async function handleQRScan(url: string) {

  try {

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("No se pudo descargar el SetList.");
      return;
    }

    const json = await response.json();

    const file = new File(
      [JSON.stringify(json)],
      "setlist.setlist",
      {
        type: "application/json",
      }
    );

    await importSetList(file);

  } catch (err) {

    console.error("Error leyendo QR:", err);

    alert("Ocurrió un error al importar el SetList.");

  }

}
  return (
    <main className="min-h-screen bg-base-300 flex flex-col">

      <header className="navbar bg-base-100 shadow">

        <AppMenu
          onImport={importSetList}
          onFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          onInfo={setInfoModal}
          onMySetLists={() => setShowMySetLists(true)}
          
          onInstall={installApp}
          showInstall={!isInstalled && !!installPrompt}
          onScanQR={() => setShowQRScanner(true)}
          onClearSetList={clearCurrentSetList}
        />

        <div className="flex-1 justify-center">
          <h1 className="font-bold">
            <img src="/icons/queSigue-texto.png" alt="queSigue-icon" className="inline-block w-auto h-8 mr-2" />
          </h1>
        </div>

      </header>

      {!setList ? (
        <EmptyState onDemo={importDemo} />
      ) : (

        <section className="flex-1 flex flex-col p-4">

          {/* Información del show */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold border-b">
              {setList.show}
            </h2>

            <h3 className="text-lg opacity-60">
              {setList.fecha}
            </h3>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col landscape:flex-row gap-4">

            {/* Anterior */}
            <div className="landscape:w-1/4 flex">
              <div className="w-full flex justify-between items-center border border-orange-400 rounded-xl p-2 landscape:flex-col">
                <PreviousItems item={previousItem ?? null} />
                <button
                  className="btn btn-primary flex-1 w-50 h-15 hidden mt-2 landscape:flex"
                  onClick={previous}
                >
                  ◀
                </button>
              </div>
            </div>

            {/* Actual */}
            <div className="landscape:w-2/4 flex">
              <div className="w-full">
                <p className="text-sm opacity-60 text-center mb-2 border border-red-600 rounded-lg p-1">
                  {currentIndex + 1} / {setList.items.length}
                </p>
                <CurrentItem item={currentItem ?? null} />
              </div>
            </div>

            {/* Siguiente */}
            <div className="landscape:w-1/4 flex">
              <div className="w-full flex justify-between items-center border border-orange-400 rounded-xl p-2 landscape:flex-col">
                <NextItem item={nextItem ?? null} />
                
                <button
                className="btn btn-primary flex-1 w-50 h-15 hidden mt-2 landscape:flex"
                onClick={next}
              >
                ▶
              </button>
              </div>
            </div>
          </div>
          {/* Controles */}
          <div className="landscape:hidden flex gap-2 mb-4">
            <button
                  className="btn btn-primary flex-1 h-32"
                  onClick={previous}
                >
                  ◀
                </button>
                 <button
              className="btn btn-primary flex-1 h-32"
              onClick={next}
            >
              ▶
            </button>
          </div>

        </section>

      )}
      {/* Modal de Mis SetLists */}
      {showMySetLists && (
        <MySetListsModal
          open={showMySetLists}
          onClose={() => setShowMySetLists(false)}
          getStoredSetLists={getStoredSetLists}
          openSetList={openSetList}
          deleteStoredSetList={deleteStoredSetList}
        />
      )}
      
      {/* Modal de información */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="bg-base-100 rounded-xl p-6 w-11/12 max-w-md">

            {infoModal === "licencia" && (
              <>
                <h2 className="text-xl font-bold">
                  Licencia
                </h2>

                <p className="mt-4">
                  queSigue Viewer
                </p>

                <div className="mt-2 space-y-2">
                <p>Versión 0.1.0</p>

                <p>
                  Software desarrollado por COLLAUD design para la visualización
                  de SetLists en ensayos y presentaciones en vivo.
                </p>

                <p>Todos los derechos reservados.</p>

                <p>
                  Este software no puede ser redistribuido, modificado ni
                  comercializado sin autorización expresa del autor.
                </p>

                <p className="font-bold">
                  © 2026 SantiagoCollaud.com.ar
                </p>
              </div>
              </>
            )}

            {infoModal === "contacto" && (
              <>
                <h2 className="text-xl font-bold">
                  Contacto
                </h2>

                <p className="mt-4">
                  SANTIAGO COLLAUD 
                </p>

                <p>
                  www.santiagocollaud.com.ar/contacto
                </p>
              </>
            )}

            {infoModal === "about" && (
              <>
                <h2 className="text-xl font-bold">
                  Acerca de
                </h2>

                <p className="mt-4">
                  queSigue es una suite de creacion y 
                  visualizacion de listas de temas o 
                  items para bandas y staff en ensayos o 
                  actuaciones en vivo.
                  </p>
                  <p>
                  Su uso no se limita a nombres de canciones, 
                  tambien a momentos, detalles, blackouts, presentaciones o pausas
                  que se deben desarrollar durante la perfomance.
                  </p>
                 
                
              </>
            )}

            <button
              className="btn mt-6"
              onClick={() => setInfoModal(null)}
            >
              Cerrar
            </button>

          </div>

        </div>
      )}
      <QRScanner
        open={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScan={handleQRScan}
      />
    </main>
  );
}