import React from 'react'

/**
 * @component - GridItem
 * @tested - 5/30/2022
 */
function GridItem(props: IGridItem) {
  const { title, downloadLink, excerpt, tags, image } = props

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    window.open(downloadLink);
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
