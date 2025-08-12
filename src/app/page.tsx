"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Role } from "../utils/permission";
import { useRole } from "../context/RoleContext";

const roles: Role[] = ["Admin", "Editor", "Viewer"];

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [selected, setSelected] = useState<Role>("Viewer");

  const handleLogin = () => {
    setRole(selected);
    router.push("/dashboard");
  };

  return (  
    <main className="flex bg-gray-800 items-center justify-center min-h-screen">
      <div className="bg-gray-900 shadow-lg text-gray-200 rounded-md p-8 w-1/5">
        <h1 className="text-2xl font-bold mb-12 mt-4 text-center">Login</h1>
        <select
          value={selected}  
          onChange={(e) => setSelected(e.target.value as Role)}
          className="w-full bg-gray-900 px-3 rounded-sm py-2 border"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <h1 className="text-xs font-medium text-start mb-4 mt-1 text-gray-400">*Choose between this following roles</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-white hover:text-gray-900 transition"
        >
          Login
        </button>
      </div>
    </main>
  );
}
