import { classNames } from '@App/utils/appUtils'

interface Props {
  selectedClassName?: string
  text: string
  clickHandler: () => void
  selected: boolean
}

/**
 * @component PillSmall
 * 
 * @tested - 6/23/2022 
 *
 */
function PillSmall(props: Props) {
  const { selectedClassName, text, clickHandler, selected } = props

  return (
    // eslint-disable-n ext-line jsx-a11y/role-supports-aria-props
    <div
      id={`${text}`}
      data-testid={`${text}-pillTest`}
      onClick={clickHandler}
      aria-selected={selected}
      className={classNames(selectedClassName && selected
        ? selectedClassName : 'bg-grey-100 text-grey-500', 'ml-4 font-semibold rounded-xl px-3 py-2 text-sm flex flex-row items-center first:ml-0 hover:cursor-pointer')}>
      <div>
        {text}
      </div>
    </div>
  )
}

export default PillSmall
