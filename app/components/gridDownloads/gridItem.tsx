import React from 'react'

function GridItem(props: IGridItem) {
  const { title, downloadLink, excerpt, tags, image } = props

  function normalDownload() {
    window.open(downloadLink);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    normalDownload()
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <button onClick={handleButtonClick}>Download</button>
    </div>
  )
}

export default GridItem
