import Vue, { PluginFunction, VueConstructor } from "vue";
import _Vue from "vue";
import { InstallOptions } from "./src/types";
import { Middleware } from "./src/types/router";
import { Roles, Collections } from "./src/constants";

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const initializeApp: (
  Vue: VueConstructor<_Vue>,
  App: any,
  options: InstallOptions
) => void;
declare const authMiddleware: Middleware;
declare const guestMiddleware: Middleware;
declare const superAdminMiddleware: Middleware;
declare const plugin: {
  install: InstallFunction;
};

export {
  plugin as default,
  authMiddleware,
  guestMiddleware,
  superAdminMiddleware,
  Roles,
  Collections,
  initializeApp
};
