import { RoutePaths } from "@/config/routes";

export function formDataToObject<T>(formData: FormData) {
  const payload = Object.fromEntries(formData.entries()) as unknown as T;

  return payload;
}

export const ROUTER_PATH_REGEX = /^[a-zA-Z0-9-_/*?&=]+$/;

export function routerExpandPath(to: RoutePaths, expand?: string) {
  if (!expand) return to as string;

  if (!ROUTER_PATH_REGEX.test(expand)) {
    throw new Error(
      `Invalid path segment: "${expand}". Only alphanumeric characters, dashes (-), underscores (_), slashes (/), asterisks (*), question marks (?), ampersands (&), and equals signs (=) are allowed.`
    );
  }

  if (expand.startsWith("/")) return `${to}${expand}`;

  return `${to}/${expand}`;
}
