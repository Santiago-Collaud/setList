import Dexie, { Table } from "dexie";
import { SetListFile } from "../types/setlist";

export interface StoredSetList {
  id: string;
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

    this.version(1).stores({
      setlists: "id, banda, show, fecha, last_opened",
    });
  }
}

export const db = new SetListDB();