import { Middleware } from "@/types/router";
import { auth as authMiddleware } from '@/router/middleware/user/auth';
import { guest as guestMiddleware } from '@/router/middleware/user/guest';

export const auth: Middleware = authMiddleware;
export const guest: Middleware = guestMiddleware;

export default [auth, guest];
