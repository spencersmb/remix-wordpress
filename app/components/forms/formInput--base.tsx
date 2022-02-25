import React from 'react'

interface Props {
  id: string
  type: string
  placeholder?: string
  actionDataError: boolean | undefined
}

function FormInputBasic(props: Props) {
  const { placeholder, id, type, actionDataError } = props

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-base leading-8 text-gray-700 transition duration-200 ease-in-out border rounded-lg outline-none bg-neutral-200 focus:ring focus:ring-teal-400 focus:ring-offset-4"
      name="email"
      aria-invalid={actionDataError}
      aria-describedby={
        actionDataError
          ? `${type}-error`
          : undefined
      }
    />
  )
}

export default FormInputBasic
