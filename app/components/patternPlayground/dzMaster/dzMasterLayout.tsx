import { useRef } from "react";

const BackgroundDzCustomLayout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: any) => {
  const uploadRef = useRef<any>(null)
  return (
    <>
      <div
        ref={uploadRef}
        {...dropzoneProps}
      >
        {files.length < maxFiles && input}

      </div>
    </>
  )
}

export default BackgroundDzCustomLayout