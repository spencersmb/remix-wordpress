import React, { useEffect } from 'react'
import { cssColors } from '@App/enums/colors'
import useSite from '@App/hooks/useSite'
import CommentsSvg from '../svgs/commentsSvg'
import FacebookSvg from '../svgs/social/facebookSvg'

interface Props {
  post: IPost
}
/**
 * BlogComments Component
 * @tested - 5/26/2022
 * 
 * Shows a button to open the comments modal and a Facebook share button
 * 
 * @param props 
 */
function BlogComments(props: Props) {
  const { post } = props
  const { showComments, hideComments, state: { commentsModal, metadata, } } = useSite();
  const socialkeys = Object.keys(metadata.social) //used to build out social links
  const postUrl = `${metadata.domain}/${post.slug}`

  function handleCommentsClick() {
    if (commentsModal.show) {
      return
    }

    showComments({
      commentOn: post.databaseId,
      comments: post.comments.list,
      pageInfo: post.comments.pageInfo
    })
  }

  function handleFacebookShareClick(event: IClickEvent) {
    event.preventDefault();
    // @ts-ignore
    const href = event.currentTarget.href;
    return !window.open(href, 'Facebook', 'width=640,height=580')
  }

  useEffect(() => {
    showComments({
      commentOn: post.databaseId,
      comments: post.comments.list,
      pageInfo: post.comments.pageInfo
    })
  }, [])
  return (
    <div className='flex flex-row items-center justify-between'>

      <div onClick={handleCommentsClick} className='flex flex-row items-center hover:cursor-pointer'>

        {/* ICON */}
        <div className='mr-2 w-7'>
          <CommentsSvg stroke={'var(--sage-700)'} />
        </div>

        {/* COUNT */}
        <div data-testid="comments-count">
          {post.comments.list.length !== 0
            ? <p className='text-sage-700'><span className='font-semibold'>{post.comments.list.length}</span> comments</p>
            : <p className='font-sentinel__SemiBoldItal text-sage-700'>Leave a comment</p>}
        </div>
      </div>

      <div>
        <ul className='flex flex-row items-center justify-center'>
          <li className='mr-2'>Share on</li>
          {socialkeys.map(key => {
            const socialCss = 'flex bg-sage-600 rounded-full w-[30px] h-[30px] p-[5px] group hover:bg-sage-400 hover:scale-[1.2] transition-all duration-200 ease-in-out'
            const svgCsss = 'transition-all group-hover:scale-[1.2]'
            switch (key) {
              case 'facebook':
                return (
                  <li key={key} className='flex mr-2'>
                    <a
                      id="shareBtn"
                      data-testid="facebook-share-btn"
                      rel="nofollow noreferrer"
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                      data-link={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                      onClick={handleFacebookShareClick}
                      className={`${socialCss}`}>
                      <FacebookSvg className={`${svgCsss}`} fill={`var(--sage-50)`} />
                      <span className="sr-only">Every Tuesday on Facebook</span>
                    </a>
                  </li>
                )
              default:
                return null
            }
          }
          )}
        </ul>
      </div>

    </div>
  )
}

export default BlogComments
