import type { ISiteContextState } from "@App/hooks/useSite";
import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils"
import CommentModal from "../commentModal"

describe('Comment Modal Component', () => {
  const defaultState: ISiteContextState = {
    ...siteInitialState,
  }
  it('Comment Modal shoul not be visible', () => {
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={defaultState}>
        <CommentModal />
      </UseSiteProvider>
    )

    const modal = queryByTestId('commentModal')
    const overlay = queryByTestId('comments-modal-overlay')

    expect(modal).toBeNull()
    expect(overlay).toBeNull()
  })

  it('Should show modal with state showModal=true', () => {
    const openState = {
      ...defaultState,
      commentsModal: {
        show: true,
        commentOn: 2,
        comments: [
          {
            author: {
              name: 'Spencer',
              id: '1',
              databaseId: '12',
              gravatar: {
                url: 'https://www.gravatar.com/avatar/12',
              }
            },
            content: 'Test Comment',
            databaseId: 2,
            date: '2020-01-01',
            id: '2'
            // parent?: number | null
            // replies?: IPostComment[]
          }
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: ''
        }
      }
    }
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <CommentModal />
      </UseSiteProvider>
    )

    const modal = queryByTestId('commentModal')
    const overlay = queryByTestId('comments-modal-overlay')
    expect(modal).toBeInTheDocument()
    expect(overlay).toBeInTheDocument()
    expect(modal).toHaveTextContent('Comments (1)')

  })

  it('Should show modal comments', () => {
    const openState = {
      ...defaultState,
      commentsModal: {
        show: true,
        commentOn: 2,
        comments: [
          {
            author: {
              name: 'Spencer',
              id: '1',
              databaseId: '12',
              gravatar: {
                url: 'https://www.gravatar.com/avatar/12',
              }
            },
            content: 'Test Comment',
            databaseId: 2,
            date: '2020-01-01',
            id: '2'
            // parent?: number | null
            // replies?: IPostComment[]
          }
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: ''
        }
      }
    }
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <CommentModal />
      </UseSiteProvider>
    )

    const modal = queryByTestId('comments-list')
    const button = queryByTestId('comments-load-more')
    expect(modal?.children.length).toBe(1)
    expect(button).toBeNull()
  })

  it('Should show load more comments button', () => {
    const openState = {
      ...defaultState,
      commentsModal: {
        show: true,
        commentOn: 2,
        comments: [
          {
            author: {
              name: 'Spencer',
              id: '1',
              databaseId: '12',
              gravatar: {
                url: 'https://www.gravatar.com/avatar/12',
              }
            },
            content: 'Test Comment',
            databaseId: 2,
            date: '2020-01-01',
            id: '2'
            // parent?: number | null
            // replies?: IPostComment[]
          }
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: '12355'
        }
      }
    }
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <CommentModal />
      </UseSiteProvider>
    )
    const button = queryByTestId('comments-load-more')
    expect(button).not.toBeNull()
  })

  it('Should show comment form to fill out', () => {
    const openState = {
      ...defaultState,
      commentsModal: {
        show: true,
        commentOn: 2,
        comments: [
          {
            author: {
              name: 'Spencer',
              id: '1',
              databaseId: '12',
              gravatar: {
                url: 'https://www.gravatar.com/avatar/12',
              }
            },
            content: 'Test Comment',
            databaseId: 2,
            date: '2020-01-01',
            id: '2'
            // parent?: number | null
            // replies?: IPostComment[]
          }
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: '12355'
        }
      }
    }
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <CommentModal />
      </UseSiteProvider>
    )
    const form = queryByTestId('comment-form')
    expect(form).not.toBeNull()
  })

  it.skip('Should hide comment modal on click', async () => {
    const openState = {
      ...defaultState,
      commentsModal: {
        show: true,
        commentOn: 2,
        comments: [
          {
            author: {
              name: 'Spencer',
              id: '1',
              databaseId: '12',
              gravatar: {
                url: 'https://www.gravatar.com/avatar/12',
              }
            },
            content: 'Test Comment',
            databaseId: 2,
            date: '2020-01-01',
            id: '2'
            // parent?: number | null
            // replies?: IPostComment[]
          }
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: '12355'
        }
      }
    }
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <CommentModal />
      </UseSiteProvider>
    )

    const closeBtn = queryByTestId('comments-close-btn')
    expect(closeBtn).not.toBeNull()
    expect(queryByTestId('comments-modal-overlay')).toBeNull()
    if (closeBtn) {
      fireEvent.click(closeBtn)

      await waitFor(() => {
        expect(queryByTestId('comments-modal-overlay')).toBeNull()
      })
    }
  })

})