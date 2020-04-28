import { Context, Middleware, MiddlewarePipeline } from "@/types/router";
import { LOGIN } from '@/constants/router/routes';

export const auth: Middleware = ({ to, next, userStore }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
  if (!userStore.state.isAuthenticated) {
    return next({ name: LOGIN.name, query: { redirect: to.path } });
  }
  return nextPipeline();
};
