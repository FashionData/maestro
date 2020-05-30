import {
  CreateUserPayload,
  UpdateUserPayload
} from "./src/types/cloud-functions";

declare const getAllUsers: (admin: any, data: any, _: any) => any;
declare const createUser: (admin: any, data: CreateUserPayload, _: any) => any;
declare const updateUser: (admin: any, data: UpdateUserPayload, _: any) => any;

export { getAllUsers, createUser, updateUser };
