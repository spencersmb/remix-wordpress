import { useFetcher } from "remix";
import MakersSignUpForm from "../forms/makersSignUpForm";
import IPad from '../../../public/images/makers-ipad.png'

const MakersFooterSignUp = () => {
  const tuesdayMakersSignUp = useFetcher();

  return (
    <div className="bg-primary-600 rounded-2.5xl shadow-et_4 mb-[7rem] mx-auto py-9 px-9 max-w-[486px] tablet:max-w-[630px] tablet:pb-14 laptop:max-w-none desktop:px-20 desktop:py-14 relative">

      {/* CONTENT */}
      <div className="flex flex-col mt-48 ml-auto text-primary-50 max-w-[478px] mx-auto tablet:mt-96 laptop:mr-0 laptop:max-w-[628px] mb-[10px] laptop:mt-0 relative">

        {/* IMAGE */}
        <div className="absolute w-full top-[-250px] left-[0px] max-w-[600px] tablet:top-[-400px] tablet:left-[20px] laptop:max-w-[530px] laptop:top-[-20px] laptop:left-[-530px] desktop:left-[-630px] desktop:top-[-69px] desktop:max-w-[600px] transform rotate-[349deg]">
          <img src={`/images/makers-ipad.png`} alt="EveryTuesday Makers Ipad Sign Up" width={`1000`} height={`733`} />
        </div>
        <h4 className="font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2 pb-4">
          Grab 50+ Design and Lettering Files!
        </h4>
        <p className="text-lg pb-11">
          When you join the Tuesday Makers, you’ll receive special offers on courses + products and gain access to the Resource Library, stocked with over 50 design and lettering files!
        </p>
        <div>
          <MakersSignUpForm
            Form={tuesdayMakersSignUp.Form}
            type={tuesdayMakersSignUp.type}
            state={tuesdayMakersSignUp.state}
            data={tuesdayMakersSignUp.data}
          />
        </div>
      </div>

    </div>
  )
}

export default MakersFooterSignUp