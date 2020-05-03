import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import NotFound from "@/views/NotFound.vue";
import ProfileView from "@/views/ProfileView.vue";
import UsersView from "@/views/UsersView.vue";

import { LOGIN, LOGOUT, NOT_FOUND, PROFILE, USERS } from "@/constants/router/routes";
import { auth, guest } from "@/router/middleware";

export const routes = [
  {
    path: LOGIN.path,
    name: LOGIN.name,
    meta: { middleware: [guest] },
    component: LoginView
  },
  {
    path: LOGOUT.path,
    name: LOGOUT.name,
    meta: { middleware: [auth] },
    component: LogoutView
  },
  {
    path: USERS.path,
    name: USERS.name,
    // TODO: Add superAdmin
    meta: { middleware: [auth] },
    component: UsersView
  },
  {
    path: PROFILE.path,
    name: PROFILE.name,
    meta: { middleware: [auth] },
    component: ProfileView
  },
  {
    path: NOT_FOUND.path,
    name: NOT_FOUND.name,
    meta: { middleware: [auth] },
    component: NotFound
  }
];
