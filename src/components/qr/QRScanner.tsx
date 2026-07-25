"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (value: string) => void;
}

export default function QRScanner({
  open,
  onClose,
  onScan,
}: QRScannerProps) {
  const qrRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!open) return;

    const scanner = new Html5Qrcode("qr-reader");
    qrRef.current = scanner;

    async function startScanner() {
      try {
        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            try {
              if (scanner.isScanning) {
                await scanner.stop();
              }

              scanner.clear();

              onScan(decodedText);

              onClose();

            } catch (err) {
              console.error(err);
            }
          },
          () => {
            // Ignorar intentos fallidos de lectura
          }
        );

      } catch (err) {
        console.error("Error iniciando la cámara:", err);
      }
    }

    startScanner();

    return () => {
      async function cleanup() {
        try {
          if (scanner.isScanning) {
            await scanner.stop();
          }
        } catch {
          // Ignorar
        }

        try {
          scanner.clear();
        } catch {
          // Ignorar
        }
      }

      cleanup();
    };

  }, [open, onClose, onScan]);

  if (!open) return null;

  return (
    <dialog className="modal modal-open">

      <div className="modal-box max-w-lg">

        <h3 className="font-bold text-lg">
          Escanear QR
        </h3>

        <p className="opacity-70 mt-2">
          Apuntá la cámara al código QR del SetList.
        </p>

        <div
          id="qr-reader"
          className="w-full mt-6 rounded-lg overflow-hidden"
        />

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>

      </div>

    </dialog>
  );
}