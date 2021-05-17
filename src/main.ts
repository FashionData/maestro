import { install, InstallFunction } from "@/init";

export { initializeApp } from "@/init";
export * from "@/router/middleware";
export * from "@/cloud-functions";
export * from "@/components";
export * from "@/constants";
export * from "@/layouts";

const plugin: { install: InstallFunction } = { install };

export default plugin;
