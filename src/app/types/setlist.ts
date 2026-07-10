export interface SetListItem {
  tipo: string;
  color: string;
  nombre: string;
  tono?: string;
  tempo?: number;
  nota?: string;
}

export interface SetListFile {
  version: number;
  banda: string;
  show: string;
  fecha: string;
  items: SetListItem[];
}