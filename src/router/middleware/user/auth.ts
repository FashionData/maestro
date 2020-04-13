import { Context, Middleware, MiddlewarePipeline } from "@/types/router";
import { LOGIN } from '@/constants/router/routes-names';

export const auth: Middleware = ({ to, next, userStore }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
  if (!userStore.state.isAuthenticated) {
    return next({ name: LOGIN, query: { redirect: to.path } });
  }
  return nextPipeline();
};
