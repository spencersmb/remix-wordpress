import { DocumentNode } from 'graphql'

export function getGraphQLString(query: DocumentNode): string | undefined{
  return query.loc?.source.body
}
