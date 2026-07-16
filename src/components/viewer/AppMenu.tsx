"use client";

import ImportButton from "@/components/viewer/ImportButton";

import {
  Menu,
  FolderOpen,
  SquarePen,
  Monitor,
  FileText,
  Mail,
  Info,
  LibraryBig,
  Download,
} from "lucide-react";

interface AppMenuProps {
  onImport: (file: File) => Promise<void>;
  onFullscreen: () => void;
  isFullscreen: boolean;
  onInfo: (
    value: "licencia" | "contacto" | "about"
  ) => void;
  onMySetLists: () => void;
  onInstall: () => void;
  showInstall: boolean;
}

export default function AppMenu({ onImport, onFullscreen, isFullscreen, onInfo, onMySetLists, onInstall, showInstall }: AppMenuProps) {
    
  return (
    <div className="dropdown">

      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle text-xl"
      >
        <Menu size={22} />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-50 mt-2 w-64 shadow"
      >
        <li className="menu-title">
        <span>Archivo</span>
        </li>
        <li>
          <a><FolderOpen size={18} /><ImportButton onImport={onImport} /> </a>
        </li>
        <li>
          <button onClick={onMySetLists}>
            <LibraryBig size={18} />
            Mis SetLists
          </button>
        </li>

        <li>
          <a><SquarePen size={18} /> Crear SetList</a>
        </li>

        <li>
          <hr />
        </li>
        <li className="menu-title">
        <span>Visualización</span>
        </li>
        <li>
          <button onClick={onFullscreen}>
            <Monitor size={18} />
            {isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          </button>
        </li>
        
        {showInstall && (
          <>
            <li>
              <hr />
            </li>
            <li>
              <button onClick={onInstall}>
                <Download size={18} />
                Instalar aplicación
              </button>
            </li>
          </>
        )}

        <li>
          <hr />
        </li>
        <li className="menu-title">
        <span>Información</span>
        </li>
        <li>
          <button onClick={() => onInfo("licencia")}>
            <FileText size={18} />
            Licencia
          </button>
        </li>

        <li>
          <button onClick={() => onInfo("contacto")}>
            <Mail size={18} />
            Contacto
          </button>
        </li>

        <li>
          <button onClick={() => onInfo("about")}>
            <Info size={18} />
            Acerca de
          </button>
        </li>
      </ul>

    </div>
  );
}