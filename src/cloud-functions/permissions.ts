import { Roles } from "../constants";

export const isGranted = (context: any, role: number) => {
  return context.auth?.token?.role >= role;
};

export const isSuperAdmin = (context: any) => {
  return context.auth?.token?.role >= Roles.SuperAdmin;
};
