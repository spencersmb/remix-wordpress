import { Link } from "remix";
import { LicenseEnum } from "~/enums/products";
import { getLicense } from "~/utils/posts";
import GumroadBtn from "../buttons/gumroadBtn";

interface IProps {
  closeModal: () => void
  download_link: string
  product: IProduct | null
}
const LicenseAgreementPopUp = ({ download_link, product, closeModal }: IProps) => {
  const download = () => {
    closeModal();
    setTimeout(() => {
      window.open(download_link);
    }, 300)
  }
  if (!product) {
    return <div>
      no product found
    </div>
  }

  const extendedLicense = getLicense(product.details.licences, LicenseEnum.EXTENDED)

  return (
    <div className={'text-black'}>
      <div><span onClick={closeModal} >CLOSE</span></div>
      <h2>Sample Freebie</h2>
      <h3>{product.title}</h3>
      <p>This item requires an extended licence be purchased if you plan on using it in a commercial product of any kind.</p>
      <div>
        <button onClick={download}>Free Download</button>
        {(product.details.type === 'gumroad' && extendedLicense) && <GumroadBtn price={extendedLicense.price} url={extendedLicense.url} />}
      </div>
    </div>
  )
}

export default LicenseAgreementPopUp
