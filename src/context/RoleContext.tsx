"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Role, rolePermissions, Permissions } from "@/utils/permission";

type RoleContextType = {
  role: Role | null;
  perms: Permissions | null;
  setRole: (r: Role | null) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role | null>(null);

  // Load role saat pertama kali di browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedRole = localStorage.getItem("userRole") as Role | null;
        if (storedRole) setRoleState(storedRole);
      } catch (error) {
        console.warn("Gagal membaca role dari localStorage:", error);
      }
    }
  }, []);
  
  const setRole = (r: Role | null) => {
    setRoleState(r);
    if (typeof window !== "undefined") {
      try {
        if (r) localStorage.setItem("userRole", r);
        else localStorage.removeItem("userRole");
      } catch (error) {
        console.warn("Gagal menyimpan role ke localStorage:", error);
      }
    }
  };

  const perms = role ? rolePermissions[role] : null;

  return (
    <RoleContext.Provider value={{ role, perms, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
};
