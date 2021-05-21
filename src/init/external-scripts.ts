export const injectExternalScripts = (externalScripts: string[]) => {
  externalScripts.forEach(externalScript => {
    const scriptTag = document.createElement('script')
    scriptTag.text = externalScript;
    document.head.appendChild(scriptTag)
  })
}
