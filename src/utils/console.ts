import packageJson from "@/../package.json"

type LogType = "log" | "warn"

export const log = (value: any, type: LogType = "warn") => console[type](`[${packageJson.name.toUpperCase()}]:`, value);
export const error = (message: string) => {
  throw new Error(message)
};
