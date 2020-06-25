import {
  CreateUserPayload,
  UpdateUserPayload
} from "./src/types/cloud-functions";
import { CFAccountRole } from "./src/constants";

declare const getAllUsers: (admin: any, data: any, _: any) => any;
declare const getAllAccounts: (admin: any, data: any, _: any) => any;
declare const createAccount: (admin: any, data: any, _: any) => any;
declare const updateAccount: (admin: any, data: any, _: any) => any;
declare const createUser: (admin: any, data: CreateUserPayload, _: any) => any;
declare const updateUser: (admin: any, data: UpdateUserPayload, _: any) => any;
declare const isGranted: (context: any, role: number) => boolean;
declare const isSuperAdmin: (context: any) => boolean;
declare const getAccount: (
  admin: any,
  context: any,
  data: any
) => Promise<CFAccountRole>;

export {
  getAllUsers,
  createUser,
  updateUser,
  getAllAccounts,
  createAccount,
  updateAccount,
  getAccount,
  isGranted,
  isSuperAdmin
};
