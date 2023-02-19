import React, { useEffect, useRef } from 'react'
import usePatternPlayground, { starterBgUrl } from '../usePatternProvider';
//@ts-ignore
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import Dropzone from 'react-dropzone-uploader';
import BackgroundDzCustomLayout from './backgroundDzLayout';
import BackgroundDzCustomInput from './backgroundDzCustomInput';
import { classNames } from '@App/utils/appUtils';

interface Props { }

function DzPattern(props: Props) {
  const { } = props

  const { state: { imageCache, backgroundImage, patternType, touched, patternRange }, setNewImage, canvasRef, setBackgroundImage, getBase64FromUrl, userTouchedCanvas } = usePatternPlayground()
  const loadedRef = useRef(false)

  const [loadedState, setLoadedState] = React.useState(false)

  useEffect(() => {
    console.log('imageCache', imageCache)

    switch (patternType) {
      case 0:
        if (imageCache[0]) {
          setBackgroundImage(imageCache[0])
          return
        }
        break;

      case 1:
        if (imageCache[1]) {
          setBackgroundImage(imageCache[1])
          return
        }
        break;

      case 2:
        if (imageCache[2]) {
          setBackgroundImage(imageCache[2])
          return
        }
        break;

      default:
        if (imageCache[0]) {
          setBackgroundImage(imageCache[0])
          return
        }
        break;
    }

  }, [imageCache, patternType, setBackgroundImage]);

  useEffect(() => {

    getBase64FromUrl(starterBgUrl).catch(console.error).then((result: any) => {
      const loadedImage = new Image();
      loadedImage.src = result
      setNewImage({ image: loadedImage })
    })

  }, [getBase64FromUrl, setNewImage])

  useEffect(() => {
    setLoadedState(true)
  }, [])

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = (data: any, status: any) => {
    console.log('status', status)
    // console.log('meta', data)

    if (status === 'getting_upload_params') {
      // if (status === 'done') {
      const file = data.file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const loadedImage = new Image();
        loadedImage.src = e.target.result;
        loadedImage.onload = () => {
          setNewImage({ image: loadedImage })

          if (!touched) {
            userTouchedCanvas()
          }
          // setImage(loadedImage)
        };
      };

      reader.readAsDataURL(file);
      // }
    }

  }

  const getFilesFromEvent = (e: any) => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then((chosenFiles: any) => {
        resolve(chosenFiles.map((f: any) => f.fileObject))
      })
    })
  }

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.data))
    allFiles.forEach((f: any) => f.remove())
  }
  console.log('loadedRef.current', loadedRef.current)
  return (
    <div className='relative h-full'>
      <div className={classNames(!touched && !loadedState ? 'opacity-0' : 'opacity-100',
        'w-full h-full z-1 transition-all ease-in-out duration-600 relative')}>
        <div
          className={classNames('absolute top-0 left-0 w-full h-full z-1')}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            // backgroundColor: '#4373F0',
            backgroundSize: `${patternRange[0]}px`,
            height: '100%',
            width: '100%',
          }} />

      </div>
      <div className='absolute top-0 left-0 w-full h-full z-2'>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          LayoutComponent={props => <BackgroundDzCustomLayout {...props}
          />}
          onSubmit={handleSubmit}
          classNames={{
            dropzone: 'upload transition-all duration-300 ease-in-out w-full dzBackgroundHeight',
          }}
          accept="image/*"
          inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drop Image')}
          InputComponent={BackgroundDzCustomInput}
          //@ts-ignore
          getFilesFromEvent={getFilesFromEvent}
          styles={{
            dropzone: { minHeight: 600, maxHeight: 1250, overflow: 'hidden', position: 'relative' },
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA', opacity: '80%' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
            dropzoneActive: { opacity: '70%' }
          }}
        />
      </div>

      <div>
        <canvas
          id={'patternCanvas'}
          style={{
            display: 'none'
          }} ref={canvasRef}></canvas>
      </div>
    </div>
  )
}

export default DzPattern
