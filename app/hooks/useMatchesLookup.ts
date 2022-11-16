import { useMatches } from "@remix-run/react";

export function useMatchesLookup (path: string): undefined | { [key: string]: any } {
  const matches = useMatches()
  const routeMatch = matches.find((item) => item.pathname === '/');
  if (!routeMatch) return undefined
  return routeMatch.data
}