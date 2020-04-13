import { AnyObject } from "@/types";
import { Context, Middleware } from "@/types/router";
import { routes } from "@/router/routes";
import { userStore } from "@/store/user";
import { middlewarePipeline } from "@/router/middleware/pipeline";

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
