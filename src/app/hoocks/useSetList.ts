"use client";

import { useEffect, useState } from "react";
import { SetListFile } from "../types/setlist";
import { SetListService } from "../services/setlist.service";
import { db , StoredSetList} from "../db";

export function useSetList() {
  const [setList, setSetList] = useState<SetListFile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadLastSetList();
  }, []);

  async function loadLastSetList() {
    const last = await db.setlists
      .orderBy("last_opened")
      .reverse()
      .first();

    if (!last) return;

    setSetList(last.data);
    setCurrentIndex(0);
  }

  async function importSetList(file: File) {
    try {
      const data = await SetListService.load(file);

      const id = `${data.banda}|${data.show}|${data.fecha}`;
      const now = new Date().toISOString();

      const existing = await db.setlists.get(id);

      await db.setlists.put({
        id,
        banda: data.banda,
        show: data.show,
        fecha: data.fecha,
        created_at: existing?.created_at ?? now,
        last_opened: now,
        data,
      });

      setSetList(data);
      setCurrentIndex(0);

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al importar el archivo."
      );
    }
  }

  async function getStoredSetLists() {
  return await db.setlists
    .orderBy("last_opened")
    .reverse()
    .toArray();
}

async function openSetList(setList: StoredSetList) {
  await db.setlists.update(setList.id, {
    last_opened: new Date().toISOString(),
  });

  setSetList(setList.data);
  setCurrentIndex(0);
}
  function next() {
    if (!setList) return;

    setCurrentIndex((current) =>
      Math.min(current + 1, setList.items.length - 1)
    );
  }

  async function deleteStoredSetList(id: string) {
  await db.setlists.delete(id);
}

  function previous() {
    if (!setList) return;

    setCurrentIndex((current) =>
      Math.max(current - 1, 0)
    );
  }

  return {
    setList,

    currentIndex,

    currentItem:
      setList?.items[currentIndex] ?? null,

    previousItem:
      currentIndex > 0
        ? setList?.items[currentIndex - 1]
        : null,

    nextItem:
      setList &&
      currentIndex < setList.items.length - 1
        ? setList.items[currentIndex + 1]
        : null,

    importSetList,

    getStoredSetLists,

    openSetList,

    deleteStoredSetList,

    next,

    previous,
  };
}