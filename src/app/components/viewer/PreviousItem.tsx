import { SetListItem } from "../../types/setlist";

interface PreviousItemProps {
  item: SetListItem | null;
}

export default function PreviousItem({ item }: PreviousItemProps) {
  return (
    <div>
      <p className="text-sm opacity-50">
        Anterior
      </p>

      <p className="text-lg">
        {item?.nombre ?? "-"}
      </p>
    </div>
  );
}