import { Context, Middleware, MiddlewarePipeline } from "@/types/router";
import { HOME } from "@/constants/routes";
import { Roles } from "@/constants";

export const superAdminMiddleware: Middleware = (
  { next, userStore }: Context,
  nextPipeline: ReturnType<MiddlewarePipeline>
) => {
  if (userStore.state.user?.role?.code >= Roles.SuperAdmin) {
    return nextPipeline();
  }
  return next(HOME);
};
