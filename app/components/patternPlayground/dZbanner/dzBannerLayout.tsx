const DzBannerLayout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: any) => {
  return (
    <div {...dropzoneProps}>
      {files.length < maxFiles && input}
    </div>
  )
}

export default DzBannerLayout