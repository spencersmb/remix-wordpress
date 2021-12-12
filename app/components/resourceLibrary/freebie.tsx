
/**
 * @Component Freebie
 *
 * Resource Item
 * Displays Name, Desc and Download
 *
 * Download open in modal is determined by requirement set in DB
 *
 * @param {IResourceFreebie} item
 */

const Freebie = (item: IResourceFreebie) => {
  console.log('item', item)
  
  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.freebie.excerpt}</p>
      <button>Download</button>
    </div>
  )
}

export default Freebie
