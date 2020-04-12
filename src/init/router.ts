import { AnyObject } from "@/types";
import { routes } from "@/routes";

export const configureRouter = (router: AnyObject) => {
  router.addRoutes(routes);
  router.beforeEach((to: any, from: any, next: any) => {
    console.log("[MAESTRO]: BEFORE EACH");
    next();
  });
};
