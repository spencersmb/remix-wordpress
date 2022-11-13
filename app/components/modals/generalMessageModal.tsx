import React from 'react'
import ModalLayoutWrapperWhite from './modalWrapper-white'

interface Props {
  closeModal: () => void
  message: string
  header: string
}

function SignUpSuccess(props: Props) {
  const { closeModal, message, header } = props

  return (
    <ModalLayoutWrapperWhite
      data-testid="test-tuesdayMakersSignUpModal"
      showFlorals={true}
      className="bg-white w-[330px] tablet:w-full">
      <div
        className="relative flex flex-col items-center px-3 mt-12">

        {/* CONTENT */}
        <div className="w-full max-w-[300px] text-center mb-8">
          <h2 className="mb-4 text-3xl tablet:text-5xl text-grey-700 font-sentinel__SemiBoldItal">
            {header}
          </h2>
          <p className="text-grey-700">
            {message}
          </p>
        </div>

        <div>
          <button className="btn btn-lg btn-primary" onClick={closeModal}>Got it!</button>
        </div>

      </div>
    </ModalLayoutWrapperWhite>
  )
}

export default SignUpSuccess
