import { SetListItem } from "../../types/setlist";

interface NextItemProps {
  item: SetListItem | null;
}

export default function NextItem({ item }: NextItemProps) {
  return (
    <div>
      <p className="text-sm opacity-50">
        Siguiente
      </p>

      <p className="text-lg">
        {item?.nombre ?? "-"}
      </p>
    </div>
  );
}