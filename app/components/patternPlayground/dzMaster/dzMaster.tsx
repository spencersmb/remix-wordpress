import usePatternPlayground from '../usePatternProvider';
import Dropzone from 'react-dropzone-uploader';
import BackgroundDzCustomLayout from './dzMasterLayout';
import BackgroundDzCustomInput from './dzMasterCustomInput';
import { consoleHelper } from '@App/utils/windowUtils';
//@ts-ignore
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
interface Props { }

function DzMaster(props: Props) {
  const { state: { touched }, setNewImage, userTouchedCanvas } = usePatternPlayground()

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = (data: any, status: any) => {
    consoleHelper('handleChangeStatus status', status, 'dzMaster.tsx', {
      bg: '#3E74FF',
      text: '#EAF0FF'

    })

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

  const getFilesFromEvent = (e: any): Promise<File[]> => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then((chosenFiles: any) => {
        resolve(chosenFiles.map((f: any) => f.fileObject))
      })
    })
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full z-3'>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={props => <BackgroundDzCustomLayout {...props}
        />}
        classNames={{
          dropzone: 'upload transition-all duration-300 ease-in-out w-full dzBackgroundHeight',
        }}
        getFilesFromEvent={getFilesFromEvent}
        accept="image/*"
        inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drop Image')}
        InputComponent={BackgroundDzCustomInput}
        styles={{
          dropzone: { minHeight: 600, maxHeight: 1250, overflow: 'hidden', position: 'relative' },
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA', opacity: '80%' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          dropzoneActive: { opacity: '70%' }
        }}
      />
    </div>
  )
}

export default DzMaster
