import { InitializeOptions } from "@/types";
import { error } from "@/utils/console";

export const checkConfiguration = (options: InitializeOptions) => {
  if (!options)
    error("Please provide default configuration.");
  if (!options.store)
    error("Please initialise plugin with a Vuex store.");
  if (!options.router)
    error("Please initialise plugin with a Vue Router.");
  if (!options.firebase)
    error("Please initialise plugin with Firebase.");

  // TODO: Check config object
};
