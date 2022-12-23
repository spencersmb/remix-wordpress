import useSite from '@App/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'
import { useState } from 'react'
import gql from 'graphql-tag';
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { parseComment } from '@App/utils/posts'
import BasicSubmitBtn from '../buttons/basicSubmitBtn'
import { spinnerColors } from '../spinners/spinnerColors'
import { useScrollBarHide } from '@App/hooks/windowUtilHooks'

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
  useScrollBarHide(commentsModal.show)

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
            className='bg-white fixed h-screen block z-[1100] overflow-y-scroll opacity-0 translate-x-[0] top-0 right-0 left-auto shadow-xl w-full laptop:max-w-[700px] '
            initial={containerMotion.closed}
            // @ts-ignore
            animate={containerMotion.open}
            exit={containerMotion.closed}
          >
            <div className='flex flex-col'>

              {/* COMMENT HEADER */}
              <div className="flex flex-row justify-between px-6 pt-6 comments_header tablet:px-12 laptop:pr-10">
                <div className='flex flex-row items-end font-sentinel__SemiBoldItal text-h3 text-emerald-800'>
                  Comments <span className='text-h5 leading-[1.5] ml-2'>({commentsModal.comments.length})</span>
                </div>
                <div data-testid="comments-close-btn" className='w-[40px] hover:cursor-pointer group' onClick={hideComments}>
                  <CloseSvg stroke={'var(--sage-700)'} className="transition-all duration-300 ease-in-out group-hover:rotate-180" />
                </div>
              </div>

              {/* COMMENT FORM */}
              <div className=''>
                <CommentForm
                  postId={commentsModal.commentOn}
                  primary={true}
                  index={0}
                />
              </div>

              {/* COMMENTS */}
              {commentsModal.comments.length > 0 &&
                <div className='' data-testid="comments-list">
                  {commentsModal.comments.map((comment: IPostComment, index: number) =>
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={commentsModal.commentOn}
                      index={index}
                    />
                  )
                  }
                </div>}

              {/* LOAD MORE COMMENTS */}
              {commentsModal.pageInfo.hasNextPage &&
                <div className='flex justify-center'>
                  <button
                    data-testid="comments-load-more"
                    onClick={fetchMore}
                    className={`btn btn-outline btn-lg`}>
                    {(loading) && <span className='mr-2'><TwSpinnerOne loaderColors={spinnerColors.sageOutline} /></span>}
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
    opacity: 1,
    overflow: 'hidden',
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
    overflowY: 'scroll',
    transition: {
      // delay: .1
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