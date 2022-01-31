import { Link } from "remix"
import { findSkillLevel, splitProgramNameInTitle } from "~/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";

interface Props {
  post: IPost
}

function PostCardOne(props: Props) {
  const { post } = props
  const splitTitle = splitProgramNameInTitle(post.title)
  const skill = findSkillLevel(post.categories);
  console.log('post.title', post.title);
  // console.log('skill', skill);

  return (
    <div key={post.slug} className='card_conainter flex flex-col mb-16'>

      <div className='flex rounded-xl overflow-hidden transform transition-all shadow-none duration-500 translate-y-0 laptop:hover:shadow-et_4 laptop:hover:translate-y-[-5px] relative flex-1 bg-white'>
        <Link className='flex flex-col' to={`../${post.slug}`}>
          {/* CARD IMAGE */}
          <div>
            <img src="/images/pinterest-card.jpg" alt="Card Title" />
          </div>

          {/* CARD TEXT */}
          <div className='flex flex-col flex-1 pt-2 px-3 pb-7 text-center justify-center items-center desktop:px-9'>
            <div className='text-h3 text-primary-700 font-black uppercase desktop:text-4.5xl tracking-widest'>
              {/* {splitProgramNameInTitle(post.title)} */}
              <div className='mb-3'>{splitTitle.title}</div>
              {splitTitle.subTitle && <div className='font-light text-xl mb-3 tracking-wide'>{splitTitle.subTitle}</div>}
            </div>
            {skill
              ? <div>
                <div className='flex flex-row justify-center items-center text-warning-700'>
                  <div className='w-[24px] mr-1'><BarChartSvg fill={'var(--warning-700)'} /></div>
                  <div className='mr-1'>Skill Level:</div>
                  <div className='font-semibold capitalize'>{skill.name}</div>
                </div>
              </div>
              : null}
          </div>
        </Link>

      </div>

    </div>
  )
}

export default PostCardOne
