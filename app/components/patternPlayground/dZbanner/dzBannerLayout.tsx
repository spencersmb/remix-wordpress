const DzBannerLayout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: any) => {
  return (
    <div>
      {/* {previews} */}

      <div {...dropzoneProps}>
        {files.length < maxFiles && input}
      </div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  )
}

export default DzBannerLayout