export const routes = {
  root: "/",
  login: "/login",
  other: "/other",
} as const;

export type RoutePaths = (typeof routes)[keyof typeof routes];
