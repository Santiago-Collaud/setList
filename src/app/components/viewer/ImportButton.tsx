"use client";

import { useRef } from "react";

interface ImportButtonProps {
  onImport: (file: File) => void;
}

export default function ImportButton({
  onImport,
}: ImportButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".setlist,.json"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onImport(file);
          }
        }}
      />

      <button
        className="btn btn-primary"
        onClick={() => inputRef.current?.click()}
      >
        Importar
      </button>
    </>
  );
}