import { InstallOptions } from "@/types";

export const checkConfiguration = (options: InstallOptions) => {
  if (!options)
    throw new Error("Please provide default configuration.");
  if (!options.store)
    throw new Error("Please initialise plugin with a Vuex store.");
  if (!options.router)
    throw new Error("Please initialise plugin with a Vue Router.");
  if (!options.firebase)
    throw new Error("Please initialise plugin with Firebase.");
};
