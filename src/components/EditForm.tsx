"use client";
import { useState, useEffect } from "react";
import { Item } from "../types";

type Props = {
  item: Item | null;
  onEdit: (id: string, payload: Partial<Item>) => void;
  onClose: () => void;
};

export default function EditForm({ item, onEdit, onClose }: Props) {
  const [name, setName] = useState("");
  const [data, setData] = useState<Record<string, string>>({});
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setData(item.data || {});
    }
  }, [item]);

  const addKeyValue = () => {
    if (!keyInput.trim()) return;
    setData((prev) => ({ ...prev, [keyInput.trim()]: valueInput.trim() }));
    setKeyInput("");
    setValueInput("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    onEdit(item.id, { name: name.trim(), data });
    onClose();
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg lg:w-1/3 md:w2/3 z-10">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className="border rounded px-3 py-2 w-full"
          />

          <div className="flex gap-2">
            <input
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Key"
              className="border rounded px-3 py-2 flex-1"
            />
            <input
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Value"
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              type="button"
              onClick={addKeyValue}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Add Field
            </button>
          </div>

          {Object.keys(data).length > 0 && (
            <div className="bg-gray-700 p-2 rounded max-h-32 overflow-auto">
              {Object.entries(data).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-2 text-sm mb-1"
                >
                  <input
                    value={k}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      setData((prev) => {
                        const { [k]: oldValue, ...rest } = prev;
                        return { ...rest, [newKey]: oldValue };
                      });
                    }}
                    className="bg-gray-500 text-white px-2 py-1 rounded w-1/3"
                  />
                  <input
                    value={v}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setData((prev) => ({ ...prev, [k]: newValue }));
                    }}
                    className="bg-gray-500 text-white px-2 py-1 rounded flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setData((prev) => {
                        const { [k]: _, ...rest } = prev;
                        return rest;
                      });
                    }}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
