import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import NotFound from "@/views/NotFound.vue";
import ProfileView from "@/views/ProfileView.vue";
import UsersView from "@/views/UsersView.vue";

import { LOGIN, LOGOUT, NOT_FOUND, PROFILE, USERS } from "@/constants/router/routes";
import { authMiddleware, guestMiddleware } from "@/router/middleware";

export const routes = [
  {
    path: LOGIN.path,
    name: LOGIN.name,
    meta: { middleware: [guestMiddleware] },
    component: LoginView
  },
  {
    path: LOGOUT.path,
    name: LOGOUT.name,
    meta: { middleware: [authMiddleware] },
    component: LogoutView
  },
  {
    path: USERS.path,
    name: USERS.name,
    // TODO: Add superAdmin
    meta: { middleware: [authMiddleware] },
    component: UsersView
  },
  {
    path: PROFILE.path,
    name: PROFILE.name,
    meta: { middleware: [authMiddleware] },
    component: ProfileView
  },
  {
    path: NOT_FOUND.path,
    name: NOT_FOUND.name,
    meta: { middleware: [authMiddleware] },
    component: NotFound
  }
];
