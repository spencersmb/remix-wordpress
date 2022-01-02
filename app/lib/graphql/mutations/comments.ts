import { gql } from '@apollo/client'

// input: {
//   commentOn: 5434,
//     content: "This is a test reply pending, yo",
//     author: "Jason",
//     authorEmail: "spencer@gmail.com",
//     parent: 36666 // HAD TO CHANGE THIS TO Int in plugin to work which is the databaseId in the comment
// }

export const CREATE_COMMENT = gql`
    mutation MyMutation( $input: CreateCommentInput!) {
        createComment(input: $input) {
            success
            comment {
                agent
                id
                content
                author {
                    node {
                        name
                    }
                }
            }
        }
    }
`;
