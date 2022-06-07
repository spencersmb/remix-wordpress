import { defaultFeaturedImage, siteAuthor } from "@App/lib/wp/site"
import { addClass, getStaticPageMeta, hasClass, removeClass, toggleClass } from "../pageUtils"

describe('Utils: PageUtils', () => {

  it('getStaticPageMeta() should return the correct default Page Meta Data', () => {
    const testData = {
      title: 'Test title',
      desc: 'Test description',
      slug: 'test-slug',
    }
    const metadata = getStaticPageMeta(testData)
    const date = new Date().getDate.toString()
    const response: IPage = {
      author:siteAuthor.author,
      content:'',
      date: new Date().getDate.toString(),
      title: `Test title - Every Tuesday`,
      id:'',
      slug:'test-slug',
      seo:{
        metaDesc: testData.desc,
        opengraphModifiedTime: date,
        opengraphPublishedTime: date,
        readingTime: 3,
        title: testData.title,
      },
      featuredImage: defaultFeaturedImage
    }
    expect(metadata).toEqual(response)
  })

  it('Should return true if it has the class', () => {
    const el = document.createElement('div')
    el.className = 'test-class'
    expect(hasClass(el, 'test-class')).toBe(true)
  })

  it('Should return false if it does not have the class', () => {
    const el = document.createElement('div')
    expect(hasClass(el, 'test-class')).toBe(false)
  })

  it('Should add class to the Element', () => {
    const el = document.createElement('div')
    el.className = 'test-class'
    addClass(el, 'test-class-2')
    expect(el.className).toBe('test-class test-class-2')
  })

  it('Should remove the class from the Element', () => {
    const el = document.createElement('div')
    el.className = 'test-class blog'
    removeClass(el, 'test-class')
    expect(el.className).toBe('blog')
  })

  it('Should toggle the class on the element', () => {
    const el = document.createElement('div')
    el.className = 'test-class toggle'
    // if bool is true, it should add the class
    toggleClass(el, 'toggle', false)
    expect(el.className).toBe('test-class')

    toggleClass(el, 'toggle', true)
    expect(el.className).toBe('test-class toggle')
  })

})