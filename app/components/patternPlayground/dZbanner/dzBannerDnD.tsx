import Dropzone from "react-dropzone-uploader"

const DropZoneTwo = () => {
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
      classNames={{
        dropzone: 'dz2 overflow-hidden bg-white w-full'
      }}
      styles={{
        dropzone: {
          minHeight: 200,
          maxHeight: 250
        }
      }}
    />
  )
}

export default DropZoneTwo