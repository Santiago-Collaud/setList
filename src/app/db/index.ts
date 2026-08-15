import Dexie, { Table } from "dexie";
import { SetListFile } from "../types/setlist";

export interface StoredSetList {
  id: string;
  remote_id?: string;
  banda: string;
  show: string;
  fecha: string;
  created_at: string;
  last_opened: string;
  data: SetListFile;
}

class SetListDB extends Dexie {
  setlists!: Table<StoredSetList, string>;

  constructor() {
    super("SetListDB");

    // Base original
    this.version(1).stores({
      setlists: "id, banda, show, fecha, last_opened",
    });

    // Migración
    this.version(2).stores({
      setlists: "id, banda, show, fecha, last_opened, remote_id",
    });
  }
}

export const db = new SetListDB();