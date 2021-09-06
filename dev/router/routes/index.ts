import ApiPerformanceView from "../../views/ApiPerformanceView.vue";
import ImgView from "../../views/ImgView.vue";
import VirtualDisplaysView from "../../views/VirtualDisplaysView.vue";
import { API_PERFORMANCE, IMG, VIRTUAL_DISPLAYS } from "../../constants/routes";
import { authMiddleware } from "@/main";

export const routes = [
  {
    path: API_PERFORMANCE.path,
    name: API_PERFORMANCE.name,
    meta: { middleware: [authMiddleware] },
    component: ApiPerformanceView
  },
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
