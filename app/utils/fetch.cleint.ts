import { CREATE_COMMENT } from "@App/lib/graphql/mutations/comments"
import { getGraphQLString } from "./graphqlUtils"


async function fetchAPIClientSide(query: any, { variables }: any = {}) {
  const api_url = window.ENV.PUBLIC_WP_API_URL as string
  const res = await fetch(api_url, {
    method: 'POST',
    mode: 'cors',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Server Error: ' + json.errors[0].message)
  }
  return json.data
}

interface ISubmitComment {
  commentOn: number
  content: string
  author: string
  authorEmail: string
  parent?: number
}
type FetchSubmitCommentType = (comment: ISubmitComment) => Promise<ICommentResponse>
const fetchSubmitComment: FetchSubmitCommentType = (comment) => {
  // console.log('FetchSubmit Comment', comment);

  //SUCCESS
  // "data": {
  //   "createComment": {
  //     "success": true,
  //       "comment": {
  //       "id": "Y29tbWVudDoyMTgzODI=",
  //         "content": "<p>This is a test reply pending, yo</p>\n",
  //           "author": {
  //         "node": {
  //           "name": "Teela"
  //         }
  //       }
  //     }
  //   }
  // },

  // "errors": [
  //   {
  //     "message": "Duplicate comment detected; it looks as though you&#8217;ve already said that!",
  //     "extensions": {
  //       "category": "user"
  //     },
  //     "locations": [
  //       {
  //         "line": 38,
  //         "column": 3
  //       }
  //     ],
  //     "path": [
  //       "createComment"
  //     ]
  //   }
  // ],
  //   "data": {
  //   "createComment": null
  // },

  // ResponseA === Replyied to comment success, but first user submission
  const fakeResponseA = {
    createComment: null, // null means they havn't been approved yet
    parent: Boolean(comment.parent)
  }
  const fakeResponseB = {
    createComment: {
      success: true,
      comment: {
        id: "Y29tbWVudDoyMTgzODI===",
        databaseId: 5494,
        content: "<p>This is a test reply pending, yo</p>\n",
        date: '132131',
        commentedOn: {
          node: {
            databaseId: 5245,
            id: "cG9zdDo1NDM0"
          }
        },
        parent: 218387,
        author: {
          node: {
            id: '12123',
            name: "Spencer"
          }
        },
        replies: {
          edges: []
        }
      }
    }, // null means they havn't been approved yet
    parent: Boolean(comment.parent)
  }
  const resB = {
    data: {
      ...fakeResponseB
    }
  }
  const resA = {
    data: {
      ...fakeResponseA
    }
  }
  const errorResponse = {
    errors: [
      { message: "Duplicate comment detected; it looks as though you&#8217;ve already said that!" }
    ],
    data: {
      createComment: null
    }
  }
  return fetchAPIClientSide(getGraphQLString(CREATE_COMMENT), {
    variables: {
      input: { ...comment }
    }
  })
}

/*
Font File fetch
*/
export async function fetchFontPreviewFile(fontName: string){
  const rootUrl = window.ENV.APP_ROOT_URL as string
  const url = `${rootUrl}/api/font/file?font=${fontName}`;

  console.log('fontUrl', url);
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('WP QUERY FETCH' + json.errors)
  }
  return json
}

export {
  fetchSubmitComment,
  fetchAPIClientSide,
  type FetchSubmitCommentType
}