import { classNames } from "@App/utils/appUtils";
import { useRef, useState } from "react";

const BackgroundDzCustomLayout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: any) => {
  const uploadRef = useRef<any>(null)
  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
      <div
        ref={uploadRef}
        {...dropzoneProps}



        onDragEnter={(e) => {
          // console.log('drag enter', e)
          if (!isHovering) {
            setIsHovering(true)
          }
        }}

        onDragLeave={(e) => {
          dropzoneProps.onDragLeave(e)
          // console.log('drag leave', e)
          // console.log('drag leave', uploadRef.current.classList.contains('dzu-dropzoneActive'))
          // const parent = document.querySelector('.upload')
          // Does parent have class dzu-dropzoneActive
          setTimeout(() => {
            const hasClass = uploadRef.current?.classList.contains('dzu-dropzoneActive')
            if (!hasClass) {
              setIsHovering(false)
            }
          }, 150)
        }}

        onDrop={(e) => {
          if (isHovering) {
            setIsHovering(false)
          }
          dropzoneProps.onDrop(e)
        }}
      >
        {files.length < maxFiles && input}

        <div
          style={{
            backgroundColor: '#76B5FF',
            opacity: isHovering ? '70%' : '0%'
          }}
          className={classNames('absolute top-0 left-0 w-full h-full transition-opacity duration-200 ease-in-out z-3')}></div>

      </div>
    </>
  )
}

export default BackgroundDzCustomLayout