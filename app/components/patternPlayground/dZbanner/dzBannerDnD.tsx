import Dropzone from "react-dropzone-uploader"
import DzBannerInput from "./dzBannerInput"
import DzBannerLayout from "./dzBannerLayout"

const DropZoneTwo = ({ backgroundImage }: any) => {
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }: any, status: any) => {
    console.log(status, meta)
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
      // LayoutComponent={props => <DzBannerLayout {...props} backgroundImage={backgroundImage} />}
      classNames={{
        dropzone: 'dz2 overflow-hidden bg-transparent w-full rounded-xl'
      }}
      styles={{
        dropzone: {
          height: '100%',
          border: '4px solid transparent',
        },
        dropzoneActive: {
          opacity: '75%',
          border: '4px solid #007bff',
        }
      }}
    />
  )
}

export default DropZoneTwo