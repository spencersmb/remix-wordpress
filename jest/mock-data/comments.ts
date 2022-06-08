import { mockAuthorData } from "./posts"

export const mockComment: IPostComment = {
  databaseId: 218427,
  // approved: true,
  parent: null,
  id: "Y29tbWVudDoyMTg0Mjc=",
  author: {
    id: "YWRtaW5pc3RyYXRvcjox",
    databaseId: "1",
    name: "Spencer Bigum",
    gravatar: {
      url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
    }
  },
  date: "2022-01-27 21:08:02",
  content: "<p>Comment Body</p>\n",
  replies: []
}

export const mockComments: IComments = {
    pageInfo: {
    endCursor: "YXJyYXljb25uZWN0aW9uOjIxODQyNA==",
    hasNextPage: true
  },
  list: [
    {
      databaseId: 218427,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0Mjc=",
      author: {
        id: "YWRtaW5pc3RyYXRvcjox",
        databaseId: "1",
        name: "Spencer Bigum",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:08:02",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>4</p>\n",
      replies: []
      },
    {
      databaseId: 218426,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0MjY=",
      author: {
        databaseId: "1",
        id: "YWRtaW5pc3RyYXRvcjox",
        name: "Spencer Bigum",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:07:22",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>3</p>\n",
      replies: [
          {
            id: "Y29tbWVudDoyMTg0MzM=",
            databaseId: 218433,
            content: "<p>two test</p>\n",
            date: "2022-01-28 01:31:37",
            parent: 218426,
            author: {
              databaseId: "2",
              id: "YWRtaW5pc3RyYXRvcjoxMg==",
              name: "twotest",
              gravatar: {
                url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
              }
            }
          },
          {
            id: "Y29tbWVudDoyMTg0MzI=",
            databaseId: 218432,
            content: "<p>test</p>\n",
            date: "2022-01-28 01:26:12",
            parent: 218426,
            author: {
              databaseId: "1",
              id: "YWRtaW5pc3RyYXRvcjox",
              name: "Spencer M Bigum",
              gravatar: {
              url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
              }
            }
            },
          {
            id: "Y29tbWVudDoyMTg0Mjg=",
            databaseId: 218428,
            content: "<p>tes</p>\n",
            date: "2022-01-27 21:08:26",
            parent: 218426,
            author: {
              databaseId: "3",
              id: "YWRtaW5pc3RyYXRvcjoxMw==",
              name: "Teela Bigum",
              gravatar: {
                url: "https://secure.gravatar.com/avatar/aac786a8b226660a1064233ededdda6b?s=96&d=mm&r=g"
              }
            }
          }
        ]
      },
    {
      databaseId: 218424,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0MjQ=",
      author: {
        databaseId: "1",
        id: "YWRtaW5pc3RyYXRvcjox",
        name: "Spencer",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:05:42",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>test</p>\n",
      replies: []
      }
  ]
}

export const mockPostCommentRaw: IPostCommentRaw = {
  author: {
    node: {
      ...mockAuthorData,
      databaseId: '1',
      id: '1',
      gravatar: {
        url: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=24',
      }
    }
  },
  content: "This is a comment",
  databaseId: 1,
  approved: false,
  parent: null,
  commentedOn:{
    node:{
      databaseId: 1
    }
  },
  date: "2018-04-23T15:00:00",
  id: '1',
  replies: {
    edges:[
      {
        node: {
          author: {node: {
            ...mockAuthorData,
            databaseId: '1',
            id: '1',
            gravatar: {
              url: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=24',
            }
          }},
          content: 'comment reply',
          databaseId: 10,
          date: '2018-04-23T15:00:00',
          id: '10',
          parent:{
            node: {
              databaseId: 1
            }
          }
        }
      }
    ]
  }
}