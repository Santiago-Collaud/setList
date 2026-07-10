import { SetListItem } from "../../app/types/setlist";
import { SETLIST_COLORS } from "../../app/constant/colors";

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

  const bgColor = SETLIST_COLORS[item.color as keyof typeof SETLIST_COLORS] ?? SETLIST_COLORS.default;

  return (
    <div className="border rounded-xl p-8" style={{ backgroundColor: bgColor }}>

      <p className="text-sm opacity-50">
        Actual
      </p>

      <h1 className="text-5xl font-black flex flex-items-center justify-center gap-4">
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