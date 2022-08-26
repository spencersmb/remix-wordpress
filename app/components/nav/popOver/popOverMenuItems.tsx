import CertificateCheckSvg from "@App/components/svgs/certificateCheck";
import ChatBoxQuoteSvg from "@App/components/svgs/chatboxQuote";
import GestureSvg from "@App/components/svgs/gestureSvg";
import HeartSvg from "@App/components/svgs/heartSvg";
import PaletteSvg from "@App/components/svgs/paletteSvg";
import TypeSvg from "@App/components/svgs/typeSvg";

/**
 * @Component PopOverMenuItems
 * 
 * Data for popover menu items
 * 
 * 
 * Not tested
 *
 */
const popOverMenuItems = [
  {
    name: 'Free Procreate Brushes',
    description: 'Lettering, Illustration and Painting sets',
    href: '/tuesday-makers',
    icon: {
      svg: <GestureSvg fill='currentColor' />,
      bgClass: 'group-hover:bg-sage-200',
      color: 'text-sage-600'
    },
  },
  {
    name: '100+ Procreate Color Swatches',
    description: 'Choose from tons of color options',
    href: '/tuesday-makers',
    icon: {
      svg: <PaletteSvg />,
      bgClass: 'group-hover:bg-warning-100',
      color: 'text-primary-500'
    },
  },
  {
    name: 'Font Files & Lettering assets',
    description: 'Get instant access to all the files',
    href: '/tuesday-makers',
    icon: {
      svg: <TypeSvg fill='currentColor' />,
      bgClass: 'group-hover:bg-navy-200',
      color: 'text-navy-700'
    },
  },
]

export const aboutMenuItems = [
  {
    name: 'Our Story',
    description: 'Tuesdays just got a little bit better.',
    href: '/about/our-story',
    icon: {
      svg: <ChatBoxQuoteSvg />,
      bgClass: 'group-hover:bg-primary-200',
      color: 'text-primary-500'
    },
  },
  {
    name: 'Licensing',
    description: 'Three clear options, we take the guesswork out of choosing a license.',
    href: '/licenses',
    icon: {
      svg: <CertificateCheckSvg />,
      bgClass: 'group-hover:bg-success-100',
      color: 'text-sage-500'
    },
  },
  {
    name: 'Things I love',
    description: 'Love my style and want to know where to get my favorites?!',
    href: '/about/things-i-love',
    icon: {
      svg: <HeartSvg />,
      bgClass: 'group-hover:bg-warning-100',
      color: 'text-yellow-400'
    },
  },
]

export default popOverMenuItems;