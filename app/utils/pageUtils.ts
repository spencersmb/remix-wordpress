import { defaultFeaturedImage, siteAuthor } from "@App/lib/wp/site"

interface StaticPageProps {
  title: string
  slug: string
  desc: string
}

/**
 * @function getStaticPageMeta
 * @tested - 6/7/2022
 * 
 * @description return the correct default Page Meta Data
 * 
 *
 **/
export const getStaticPageMeta = ({title, slug, desc }:StaticPageProps): IPage => {
  const date = new Date().getDate.toString()
  return {
    author: siteAuthor.author,
    content: '',
    date,
    title: `${title}`,
    id: '',
    slug,
    seo:{
      metaDesc: desc,
      opengraphModifiedTime: date,
      opengraphPublishedTime: date,
      readingTime: 3,
      title: `${title} - Every Tuesday`,
    },
    featuredImage: defaultFeaturedImage
  }
}

/**
 * @function hasClass
 * @tested - 6/7/2022
 * 
 * @description Returns true if the element has the class, false if it does not
 * 
 *
 **/
export const hasClass = (el: (HTMLElement | Element )| null, className: string) => {
  if(!el){
    return
  }
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

/**
 * @function addClass
 * @tested - 6/7/2022
 * 
 * @description Adds a class to the element
 * 
 *
 **/
export const addClass = (el: HTMLElement | Element | null, className: string) => {
  if(!el){
    return
  }
  const classList = className.split(' ');
  if (el.classList) el.classList.add(classList[0]);
  else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
  if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
};

/**
 * @function removeClass
 * @tested - 6/7/2022
 * 
 * @description Removes class from the element
 * 
 *
 **/
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

/**
 * @function toggleClass
 * @tested - 6/7/2022
 * 
 * @description Add/Remove a class from the element based on the boolean.
 * True to add the element, false to remove
 *
 **/
export const toggleClass = (el: HTMLElement, className: string, bool: boolean) => {
  if(bool) addClass(el, className);
  else removeClass(el, className);
};