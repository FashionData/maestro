import { Context, Middleware, MiddlewarePipeline } from "@/types/router";

export const middlewarePipeline: MiddlewarePipeline = (context: Context, middleware: Middleware[], index: number) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) return context.next;

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware(context, nextPipeline);
  };
};
