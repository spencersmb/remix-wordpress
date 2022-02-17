import { motion } from "framer-motion";
import { Link } from "remix"
import { createThumbnailImage, findSkillLevel, getImageSizeUrl, splitProgramNameInTitle } from "~/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";

interface Props {
  post: IPost
}

function PostCardOne(props: Props) {
  // const { post } = props
  // const splitTitle = splitProgramNameInTitle(post.title)
  // const skill = findSkillLevel(post.categories);
  // const featuredImage = getImageSizeUrl(post.featuredImage, 'headless_ipad')
  return null
  // return (
  //   <motion.div
  //     key={post.slug}
  //     initial={{
  //       opacity: 0,

  //     }}
  //     animate={{
  //       opacity: 1,
  //       transition: {
  //         delay: .3,
  //       }
  //     }}
  //     exit={{
  //       opacity: 0,
  //       transition: {
  //         duration: 0
  //       }
  //     }}
  //     className='card_conainter flex flex-col mb-8 col-start-2 col-span-2 tablet:col-start-auto tablet:col-auto z-20 desktop:mb-16'>

  //     <div className='flex rounded-xl overflow-hidden transform transition-all shadow-md duration-500 translate-y-0 laptop:hover:shadow-et_4 laptop:hover:translate-y-[-5px] relative flex-1 bg-white'>
  //       <Link className='flex flex-col' to={`../${post.slug}`}>
  //         {/* CARD IMAGE */}
  //         <div className="relative">
  //           {createThumbnailImage(post.tutorialManager, featuredImage, post.title, true)}
  //         </div>

  //         {/* CARD TEXT */}
  //         <div className='flex flex-col flex-1 pt-2 px-3 pb-7 text-center justify-center items-center desktop:px-9'>
  //           <div className='text-h3 tablet:text-lg text-primary-700 font-black uppercase desktop:text-4.5xl tracking-widest'>
  //             <div className='mb-3'>{splitTitle.title}</div>
  //             {splitTitle.subTitle && <div className='font-light text-xl tablet:text-lg desktop:text-xl mb-3 tracking-wide'>{splitTitle.subTitle}</div>}
  //           </div>
  //           {skill
  //             ? <div>
  //               <div className='flex flex-row justify-center items-center text-warning-700'>
  //                 <div className='w-[24px] mr-1'><BarChartSvg fill={'var(--warning-700)'} /></div>
  //                 <div className='mr-1'>Skill Level:</div>
  //                 <div className='font-semibold capitalize'>{skill.name}</div>
  //               </div>
  //             </div>
  //             : null}
  //         </div>
  //       </Link>

  //     </div>

  //   </motion.div>
  // )
}

export default PostCardOne
