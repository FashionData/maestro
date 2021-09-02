import ImgView from "../../views/ImgView.vue";
import VirtualDisplaysView from "../../views/VirtualDisplaysView.vue";
import { IMG, VIRTUAL_DISPLAYS } from "../../constants/routes";
import { authMiddleware } from "@/main";

export const routes = [
  {
    path: IMG.path,
    name: IMG.name,
    meta: { middleware: [authMiddleware] },
    component: ImgView
  },
  {
    path: VIRTUAL_DISPLAYS.path,
    name: VIRTUAL_DISPLAYS.name,
    meta: { middleware: [authMiddleware] },
    component: VirtualDisplaysView
  },
];
