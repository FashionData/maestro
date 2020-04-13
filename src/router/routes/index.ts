import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import NotFound from "@/views/NotFound.vue";
import UserProfile from "@/views/UserProfile.vue";

import { LOGIN, LOGOUT, NOT_FOUND, USER } from "@/constants/router/routes-names";
import { auth, guest } from "@/router/middleware";

export const routes = [
  {
    path: "/login",
    name: LOGIN,
    meta: { middleware: [guest] },
    component: LoginView
  },
  {
    path: "/logout",
    name: LOGOUT,
    meta: { middleware: [auth] },
    component: LogoutView
  },
  {
    path: "/user",
    name: USER,
    meta: { middleware: [auth] },
    component: UserProfile
  },
  {
    path: "*",
    name: NOT_FOUND,
    meta: { middleware: [auth] },
    component: NotFound
  }
];
