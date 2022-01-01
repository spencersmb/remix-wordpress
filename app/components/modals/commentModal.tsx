import useSite from '~/hooks/useSite'

function CommentModal () {
  const {state: {commentsModal}} = useSite()

  if(commentsModal.show){
    return (
      <div>
        Comment MODAL
        <div>
          Comment Form
        </div>

        {commentsModal.comments.length > 0 && <div>
          {commentsModal.comments.map((comment: IPostComment) => <div key={comment.id}>
            <h3>{comment.author.name}</h3>
          </div>)}
        </div>}
      </div>
    )
  }

  return null

}

export default CommentModal
