"use client";

import ImportButton from "../app/components/viewer/ImportButton";
import { useSetList } from "../app/hoocks/useSetList";

import CurrentItem from "../app/components/viewer/CurrentItem";
import PreviousItems from "../app/components/viewer/PreviousItem";
import NextItem from "../app/components/viewer/NextItem";
import EmptyState from "../app/components/viewer/emptyState";
import Controls from "../app/components/viewer/Controls";

export default function Home() {
  const {
    setList,
    currentIndex,
    currentItem,
    previousItem,
    nextItem,
    importSetList,
    next,
    previous,
  } = useSetList();

  return (
    <main className="min-h-screen bg-base-300 flex flex-col">

      <header className="navbar bg-base-100 shadow">

        <div className="flex-1">
          <h1 className="text-xl font-bold">
            SetList Viewer
          </h1>
        </div>

        <ImportButton onImport={importSetList} />

      </header>

      {!setList ? (

        <EmptyState />

      ) : (

        <section className="flex-1 flex flex-col justify-between p-8">

          <div>

        <p className="text-sm opacity-60">
            {currentIndex + 1} / {setList.items.length}
        </p>

        <h2 className="text-2xl font-bold">
            {setList.show}
        </h2>

    </div>

    <div className="space-y-6">

        <PreviousItems item={previousItem ?? null} />

        <CurrentItem item={currentItem ?? null} />

        <NextItem item={nextItem ?? null} />

    </div>

    <Controls
        onPrevious={previous}
        onNext={next}
    />


        </section>

      )}

    </main>
  );
}