const DzBannerInput = ({ accept, onFiles, files, getFilesFromEvent }: any) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label
      className="hidden"
      style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
      {text}
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        onChange={e => {
          getFilesFromEvent(e).then((chosenFiles: any) => {
            onFiles(chosenFiles)
          })
        }}
      />
    </label>
  )
}

export default DzBannerInput