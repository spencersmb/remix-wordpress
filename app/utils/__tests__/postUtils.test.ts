import { LicenseEnum } from "@App/enums/products"
import { mockPostCommentRaw } from "@TestUtils/mock-data/comments"
import { mockCategories_skill_adv, mockCategories_skill_int, mockCategories_skill_none, mockPostRaw, mockPostRawFormatted } from "@TestUtils/mock-data/posts"
import { mockExtendedLicense, mockServerLicense, mockStandardLicense } from "@TestUtils/mock-data/products"
import { checkTitleForBrackets, filterNodeFromTags, findSkillLevel, findString, flattenAllPosts, formatDate, getLicense, mapPostData, parseComment, parseStringForSpecialCharacters, rearrangeLicenses, splitProgramNameInTitle } from "../posts"

describe('Utils: Post Utilities', () => {

  it('getLicense() should return null', () => {
    const license = getLicense(null, LicenseEnum.EXTENDED)
    expect(license).toBeNull()
  })

  it('getLicense() should return null', () => {
    const license = getLicense([
      mockServerLicense,
      mockStandardLicense
    ], LicenseEnum.EXTENDED)
    expect(license).toBeNull()
  })

  it('getLicense() should return Extended license', () => {
    const license = getLicense([
      mockExtendedLicense,
      mockServerLicense,
      mockStandardLicense
    ], LicenseEnum.EXTENDED)
    expect(license).toMatchObject(mockExtendedLicense)
  })

  it('findSkillLevel() Should return undefined', () => {
    const resultNone = findSkillLevel([
      ...mockCategories_skill_none
    ])
    expect(resultNone).toBeFalsy()
  })

  it('findSkillLevel() Should return default cat', () => {
    const resultDefault = findSkillLevel([
      ...mockCategories_skill_none,
      {
        databaseId: 9,
        id: "dGVybTo5",
        name: "Tutorials",
        slug: "tutorials"
      }
    ])
    expect(resultDefault).toMatchObject({
      name: 'beginner',
      databaseId: 0,
      slug: 'beginner',
      id: 'beginner',
    })
  })

  it('findSkillLevel() Should find highest skill level and return that string', () => {
    const resultInt = findSkillLevel(mockCategories_skill_int)
    expect(resultInt).toMatchObject({
      databaseId: 2447,
      id: "dGVybToyNDQ3",
      name: "Intermediate",
      slug: "intermediate"
    })

    const resultAdv = findSkillLevel(mockCategories_skill_adv)
    expect(resultAdv).toMatchObject({
      databaseId: 2447,
      id: "dGVybToyNDQ3",
      name: "Advanced",
      slug: "advanced"
    })
  })

  it('findString() Should find the string in an array and return it', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const result = findString('c', array)
    expect(result).toBe('c')

    const noResult = findString('z', array)
    expect(noResult).toBeFalsy()
  })

  it('splitProgramNameInTitle() Should remove and split Procreate from titles', () => {
    const title = 'How to Make a Seamless Pattern Brush in Procreate'
    const result = splitProgramNameInTitle(title)
    expect(result).toMatchObject({
      subTitle: 'in Procreate',
      title: 'How to Make a Seamless Pattern Brush ',
    })
  })

  it('checkTitleForBrackets() Should remove brackets from string', () => {
    const title = 'Affordable [and Free!] Stock Photo Sites'
    const result = checkTitleForBrackets(title)
    expect(result.title).toEqual('Affordable  Stock Photo Sites')
  })

  it('parseStringForSpecialCharacters() Should remove special characters', () => {
    const result = parseStringForSpecialCharacters('<This is a "test" & string + guide>')
    expect(result).toBe('This is a test  string  guide')
  })

  it('formatDate() Should return a readable date string', () => {
    const date = "2016-11-10T01:13:36"
    const result = formatDate(date)
    expect(result).toBe('November 10, 2016')
  })

  it('parseComment() Should format the comment object from WP', () => {
    const parsed = parseComment(mockPostCommentRaw)
    expect(parsed.author).toHaveProperty('name')
    if(parsed.replies){
      expect(parsed.replies.length).toBe(1)
      expect(Array.isArray(parsed.replies)).toBe(true)
    }
  })

  it('mapPostData() Should format the POST properly', () => {
    expect(mapPostData(mockPostRaw)).toEqual(mockPostRawFormatted)
  })

  it('rearrangeLicenses() Should rearrange 3 licenses in correct order', () => {
    const licenseOrder1 = rearrangeLicenses([
      mockServerLicense,
      mockExtendedLicense,
      mockStandardLicense
    ])
    expect(licenseOrder1.length).toBe(3)
    expect(licenseOrder1[0].licenseType).toBe(LicenseEnum.STANDARD)
    expect(licenseOrder1[1].licenseType).toBe(LicenseEnum.EXTENDED)
    expect(licenseOrder1[2].licenseType).toBe(LicenseEnum.SERVER)

    // Order 2
    const licenseOrder2 = rearrangeLicenses([
      mockExtendedLicense,
      mockServerLicense,
      mockStandardLicense
    ])
    expect(licenseOrder2.length).toBe(3)
    expect(licenseOrder2[0].licenseType).toBe(LicenseEnum.STANDARD)
    expect(licenseOrder2[1].licenseType).toBe(LicenseEnum.EXTENDED)
    expect(licenseOrder2[2].licenseType).toBe(LicenseEnum.SERVER)

    // Order 3
    const licenseOrder3 = rearrangeLicenses([
      mockStandardLicense,
      mockServerLicense,
      mockExtendedLicense,
    ])
    
    expect(licenseOrder3.length).toBe(3)
    expect(licenseOrder3[0].licenseType).toBe(LicenseEnum.STANDARD)
    expect(licenseOrder3[1].licenseType).toBe(LicenseEnum.EXTENDED)
    expect(licenseOrder3[2].licenseType).toBe(LicenseEnum.SERVER)

    // Order 4
    const licenseOrder4 = rearrangeLicenses([
      mockStandardLicense,
      mockServerLicense,
      mockExtendedLicense,
    ])
    
    expect(licenseOrder4.length).toBe(3)
    expect(licenseOrder4[0].licenseType).toBe(LicenseEnum.STANDARD)
    expect(licenseOrder4[1].licenseType).toBe(LicenseEnum.EXTENDED)
    expect(licenseOrder4[2].licenseType).toBe(LicenseEnum.SERVER)
  })

  it('rearrangeLicenses() Should rearrange 2 licenses in correct order', () => {
    const licenses = rearrangeLicenses([
      mockExtendedLicense,
      mockStandardLicense
    ])
    expect(licenses.length).toBe(2)
    expect(licenses[0].licenseType).toBe(LicenseEnum.STANDARD)
    expect(licenses[1].licenseType).toBe(LicenseEnum.EXTENDED)
  })

  it('filterNodeFromTags() Should formate the tags from WP', () => {
    const raw = filterNodeFromTags(mockPostRaw.tags)
    const answer = [
       {
          count: 1,
          name: 'Tag 1',
          slug: 'tag-1'
        },
        {
          count: 1,
          name: 'Tag 2',
          slug: 'tag-2'
        }
    ]

    expect(raw.length).toEqual(2)
    expect(raw).toEqual(answer)
  })

  it('flattenAllPosts() Should return false with empty posts object', () => {
    const posts = {}
    const result = flattenAllPosts(posts)
    expect(result).toEqual(false)
  })

  it('flattenAllPosts() Should flatten all posts and return correct array amount', () => {
    const posts = {
      edges: [
        {node: {
          ...mockPostRaw
        }}
      ]
    }
    const result = flattenAllPosts(posts)
    if(result){
      expect(result.length).toEqual(1)
    }
  })
})