import useSite from '@App/hooks/useSite'
import { classNames } from '@App/utils/appUtils'
import React from 'react'
import FacebookSvg from '../svgs/social/facebookSvg'
import InstagramSvg from '../svgs/social/instagramSvg'
import PinterestSvg from '../svgs/social/pinterestSvg'
import YoutubeSvg from '../svgs/social/youtubeSvg'

interface Props {
  svgColor?: string
  ulClassName?: string
}

/**
 * 
 * @component SocialLinksList1
 * @tested - 07/14/2022 
 */
function SocialLinksList1({ svgColor, ulClassName }: Props) {
  const { state: { metadata } } = useSite()
  const socialkeys = Object.keys(metadata.social)

  return (
    <ul data-testid="social-links-ul" className={classNames(ulClassName ? ulClassName : '', 'flex flex-row')}>
      {socialkeys.map(key => {
        switch (key) {
          case 'youtube':
            return (
              <li key={key} className='flex'>
                <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                  <YoutubeSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                  <span className="sr-only">Every Tuesday on Youtube</span>
                </a>
              </li>
            )
          case 'facebook':
            return (
              <li key={key} className='flex pl-9'>
                <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                  <FacebookSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                  <span className="sr-only">Every Tuesday on Facebook</span>
                </a>
              </li>
            )
          case 'instagram':
            return (
              <li key={key} className='flex pl-9'>
                <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                  <InstagramSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                  <span className="sr-only">Every Tuesday on Instagram</span>
                </a>
              </li>
            )
          case 'pinterest':
            return (
              <li key={key} className='flex pl-9'>
                <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                  <PinterestSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                  <span className="sr-only">Every Tuesday on Pinterest</span>
                </a>
              </li>
            )
          default:
            return null
        }
      })}
    </ul>
  )
}

export default SocialLinksList1
