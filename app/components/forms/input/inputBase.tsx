import { classNames } from "@App/utils/appUtils"


/**
 * InputBase Component
 * @tested - 5/30/2022
 * @param props 
 */
// TODO: Add tests for DEFAULT VALUE and label
function InputBase(props: InputBaseProps) {
  const { type, id, name, invalid, className, label, disabled, placeholder = '', required = false, ref, autoComplete, labelCss, defaultValue, wrapperCss } = props

  const defaultClass = "transform text-primary-700 w-full px-5 py-4 rounded-lg hover:ring focus:ring ring-offset-4 focus:ring-primary-300 text-base outline-none duration-200 ease-in-out autofill:"
  return (
    <label htmlFor={id} className={wrapperCss}>
      <span className={labelCss}>{label}</span>
      <input
        ref={ref}
        data-testid={id}
        className={classNames(className ? className : '', defaultClass)}
        type={type}
        aria-label={label}
        id={id}
        minLength={props.minLength}
        min={props.min}
        name={name}
        autoComplete={autoComplete}
        value={props.value}
        defaultValue={defaultValue}
        onChange={props.onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-describedby={
          invalid
            ? `${id}-error`
            : undefined
        }
      />
    </label>
  )
}

export default InputBase