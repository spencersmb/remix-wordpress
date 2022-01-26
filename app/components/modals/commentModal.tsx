import useSite from '~/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'

/*
2 Forms - main form to leave a comment. 2nd form appears when user clicks reply. That form is for replying a nested comment
*/

/**
 * @Component Comments Modal
 *
 * A Basic modal for displaying content. Just pass a component to the reducer when
 * opening. Example check the NAV component.
 *
 * use the useEssGridAuth hook to use this modal type
 *
 */
const CommentModal = () => {
  const { state: { commentsModal }, addComment, hideComments } = useSite()

  return (
    <AnimatePresence>
      {commentsModal.show
        ? <>
          <motion.div
            key='modalContainer'
            className='bg-white fixed h-screen block z-[1100] opacity-0 translate-x-[0] top-0 right-0 left-auto  overflow-y-auto shadow-xl w-full tablet:max-w-[700px] '
            initial={containerMotion.closed}
            animate={containerMotion.open}
            exit={containerMotion.closed}
          >
            <div className='px-6 py-4 tablet:px-12 tablet:py-8 laptop:pr-10'>
              <div className="comments_header flex flex-row justify-between">
                <div className='flex flex-row font-sentinel__SemiBoldItal text-h3 text-primary-700 items-end'>
                  Comments <span className='text-heading-h5 leading-[1.5] ml-2'>({commentsModal.comments.length})</span>
                </div>
                <div className='w-[40px] hover:cursor-pointer' onClick={hideComments}>
                  <CloseSvg fill={'var(--primary-plum-700)'} />
                </div>
              </div>
              <CommentForm postId={commentsModal.commentOn} primary={true} />

              {commentsModal.comments.length > 0 && <div>
                {commentsModal.comments.map((comment: IPostComment) =>
                  <Comment
                    key={comment.id}
                    comment={comment}
                    postId={commentsModal.commentOn}
                  />
                )
                }
              </div>}
            </div>
          </motion.div>
          <motion.div
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


