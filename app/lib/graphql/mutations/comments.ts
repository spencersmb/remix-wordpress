import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
    mutation MyMutation( $input: CreateCommentInput!) {
        createComment(input: $input) {
            success
            comment {
                agent
                date
                databaseId
                parent {
                  node {
                    databaseId
                  }
                }
                approved
                id
                content
                author {
                    node {
                      id
                      name
                      ... on CommentAuthor {
                        gravatar{
                          url
                        }
                      }
                    }
                }
                replies {
                    edges {
                        node {
                            id
                            databaseId
                            content
                            date
                            author {
                                node {
                                    id
                                    name
                                    ... on CommentAuthor {
                                      gravatar{
                                        url
                                      }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
