export type Role = "Admin" | "Editor" | "Viewer";

export type Permissions = {
  add: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
};

export const rolePermissions: Record<Role, Permissions> = {
  Admin: { add: true, edit: true, delete: true, view: true },
  Editor: { add: true, edit: true, delete: false, view: true },
  Viewer: { add: false, edit: false, delete: false, view: true },
};
