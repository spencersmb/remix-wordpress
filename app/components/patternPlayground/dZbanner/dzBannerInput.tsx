import { classNames } from "@App/utils/appUtils"

const DzBannerInput = (props: any) => {
  const { accept, onFiles, files, getFilesFromEvent, content, extra: { active, reject } } = props
  const text = files.length > 0 ? 'Add more files' : 'Choose files'
  console.log('props', props)
  return (
    <label
      className={classNames(active ? 'opacity-100 -translate-y-1/2' : 'opacity-0 -translate-y-2', ' font-semibold text-red-600 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-auto text-2xl text-center')}>
      {content}
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        onChange={e => {
          getFilesFromEvent(e).then((chosenFiles: any) => {
            onFiles(chosenFiles)
          })
        }}
      />
    </label>
  )
}

export default DzBannerInput