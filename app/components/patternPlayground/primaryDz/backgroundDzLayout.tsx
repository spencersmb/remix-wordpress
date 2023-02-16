import { classNames } from "@App/utils/appUtils";
import { useEffect, useRef, useState } from "react";

const BackgroundDzCustomLayout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles }, canvasRef, backgroundImage }: any) => {
  const uploadRef = useRef<any>(null)
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      {/* <div>
        {isHovering && <div>isHovering</div>}
        {!isHovering && <div>not isHovering</div>}
      </div> */}
      {/* {previews} */}
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

        {/* <div className={`${isHovering ? 'opacity-70 ' : 'opacity-0'} overlay transition-all bg-[#deebff] duration-150 absolute top-0 left-0 w-full h-full z-2`}>
        </div> */}



        {/* <motion.div
          data-testid='modalWrapper'
          key='modalContainer'
          className='absolute block rounded-md z-3'
          variants={variants}
          initial='initial'
          animate={files.length > 0 ? "loaded" : "initial"}
        >
          <label
            className='relative z-3'
            style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
            TEXT
          </label>
        </motion.div> */}

        {<div
          className={classNames(isHovering ? 'opacity-20' : 'opacity-100', 'transition-all ease-linear absolute top-0 left-0 w-full h-full z-1 before:bg-red-100')}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#4373F0',
            backgroundSize: '400px',
            height: '100%',
            width: '100%',
          }} />}
      </div>

      <div>
        <canvas
          id={'patternCanvas'}
          style={{
            display: 'none'
          }} ref={canvasRef}></canvas>

        {/* {savedImage && <img
          src={savedImage}
          alt="saved img"
          style={{
            zIndex: 1,
            height: '512px',
            width: '1024px',
          }} />} */}
      </div>


      {/* {files.length > 0 && submitButton} */}
    </>
  )
}

export default BackgroundDzCustomLayout