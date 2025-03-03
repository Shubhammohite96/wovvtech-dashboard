import { signal } from "@preact/signals-react";

export type UserRole = "admin" | "user" | "guest"

// Retrieve userRole from localStorage only once
const storedRole = localStorage.getItem("userRole") as UserRole;

const validRoles: UserRole[] = ["admin", "user", "guest"];
export const userRole = signal<UserRole>(validRoles.includes(storedRole) ? storedRole : "guest");
