interface IProps {
  type: string
  id: string
  name: string
  invalid: boolean
  required?: boolean
  placeholder?: string
}
function InputBase(props: IProps) {
  const { type, id, name, invalid, placeholder = '', required = false } = props
  return (
    <input
      className="transform text-primary-700 w-full px-5 py-4 rounded-lg hover:ring hover:ring-primary-400 ring-offset-primary-600 focus:ring ring-offset-4 focus:ring-primary-300 text-base outline-none duration-200 ease-in-out autofill:"
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      aria-invalid={invalid}
      aria-describedby={
        invalid
          ? "username-error"
          : undefined
      }
    />
  )
}

export default InputBase