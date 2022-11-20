import { fireEvent, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import GeneralMessageModal from "../generalMessageModal";


describe('General Message Modal Component', () => {
  const setup = (props: any) => {
    render(
      <GeneralMessageModal {...props} />
    )
  }

  it('Should render Snapshot of General Message modal', () => {
    const closeModal = jest.fn()
    const message = 'Check your email and click the link inside to confirm your new account.'
    const header = 'Sign Up Success'
    const tree = renderer
      .create(
        <GeneralMessageModal closeModal={closeModal} message={message} header={header} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Should call closeModal fn', () => {
    const closeModal = jest.fn()
    setup({
      closeModal,
      message: 'Check your email and click the link inside to confirm your new account.',
      header: 'Sign Up Success'
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
      message,
      header: 'Sign Up Success'
    })

    const text = screen.queryByText(message)
    expect(text).toBeVisible()

  })

  it('Should show correct header prop', () => {
    const closeModal = jest.fn()
    const message = 'Check your email and click the link inside to confirm your new account.'
    setup({
      closeModal,
      message,
      header: 'Sign Up Success'
    })

    const text = screen.queryByText('Sign Up Success')
    expect(text).toBeVisible()

  })
})