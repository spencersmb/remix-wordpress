import { ArrowRightIcon } from "@heroicons/react/solid";

interface Props {
  title: string;
  description: string;
  url: string;
  externalLink: boolean;
}

/**
 * @function LinkItem
 * @description - Used in the Login Popover
 * @tested - Snapshot 11/19/2022
 */
const LinkItem = ({ title, description }: Props) => {
  return (
    <div className="p-4 transition-colors duration-200 rounded-lg hover:bg-tangerine-100 group">

      <div className="relative flex flex-row items-center">

        <div className="flex-1 text-lg font-semibold">
          {title}
        </div>

        <div className="relative transition-all duration-200 -translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
          <ArrowRightIcon className="w-4 h-4 text-tangerine-700" />
        </div>

      </div>

      <p className="text-sm text-grey-700">
        {description}
      </p>

    </div>
  )
}

export default LinkItem