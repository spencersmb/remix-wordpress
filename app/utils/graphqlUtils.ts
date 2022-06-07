import type { DocumentNode } from 'graphql'

/**
 * @function getGraphQLString
 *
 * Convert a gql string to a string usable in fetch
 */
export function getGraphQLString(query: DocumentNode): string | undefined{
  return query.loc?.source.body
}
