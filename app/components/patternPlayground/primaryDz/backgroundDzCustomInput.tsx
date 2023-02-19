import { classNames } from "@App/utils/appUtils"
import { useEffect } from "react"

const BackgroundDzCustomInput = ({ accept, onFiles, files, getFilesFromEvent, content, extra: { active } }: any) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label
      className={classNames(active ? 'opacity-100 -translate-y-1/2' : 'opacity-0 -translate-y-2', ' font-semibold transition-all absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-auto text-2xl text-center')}>
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
    // <div
    //   className={'hidden'}
    // >
    //   <label
    //     className='relative z-3'
    //     style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
    //     {text}
    //     <input
    //       style={{ display: 'none' }}
    //       type="file"
    //       accept={accept}
    //       multiple
    //       onChange={e => {
    //         getFilesFromEvent(e).then((chosenFiles: any) => {
    //           onFiles(chosenFiles)
    //         })
    //       }}
    //     />
    //   </label>
    // </div>
  )
}

export default BackgroundDzCustomInput