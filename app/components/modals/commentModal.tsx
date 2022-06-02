import useSite from '@App/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'
import { useState } from 'react'
import { gql } from '@apollo/client'
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { parseComment } from '@App/utils/posts'

/*
2 Forms - main form to leave a comment. 2nd form appears when user clicks reply. That form is for replying a nested comment
*/

/**
 * @Component Comments Modal
 * @tested - 5/31/2022
 * 
 * Large full window modal to leave a comment in the blog area
 *
 *
 */
const CommentModal = () => {
  const { state: { commentsModal }, addComment, hideComments, fetchMoreComments } = useSite()
  const [loading, setLoading] = useState(false)

  async function fetchMore() {
    setLoading(true)
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      after: commentsModal.pageInfo.endCursor,
      postID: commentsModal.commentOn
    }

    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(query),
          variables
        })
      })
    const { data } = await body.json()
    console.log('data', data);

    fetchMoreComments({
      comments: data.comments.edges.map(({ node }: any) => parseComment(node)),
      pageInfo: data.comments.pageInfo
    })
    setLoading(false)

    // const filteredPosts = flattenAllPosts(data.posts) || []
    // addPostsAction({
    //   pageInfo: {
    //     page: state.pageInfo.page + 1,
    //     endCursor: data.posts.pageInfo.endCursor,
    //     hasNextPage: data.posts.pageInfo.hasNextPage,
    //   },
    //   posts: [
    //     ...state.posts,
    //     ...filteredPosts
    //   ]
    // }
    // )
  }

  return (
    // @ts-ignore
    <AnimatePresence>
      {commentsModal.show
        ? <>
          <motion.div
            data-testid='commentModal'
            key='modalContainer'
            className='bg-white fixed h-screen block z-[1100] opacity-0 translate-x-[0] top-0 right-0 left-auto  overflow-y-auto shadow-xl w-full laptop:max-w-[700px] '
            initial={containerMotion.closed}
            animate={containerMotion.open}
            exit={containerMotion.closed}
          >
            <div className='flex flex-col'>

              {/* COMMENT HEADER */}
              <div className="flex flex-row justify-between px-6 pt-6 comments_header tablet:px-12 laptop:pr-10">
                <div className='flex flex-row items-end font-sentinel__SemiBoldItal text-h3 text-primary-700'>
                  Comments <span className='text-h5 leading-[1.5] ml-2'>({commentsModal.comments.length})</span>
                </div>
                <div data-testid="comments-close-btn" className='w-[40px] hover:cursor-pointer' onClick={hideComments}>
                  <CloseSvg fill={'var(--primary-plum-700)'} />
                </div>
              </div>

              {/* COMMENT FORM */}
              <div className=''>
                <CommentForm postId={commentsModal.commentOn} primary={true} />
              </div>

              {/* COMMENTS */}
              {commentsModal.comments.length > 0 &&
                <div className='px-6 tablet:px-12 laptop:pr-10' data-testid="comments-list">
                  {commentsModal.comments.map((comment: IPostComment) =>
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={commentsModal.commentOn}
                    />
                  )
                  }
                </div>}

              {/* LOAD MORE COMMENTS */}
              {commentsModal.pageInfo.hasNextPage &&
                <div>
                  <button
                    data-testid="comments-load-more"
                    onClick={fetchMore}
                    className={`text-primary-600 font-semibold px-5 py-4 rounded-lg hover:ring ring-offset-4 text-base outline-none duration-200 ease-in-out flex flex-1 flex-row justify-center items-center disabled:bg-neutral-500 disabled:ring disabled:ring-neutral-500 bg-secondary-400 hover:ring-secondary-400 hover:bg-secondary-400 ring-offset-white active:bg-secondary-500 active:scale-[.98]}`}>
                    {(loading) && <TwSpinnerOne />}
                    {loading ? 'Loading...' : 'Load More Comments'}
                  </button>
                </div>
              }
            </div>
          </motion.div>
          <motion.div
            data-testid="comments-modal-overlay"
            id="modalOverlay"
            className={`fixed top-0 right-0 w-0 h-0 bg-slate-900 z-[1050]`}
            key="loginOverlay"
            initial={'initial'}
            exit={'exit'}
            animate={'enter'}
            variants={variants}
            onClick={hideComments}
          />
        </>
        : null}
    </AnimatePresence>

  )
}
const containerMotion = {
  closed: {
    x: '100%',
    right: 0,
    left: 'auto',
    top: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .2
    }
  },
  open: {
    x: '0%',
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30
    }
  }
}
const variants = {
  initial: {
    opacity: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
  exit: {
    opacity: 0,
    width: '100%',
    height: '100%',
    display: 'black',
    transition: {
      opacity: {
        duration: 0
      }
    }
  },
  enter: {
    width: '100%',
    height: '100%',
    display: 'block',
    opacity: .5,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
}


export default CommentModal


const query = gql`
  query GetMoreComments($after: String, $postID: ID) {
    comments(first: 10, after: $after, where: {contentId: $postID}) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          databaseId
          approved
          parent {
            node {
              databaseId
            }
          }
          id
          author {
            node {
              name
              isRestricted
              databaseId
              ... on CommentAuthor {
                gravatar {
                  url
                }
              }
            }
          }
          date
          commentedOn {
            node {
              id
              status
            }
          }
          content
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
                    email
                    ... on CommentAuthor {
                      id
                      email
                      gravatar {
                        default
                        extra_attr
                        force_default
                        found_avatar
                        height
                        rating
                        size
                        url
                        width
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
  }
`