import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { cleanup, findByTestId, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import CommentForm from "../commentForm"
import { fetchSubmitComment as mockFetchSubmitComment } from "../../../utils/fetch.cleint";
import { act } from "react-dom/test-utils";


jest.mock("../../../utils/fetch.cleint")


describe('Comment Form Component', () => {
  const optionalCallback = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  });
  const setup = (props: any = {}) => {
    const defaultProps = {
      postId: 2
      // replyToComment?: IPostComment
      // onComplete?: (response: ICommentResponse) => void
      // primary ?: boolean
      // btnText?: string
      // subForm?: boolean
    }
    const initialState = {
      ...siteInitialState
    }
    const setupProps = { ...defaultProps, ...props }
    const queries = render(
      <UseSiteProvider defaultState={initialState}>
        <CommentForm {...setupProps} />
      </UseSiteProvider>
    )

    return {
      ...queries
    }
  }


  it('Should have a submit button with POST COMMENT TEXT', () => {
    setup()
    const button = screen.getByTestId('submit-comment-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(button).toHaveTextContent('Post Comment')
    expect(button).toHaveProperty('disabled', true)
    expect(spinner).toBeNull()
  })

  it('Should have 3 inputs - name/email/textarea', () => {
    setup()
    // input name
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const textarea = screen.getByLabelText('Comment Body')

    expect(nameInput).toHaveProperty('type', 'text')
    expect(emailInput).toHaveProperty('type', 'email')
    expect(textarea).toHaveProperty('type', 'textarea')

    expect(nameInput).toHaveProperty('placeholder', 'Enter Name')
    expect(emailInput).toHaveProperty('placeholder', 'email@gmail.com')
    expect(textarea).toHaveProperty('placeholder', 'Leave comment here...')

    expect(nameInput).toHaveProperty('disabled', false)
    expect(emailInput).toHaveProperty('disabled', false)
    expect(textarea).toHaveProperty('disabled', false)

    expect(emailInput).toHaveProperty('required', true)
    expect(textarea).toHaveProperty('required', true)

  })

  it('Should show error message for Name not long enough', () => {
    setup()
    const nameInput = screen.getByLabelText('Name')
    fireEvent.change(nameInput, { target: { value: 'a' } })
    const error = screen.getByText('Name must be at least 2 characters long')
    expect(error).toBeDefined()
    expect(nameInput).toHaveClass('input-error')
  })

  it('Should show error message for email not long enough', () => {
    setup()
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'a' } })
    const error = screen.getByText('Email is invalid')
    expect(error).toBeDefined()
    expect(emailInput).toHaveClass('input-error')
  })

  it('should submit form with name/email/comment', async () => {

    const defaultProps = {
      postId: 2,
      index: 0
      // replyToComment?: IPostComment
      // onComplete?: (response: ICommentResponse) => void
      // primary ?: boolean
      // btnText?: string
      // subForm?: boolean
    }
    const initialState = {
      ...siteInitialState
    }
    const { queryByTestId, getByTestId } = render(
      <UseSiteProvider defaultState={initialState}>
        <CommentForm {...defaultProps} />
      </UseSiteProvider>
    )

    //@ts-ignore
    mockFetchSubmitComment.mockResolvedValueOnce({
      createComment: {
        success: true,
        comment: null
      }
    })
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const textarea = screen.getByLabelText('Comment Body')
    // const button = screen.getByTestId('submit-comment-button')
    const button = getByTestId('submit-comment-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')

    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(emailInput, { target: { value: 'spencer.bigum@gmail.com' } })
    fireEvent.change(textarea, { target: { value: 'This is a test comment' } })
    fireEvent.click(button)

    expect(button).toHaveTextContent('...sending')
    expect(spinner).toBeDefined()
    expect(button).toHaveProperty('disabled', true)
    // expect(nameInput).toHaveProperty('disabled', true)
    // expect(emailInput).toHaveProperty('disabled', true)
    // expect(textarea).toHaveProperty('disabled', true)

    await act(async () => {

      expect(mockFetchSubmitComment).toBeCalledWith({
        author: "John",
        authorEmail: "spencer.bigum@gmail.com",
        commentOn: 2,
        content: "This is a test comment",
        parent: undefined
      })
      expect(mockFetchSubmitComment).toBeCalledTimes(1)
      // expect(queryByTestId('comment-form')).toBeNull()



    });

    await waitFor(() => {
      expect(screen.queryByText('Comment submitted successfully, but needs to be approved by Teela.')).toBeInTheDocument()
      expect(screen.queryByTestId('comment-form')).not.toBeInTheDocument()
      // screen.debug()
      // expect(nameInput).toHaveProperty('value', '')
    })

  })

  it('should submit and call optional callback', async () => {
    // jest.setTimeout(6000)
    const defaultProps = {
      postId: 2,
      index: 0,
      // replyToComment?: IPostComment
      onComplete: optionalCallback
      // primary ?: boolean
      // btnText?: string
      // subForm?: boolean
    }
    const initialState = {
      ...siteInitialState
    }
    const { queryByTestId, getByTestId } = render(
      <UseSiteProvider defaultState={initialState}>
        <CommentForm {...defaultProps} />
      </UseSiteProvider>
    )

    //@ts-ignore
    mockFetchSubmitComment.mockResolvedValueOnce({
      createComment: {
        success: true,
        comment: null
      }
    })
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const textarea = screen.getByLabelText('Comment Body')
    const button = getByTestId('submit-comment-button')

    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(emailInput, { target: { value: 'spencer.bigum@gmail.com' } })
    fireEvent.change(textarea, { target: { value: 'This is a test comment' } })
    fireEvent.click(button)

    // MUST BE IN TEST SO WE DON'T GET WEIRD WARNINGS
    await act(async () => {
    });

    await waitFor(() => {
      expect(optionalCallback).toBeCalledTimes(1)
      expect(optionalCallback).toBeCalledWith({
        createComment: {
          comment: null,
          success: true
        }
      })
    })

  })

  it('should submit form with name/email/comment', async () => {

    const defaultProps = {
      postId: 2,
      index: 0
      // replyToComment?: IPostComment
      // onComplete?: (response: ICommentResponse) => void
      // primary ?: boolean
      // btnText?: string
      // subForm?: boolean
    }
    const initialState = {
      ...siteInitialState
    }
    const { queryByTestId, getByTestId } = render(
      <UseSiteProvider defaultState={initialState}>
        <CommentForm {...defaultProps} />
      </UseSiteProvider>
    )

    //@ts-ignore
    mockFetchSubmitComment.mockResolvedValueOnce({
      createComment: {
        success: true,
        comment: null
      }
    })
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const textarea = screen.getByLabelText('Comment Body')
    // const button = screen.getByTestId('submit-comment-button')
    const button = getByTestId('submit-comment-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')

    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(emailInput, { target: { value: 'spencer.bigum@gmail.com' } })
    fireEvent.change(textarea, { target: { value: 'This is a test comment' } })
    fireEvent.click(button)

    expect(button).toHaveTextContent('...sending')
    expect(spinner).toBeDefined()
    expect(button).toHaveProperty('disabled', true)
    expect(nameInput).toHaveProperty('disabled', true)
    expect(emailInput).toHaveProperty('disabled', true)
    expect(textarea).toHaveProperty('disabled', true)

    await act(async () => {

      expect(mockFetchSubmitComment).toBeCalledWith({
        author: "John",
        authorEmail: "spencer.bigum@gmail.com",
        commentOn: 2,
        content: "This is a test comment",
        parent: undefined
      })
      expect(mockFetchSubmitComment).toBeCalledTimes(1)
      // expect(queryByTestId('comment-form')).toBeNull()
    });

    await waitFor(() => {
      expect(screen.queryByText('Comment submitted successfully, but needs to be approved by Teela.')).toBeInTheDocument()
      // expect(nameInput).toHaveProperty('value', '')
    })
  })
})