"use client";

import { useEffect, useState } from "react";
import { StoredSetList } from "../../app/db/index";
import { Trash2 } from "lucide-react";

interface MySetListsModalProps {
  open: boolean;
  onClose: () => void;
  getStoredSetLists: () => Promise<StoredSetList[]>;
  openSetList: (setList: StoredSetList) => Promise<void> | void;
  deleteStoredSetList: (id: string) => Promise<void>;
}

export default function MySetListsModal({
  open,
  onClose,
  getStoredSetLists,
  openSetList,
  deleteStoredSetList,
}: MySetListsModalProps) {
  const [setLists, setSetLists] = useState<StoredSetList[]>([]);

  useEffect(() => {
    if (!open) return;

    load();
  }, [open]);

  async function load() {
    const data = await getStoredSetLists();
    setSetLists(data);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este SetList?")) return;

    await deleteStoredSetList(id);

    load();
  }

  async function handleOpen(setList: StoredSetList) {
    await openSetList(setList);
    onClose();
  }

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <h3 className="font-bold text-xl mb-4">
          Mis SetLists
        </h3>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">

          {setLists.length === 0 && (
            <p className="opacity-60 text-center">
              No hay SetLists guardados.
            </p>
          )}

          {setLists.map((item) => (

            <div
              key={item.id}
              className="card bg-base-200 shadow cursor-pointer hover:bg-base-300 transition"
              onClick={() => handleOpen(item)}
            >

              <div className="card-body py-4">

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="card-title">
                      {item.banda}
                    </h2>

                    <p className="font-semibold">
                      {item.show}
                    </p>

                    <p className="text-sm opacity-60">
                      {item.fecha}
                    </p>

                  </div>

                  <button
                    className="btn btn-ghost btn-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
          >
            Cerrar
          </button>

        </div>

      </div>
    </dialog>
  );
}