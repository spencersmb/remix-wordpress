import { gql } from "@apollo/client";
import { getGraphQLString } from "../graphqlUtils";

/**
 * @jest-environment node
 */
describe('Utils: GraphQL', () => {
 it('Should return a string', () => {
   const query = gql`
     query testQuery {
        themeOptions {
          serverSettings{
            productPlatform
          }
        }
     }
  `
   const result = getGraphQLString(query);
    expect(typeof result).toBe('string')
 })
})