import { Context, Middleware, MiddlewarePipeline } from "@/types/router";
import { HOME } from '@/constants/routes';

export const guest: Middleware = ({ next, userStore }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
  if (userStore.state.isAuthenticated) return next({ name: HOME.name });
  return nextPipeline();
};
