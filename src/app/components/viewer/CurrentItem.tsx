import { SetListItem } from "../../types/setlist";

interface CurrentItemProps {
  item: SetListItem | null;
}

export default function CurrentItem({ item }: CurrentItemProps) {
  if (!item) {
    return (
      <div className="border rounded-xl p-8 text-center">
        <p>No hay item seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-8">

      <p className="text-sm opacity-50">
        Actual
      </p>

      <h1 className="text-5xl font-black">
        {item.nombre}
      </h1>

      <p className="mt-4">
        Tono: {item.tono ?? "-"}
      </p>

      <p>
        Tempo: {item.tempo ?? "-"}
      </p>

      <p>
        {item.nota}
      </p>

    </div>
  );
}