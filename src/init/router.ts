import { AnyObject } from "@/types";
import { Context, Middleware } from "@/types/router";
import { routes } from "@/router/routes";
import { userStore } from "@/store/user";
import { middlewarePipeline } from "@/router/middleware/pipeline";
import { Route } from "vue-router";
import { HOME } from "@/constants";
import { authMiddleware } from "@/router/middleware";
import HomeView from "@/views/placeholders/HomeView.vue";
import { log } from "@/utils/console";

export const configureRouter = (router: AnyObject) => {
  router.addRoutes(routes);

  router.beforeEach((to: any, from: any, next: any) => {
    if (!to.meta.middleware) return next();

    const context: Context = { to, from, next, userStore };
    const middleware: Middleware[] = to.meta.middleware;
    const index = 0;

    return middleware[index](
      context,
      middlewarePipeline(context, middleware, index + 1)
    );
  });
};

export const injectHomePage = (router: AnyObject) => {
  if (
    !router.options.routes ||
    !router.options.routes.find((route: Route) => (route.path = "/"))
  ) {
    router.addRoutes([
      {
        path: HOME.path,
        name: HOME.name,
        meta: { middleware: [authMiddleware] },
        component: HomeView
      }
    ]);

    log("Added placeholder HomeView");
  }
}
