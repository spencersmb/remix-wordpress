import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import SignUpSuccess from "../signUpSuccess";


describe('SignUp Success Modal Component', () => {
  const setup = (props: any) => {
    render(
      <SignUpSuccess {...props} />
    )
  }

  it('Should render Snapshot of SignUp Success modal', () => {
    const closeModal = jest.fn()
    const message = 'Check your email and click the link inside to confirm your new account.'
    const tree = renderer
      .create(
        <MemoryRouter>
          <SignUpSuccess closeModal={closeModal} message={message} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Should call closeModal fn', () => {
    const closeModal = jest.fn()
    setup({
      closeModal,
      message: 'Check your email and click the link inside to confirm your new account.'
    })

    const btn = screen.queryByText('Got it!')
    expect(btn).toBeVisible()
    if (!btn) {
      expect(true).toBeFalsy()
      return
    }
    fireEvent.click(btn)
    expect(closeModal).toHaveBeenCalled()
  })

  it('Should show correct message prop', () => {
    const closeModal = jest.fn()
    const message = 'Check your email and click the link inside to confirm your new account.'
    setup({
      closeModal,
      message
    })

    const text = screen.queryByText(message)
    expect(text).toBeVisible()

  })
})