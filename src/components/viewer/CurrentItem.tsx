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
    <div className="border rounded-xl p-8 min-h-80 flex flex-col" style={{ backgroundColor: bgColor }}>

      <p className="text-sm opacity-50">
        Actual
      </p>

      <h1 className="min-h-[120px] flex items-center justify-center text-center font-black text-4xl lg:text-6xl leading-tight break-words">
        {item.nombre}
      </h1>
      <div className="mt-auto pt-6">
        <p>
          Tono: {item.tono ?? "-"}
        </p>

        <p>
          Tempo: {item.tempo ?? "-"}
        </p>
        <p>
          {item.nota}
        </p>
      </div>
    </div>
  );
}