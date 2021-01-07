import VirtualDisplaysView from "../../views/VirtualDisplaysView.vue";
import { VIRTUAL_DISPLAYS } from "../../constants/routes";
import { authMiddleware } from "@/main";

export const routes = [
  {
    path: VIRTUAL_DISPLAYS.path,
    name: VIRTUAL_DISPLAYS.name,
    meta: { middleware: [authMiddleware] },
    component: VirtualDisplaysView
  },
];
