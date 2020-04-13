type Route = any;

export interface Context {
  to: Route;
  from: Route;
  next: ([key]: any) => any;
  userStore: any;
}
export type Middleware = (context: Context, nextPipeline: MiddlewarePipeline) => Route | MiddlewarePipeline;
export type MiddlewarePipeline = (context: Context, middleware: Middleware[], index: number) => Middleware | any;
