"use client";
import { Item } from "../types";
import { Permissions } from "../utils/permission";
import EditForm from "./EditForm";
import { useState } from "react";

export type ItemListProps = {
  items: Item[];
  perms: Permissions | null;
  onEdit: (id: string, payload: Partial<Item>) => void;
  onDelete: (id: string) => void;
};

export default function ItemList({ items, perms, onEdit, onDelete }: ItemListProps) {
  const [editItem, setEditItem] = useState<Item | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-gray-900/40 p-4 rounded-lg shadow-md flex flex-col justify-between backdrop-blur-sm"
          >
            <div>
              <div className="font-bold text-lg text-white">{it.name}</div>
              {it.data && (
                <div className="text-sm text-gray-300 mt-2 space-y-1">
                  {Object.entries(it.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-bold">{key} : </span> {value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {perms?.edit && (
                <button
                  onClick={() => setEditItem(it)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-xs hover:bg-transparent hover:text-yellow-400"
                >
                  Edit
                </button>
              )}
              {perms?.delete && (
                <button
                  onClick={() => onDelete(it.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-xs hover:bg-transparent hover:text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <EditForm
          item={editItem}
          onEdit={onEdit}
          onClose={() => setEditItem(null)}
        />
      )}
    </>
  );
}
