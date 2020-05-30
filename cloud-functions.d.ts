import { CreateUserPayload } from "./src/types/cloud-functions";

declare const getAllUsers: (admin: any, data: any, _: any) => any;
declare const createUser: (admin: any, data: CreateUserPayload, _: any) => any;

export { getAllUsers, createUser };
