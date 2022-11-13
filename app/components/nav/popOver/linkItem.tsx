import { ArrowRightIcon } from "@heroicons/react/solid";

interface Props {
  title: string;
  description: string;
  url: string;
  externalLink: boolean;
}
//TODO: Test this component
const LinkItem = ({ title, description }: Props) => {
  return (
    <div className="p-4 transition-colors duration-200 rounded-lg hover:bg-sage-100 group">

      <div className="relative flex flex-row items-center">

        <div className="flex-1 text-lg font-semibold">
          {title}
        </div>
        <div className="relative transition-all duration-200 -translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
          <ArrowRightIcon className="w-4 h-4 text-primary-600" />
        </div>

      </div>

      <p className="text-sm text-grey-500">
        {description}
      </p>

    </div>
  )
}

export default LinkItem