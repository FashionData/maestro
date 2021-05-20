import { ExternalScript } from "@/types";

export const injectExternalScripts = (externalScripts: ExternalScript[]) => {
  externalScripts.forEach(externalScript => {
    if (externalScript.productionOnly && process.env.NODE_ENV === "development") return;
    const scriptTag = document.createElement('script')
    scriptTag.text = externalScript.scriptString;
    document.head.appendChild(scriptTag)
  })
}
