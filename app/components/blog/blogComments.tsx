import React from 'react'
import { cssColors } from '@App/enums/colors'
import useSite from '@App/hooks/useSite'
import CommentsSvg from '../svgs/commentsSvg'
import FacebookSvg from '../svgs/social/facebookSvg'

interface Props {
  post: IPost
}

function BlogComments(props: Props) {
  const { post } = props
  const { showComments, hideComments, state: { commentsModal, metadata, } } = useSite();
  const socialkeys = Object.keys(metadata.social) //used to build out social links
  const postUrl = `${metadata.domain}/${post.slug}`



  function handleCommentsClick() {
    console.log('click comments');

    if (commentsModal.show) {
      return
    }
    console.log('post.comments', post.comments)

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

  return (
    <div className='flex flex-row items-center justify-between'>

      <div onClick={handleCommentsClick} className='flex flex-row items-center hover:cursor-pointer'>

        {/* ICON */}
        <div className='mr-2 w-7'>
          <CommentsSvg stroke={'var(--primary-plum-600)'} />
        </div>

        {/* COUNT */}
        <div>
          {post.comments.list.length !== 0
            ? <p className='text-primary-700'><span className='font-semibold'>{post.comments.list.length}</span> comments</p>
            : <p className='font-sentinel__SemiBoldItal text-neutral-600'>Leave a comment</p>}
        </div>
      </div>

      <div>
        <ul className='flex flex-row items-center justify-center'>
          <li className='mr-2'>Share on</li>
          {socialkeys.map(key => {
            const socialCss = 'flex bg-primary-600 rounded-full w-[30px] h-[30px] p-[5px] group hover:bg-primary-400 hover:scale-[1.2] transition-all duration-200 ease-in-out'
            const svgCsss = 'transition-all group-hover:scale-[1.2]'
            switch (key) {
              case 'facebook':
                return (
                  <li key={key} className='flex mr-2'>
                    <a
                      id="shareBtn"
                      rel="nofollow noreferrer"
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                      data-link={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                      onClick={handleFacebookShareClick}
                      className={`${socialCss}`}>
                      <FacebookSvg className={`${svgCsss}`} fill={`var(${cssColors.primaryPlum50})`} />
                      <span className="sr-only">Every Tuesday on Youtube</span>
                    </a>
                  </li>
                )
            }
          }
          )}
        </ul>
      </div>

    </div>
  )
}

export default BlogComments
