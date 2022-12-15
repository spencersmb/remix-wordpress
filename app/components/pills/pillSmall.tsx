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
  const backgroundSquare = text === 'Beginner'
    ? 'bg-emerald-100'
    : text === 'Intermediate'
      ? 'bg-tangerine-500'
      : 'bg-tangerine-800'

  const selectedBackgroundSquare = text === 'Beginner'
    ? 'bg-emerald-200'
    : text === 'Intermediate'
      ? 'bg-tangerine-700'
      : 'bg-tangerine-900'

  return (
    // eslint-disable-n ext-line jsx-a11y/role-supports-aria-props
    <div
      id={`${text}`}
      data-testid={`pillTest`}
      onClick={clickHandler}
      aria-selected={selected}
      className={classNames(selectedClassName && selected
        ? selectedClassName : 'bg-white text-emerald-700', 'ml-4 border border-grey-300 font-semibold rounded-2xl px-4 py-3 text-sm flex flex-row items-center first:ml-0 hover:cursor-pointer')}>
      <div className={classNames(selected ? selectedBackgroundSquare : backgroundSquare, `w-[14px] h-[14px] rounded mr-2`)} />
      <div>
        {text}
      </div>
    </div>
  )
}

export default PillSmall
