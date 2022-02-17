
interface StaticPageProps {
  title: string
  slug: string
  desc: string
}

// TODO - get correct DEFAULT URL
export const defaultFeaturedImage:IFeaturedImage = {
  altText: 'Every Tuesday. The ultimate resource for Procreate digital brushes and online learning.',
  id: '311',
  sizes:'',
  srcSet: '',
  mediaDetails:{
    sizes:[]
  },
  sourceUrl: 'https://res.cloudinary.com/every-tuesday/images/v1633831046/peeling-sticker-lettering-effect-procreate/peeling-sticker-lettering-effect-procreate-jpg?_i=AA'
}
export const getStaticPageMeta = ({title, slug, desc }:StaticPageProps): IPage => {
  const date = new Date().getDate.toString()
  return {
    author: {
      avatar:{
        height: 96,
        width: 96,
        url: 'https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g'
      },
      id: 'dXNlcjox',
      slug: 'teelac',
      name: 'Teela'
    },
    content: '',
    date,
    title: `${title} - Every Tuesday`,
    id: '',
    slug,
    seo:{
      metaDesc: desc,
      opengraphModifiedTime: date,
      opengraphPublishedTime: date,
      readingTime: '3min',
      title,
    },
    featuredImage: defaultFeaturedImage
  }
}

export const hasClass = (el: (HTMLElement | Element )| null, className: string) => {
  if(!el){
    return
  }
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};
export const addClass = (el: HTMLElement | Element | null, className: string) => {
  if(!el){
    return
  }
  const classList = className.split(' ');
  if (el.classList) el.classList.add(classList[0]);
  else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
  if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
};
export const removeClass = (el: HTMLElement | null, className: string) => {
  if(!el){
    return
  }
  const classList = className.split(' ');
  if (el.classList) el.classList.remove(classList[0]);
  else if(hasClass(el, classList[0])) {
    const reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
  if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
};
export const toggleClass = (el: HTMLElement, className: string, bool: boolean) => {
  if(bool) addClass(el, className);
  else removeClass(el, className);
};