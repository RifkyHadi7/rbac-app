"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRole } from "../../context/RoleContext";
import { Item } from "../../types";
import ItemForm from "../../components/ItemForm";
import ItemList from "../../components/ItemList";
import Notification from "../../components/Notification";

export default function DashboardPage() {
  const { role, perms, setRole } = useRole();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showNotif = (message: string, type: "success" | "error" = "success") => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3000);
  };

  useEffect(() => {
    if (!role) {
      window.location.href = "/";
      return;
    }

    try {
      setLoading(true);
      axios.get("https://api.restful-api.dev/objects").then((res) => {
          const data: Item[] = Array.isArray(res.data)
          ? res.data.map((d: any) => ({
          id: d.id?.toString() ?? String(Math.random()),
          name: d.name ?? "",
          data: typeof d.data === "object" && d.data !== null ? d.data : {},
        }))
        : [];
        setItems(data);
      });
    } catch (err) {
      showNotif("Failed to load item", "error");
    } finally {
      setLoading(false);
    }
}, [role]);

  const handleAdd = async (payload: Omit<Item, "id">) => {
    if (!perms?.add) return alert("You don't have permission to add item");
    try {
      const res = await axios.post("https://api.restful-api.dev/objects", payload);
      setItems((s) => [...s, res.data]);
      showNotif("Item added", "success");
    } catch (err) {
      showNotif("Failed to add item", "error");
    }
  };

  const handleEdit = async (id: string, payload: Partial<Item>) => {
    if (!perms?.edit) return alert("You don't have permission to edit item");
    try {
      const res = await axios.put(`https://api.restful-api.dev/objects/${id}`, payload);
      setItems((s) => s.map((it) => (it.id === id ? res.data : it)));
      showNotif("Item updated", "success");
    } catch (err) {
      showNotif("Failed to update item", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!perms?.delete) return alert("You don't have permission to delete item");
    try {
      await axios.delete(`https://api.restful-api.dev/objects/${id}`);
      setItems((s) => s.filter((it) => it.id !== id));
      showNotif("Item deleted", "success");
    } catch (err) {
      showNotif("Failed to delete item", "error");
    }
  };

  const handleLogout = () => {
    setRole(null);
    window.location.href = "/";
  };

  return (
    <main className="w-full mx-auto p-4 bg-gray-950">
      {notif && (
        <Notification
          message={notif.message}
          type={notif.type}
          onClose={() => setNotif(null)}
        />
      )}
      <div className="flex justify-between items-center my-10 px-10">
        <h1 className="text-3xl font-bold">Dashboard — Role : <span className="text-blue-500">{role}</span></h1>
        <button
          onClick={handleLogout}
          className=" bg-red-500 text-white text-xl px-4 py-2 rounded hover:bg-transparent hover:text-red-500"
        >
          Logout
        </button>
      </div>
      <div className="w-full px-20">
        {loading && <p className="text-gray-200">Loading...</p>}

        {perms?.add && <ItemForm onAdd={handleAdd} />}
        <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} perms={perms} />
      </div>
    </main>
  );
}
