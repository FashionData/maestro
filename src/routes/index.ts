import LoginView from "@/views/LoginView.vue";
import NotFound from "@/views/NotFound.vue";
import UserProfile from "@/views/UserProfile.vue";

export const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/user",
    name: "user",
    component: UserProfile
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound
  }
];
