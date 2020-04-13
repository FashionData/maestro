import { Middleware } from "@/types/router";
import { auth as authMiddleware } from './user/auth';
import { guest as guestMiddleware } from './user/guest';

export const auth: Middleware = authMiddleware;
export const guest: Middleware = guestMiddleware;

export default [auth, guest];
