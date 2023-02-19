import Dropzone from "react-dropzone-uploader"
import usePatternPlayground from "../usePatternProvider"
import DzBannerInput from "./dzBannerInput"
import DzBannerLayout from "./dzBannerLayout"

const DropZoneTwo = () => {
  const { state: { touched }, setNewImage, userTouchedCanvas } = usePatternPlayground()

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = (data: any, status: any) => {
    // console.log('status', status)
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
        };
      };

      reader.readAsDataURL(file);
    }

  }

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta))
    allFiles.forEach((f: any) => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      InputComponent={DzBannerInput}
      accept="image/*"
      LayoutComponent={props => <DzBannerLayout {...props} />}
      inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drop Image')}
      classNames={{
        dropzone: 'dz2 overflow-hidden bg-transparent w-full rounded-xl relative'
      }}
      styles={{
        dropzone: {
          height: '100%',
          border: '4px solid transparent',
        },
        dropzoneActive: {
          opacity: '90%',
          border: '4px solid #007bff',
        },
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA', opacity: '90%' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  )
}

export default DropZoneTwo