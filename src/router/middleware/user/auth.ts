import { Context, Middleware, MiddlewarePipeline } from "@/types/router";
import { LOGIN } from '@/constants/routes';

export const auth: Middleware = ({ to, next, userStore }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
  if (!userStore.state.isAuthenticated) {
    return next({ name: LOGIN.name, query: { redirect: to.path } }); // TODO: Add query only if it is not logout view
  }
  return nextPipeline();
};
