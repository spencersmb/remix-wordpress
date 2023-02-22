import { classNames } from "@App/utils/appUtils"

const BackgroundDzCustomInput = ({ accept, onFiles, files, getFilesFromEvent, content, extra: { active } }: any) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label
      className={classNames(active ? 'opacity-100 -translate-y-1/2' : 'opacity-0 -translate-y-1/2', ' font-semibold transition-all absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full text-2xl text-center flex justify-center items-center')}>
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

export default BackgroundDzCustomInput