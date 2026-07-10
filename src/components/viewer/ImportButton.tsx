"use client";

interface ImportButtonProps {
  onImport: (file: File) => void;
}

export default function ImportButton({ onImport }: ImportButtonProps) {
  return (
    <div>
      <input
        id="file-import"
        type="file"
        accept=".setlist,.json,application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onImport(file);
          }
        }}
      />

      <label
        htmlFor="file-import"
        className="btn btn-outline"

      >
        Importar
      </label>
    </div>
  );
}