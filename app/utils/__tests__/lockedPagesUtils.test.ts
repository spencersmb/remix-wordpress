import { lockedPageEnumSlugs } from "@App/enums/lockedPages"
import { mockMetaData } from "@TestUtils/mock-data/posts"
import { getlockedPageMetaTags, getLockedPageRedirectLogoutPath, getLockedPageRedirectMembersPath } from "../lockedPagesUtils"

describe('Utils: LockedPages', () => {
  it('Should get metaData tags for loggedout LockedPage based on slug and show page title', () => {

    const response = getlockedPageMetaTags({
      data:{},
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{
        slug: lockedPageEnumSlugs.beautifulLettering
      },
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    })

    expect(response.title)
    .toEqual('Beautiful Lettering Bonus Downloads - Every Tuesday')
  })
  it('Should get metaData tags for loggedIn LockedPage based on slug and show page title', () => {

    const response = getlockedPageMetaTags({
      data:{},
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{
        slug: lockedPageEnumSlugs.beautifulLettering
      },
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    }, {membersPage: true})

    expect(response.title)
    .toBe('Beautiful Lettering Bonus Downloads Members Area - Every Tuesday')
  })
  it('Should return 404 title for metaTag with no Data', () => {

    const response = getlockedPageMetaTags({
      data:null,
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{
        slug: lockedPageEnumSlugs.beautifulLettering
      },
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    })

    expect(response.title)
    .toBe('404')
  })
  it('Should return 404 title for metaTag with no slug in the DB', () => {

    const response = getlockedPageMetaTags({
      data:null,
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{
        slug: 'randomSlug'
      },
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    })

    expect(response.title)
    .toBe('404')
  })
  it('Should return 404 title for metaTag with no slug in the params object', () => {

    const response = getlockedPageMetaTags({
      data:null,
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{},
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    })

    expect(response.title)
    .toBe('404')
  })
  it('Should return the correct redirect path', ()=>{
    const response = getLockedPageRedirectMembersPath(lockedPageEnumSlugs.beautifulLettering)
    expect(response).toBe('/class-downloads/bl/members')
  })
  it('Should return the correct logout path', ()=>{
    const response = getLockedPageRedirectLogoutPath(lockedPageEnumSlugs.beautifulLettering)
    expect(response).toBe('/class-downloads/bl')
  })
})