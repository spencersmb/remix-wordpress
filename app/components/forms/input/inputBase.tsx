import { classNames } from "@App/utils/appUtils"


/**
 * InputBase Component
 * @tested - 8/22/2022
 * @param props 
 */

function InputBase(props: InputBaseProps) {
  const { type, id, name, invalid, className, label, disabled, placeholder = '', required = false, ref, autoComplete, labelCss, defaultValue, wrapperCss } = props

  return (
    <label htmlFor={id} className={wrapperCss}>
      <span className={labelCss}>{label}</span>
      <input
        ref={ref}
        data-testid={id}
        className={classNames(className ? className : 'focus:ring-blue-300', 'input-field')}
        type={type}
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