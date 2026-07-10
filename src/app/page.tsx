"use client";

import ImportButton from "@/components/viewer/ImportButton";
import { useSetList } from "../app/hoocks/useSetList";

import CurrentItem from "@/components/viewer/CurrentItem";
import PreviousItems from "@/components/viewer/PreviousItem";
import NextItem from "@/components/viewer/NextItem";
import EmptyState from "@/components/viewer/emptyState";
import Controls from "@/components/viewer/Controls";
import AppMenu from "@/components/viewer/AppMenu";
//import ThemeButton from "@/components/viewer/ThemeButton";

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

       <AppMenu
        onImport={importSetList}
        />

    <div className="flex-1 justify-center">
        <h1 className="font-bold">
            SetList
        </h1>
    </div>

    {/*<ThemeButton />*/}
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