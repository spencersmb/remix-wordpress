interface IProps {
  type: string
  id?: string
  name: string
  invalid: boolean
  required?: boolean
  placeholder?: string
  onChange?: any
  value?: any
  disabled?: boolean
  className?: string
  minLength?: number
  min?: number
}
function InputBase(props: IProps) {
  const { type, id, name, invalid, className, placeholder = '', required = false } = props
  const defaultClass = "transform text-primary-700 w-full px-5 py-4 rounded-lg hover:ring hover:ring-primary-400 ring-offset-primary-600 focus:ring ring-offset-4 focus:ring-primary-300 text-base outline-none duration-200 ease-in-out autofill:"
  return (
    <input
      className={className ? className : defaultClass}
      type={type}
      id={id}
      minLength={props.minLength}
      min={props.min}
      name={name}
      value={props.value}
      onChange={props.onChange}
      placeholder={placeholder}
      required={required}
      // aria-invalid={invalid}
      aria-describedby={
        invalid
          ? `${id}-error`
          : undefined
      }
    />
  )
}

export default InputBase