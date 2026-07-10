"use client";
import { useSetList } from "../../../src/app/hoocks/useSetList";
import ImportButton from "@/components/viewer/ImportButton";

import {
  Menu,
  FolderOpen,
  SquarePen,
  Monitor,
  FileText,
  Mail,
  Info,
} from "lucide-react";

interface AppMenuProps {
  onImport: (file: File) => Promise<void>;
}

export default function AppMenu({ onImport }: AppMenuProps) {
    
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
          <a><SquarePen size={18} /> Crear SetList</a>
        </li>

        <li>
          <hr />
        </li>
        <li className="menu-title">
        <span>Visualización</span>
        </li>
        <li>
          <a> <Monitor size={18} /> Pantalla completa</a>
        </li>

        <li>
          <hr />
        </li>
        <li className="menu-title">
        <span>Información</span>
        </li>
        <li>
          <a><FileText size={18} /> Licencia</a>
        </li>

        <li>
          <a> <Mail size={18} /> Contacto</a>
        </li>

        <li>
          <a><Info size={18} /> Acerca de</a>
        </li>
      </ul>

    </div>
  );
}