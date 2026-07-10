"use client";

import { useState } from "react";
import { SetListFile } from "../types/setlist";
import { SetListService } from "../services/setlist.service";

export function useSetList() {
  const [setList, setSetList] = useState<SetListFile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function importSetList(file: File) {
    try {
      const data = await SetListService.load(file);

      setSetList(data);
      setCurrentIndex(0);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al importar el archivo.");
    }
  }

  function next() {
    if (!setList) return;

    setCurrentIndex((current) =>
      Math.min(current + 1, setList.items.length - 1)
    );
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

    next,

    previous,
  };
}