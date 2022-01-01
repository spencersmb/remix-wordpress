import useSite from '~/hooks/useSite'

function CommentModal () {
  const {state: {commentsModal}} = useSite()

  if(commentsModal.show){
    return (
      <div>
        Comment MODAL
      </div>
    )
  }

  return null

}

export default CommentModal
