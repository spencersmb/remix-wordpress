import { ckFormIds } from "@App/lib/convertKit/formIds"
import { mockResourceItemRaw, mockResourceLibraryItem } from "@TestUtils/mock-data/resourceLibrary"
import { flattenResourceData, getCKFormId, mapResourceData } from "../resourceLibraryUtils"

describe('Utils: Resource Library', () => {
  it('getCKFormId() Should get CK default Form Id', () => {
    expect(getCKFormId(null)).toBe(ckFormIds.resourceLibrary.landingPage)
  })
  
  it('getCKFormId() Should get CK Form Id', () => {
    expect(getCKFormId('footer')).toBe(ckFormIds.resourceLibrary.footer)
  })

  it('mapResourceData() Should format the POST properly', () => {
    expect(mapResourceData(mockResourceItemRaw)).toEqual(mockResourceLibraryItem)
  })

  it('flattenAllCourses() Should flatten all posts and return correct array amount', () => {
    const courses = {
      edges: [
        {node: {
          ...mockResourceItemRaw
        }}
      ]
    }
    const result = flattenResourceData(courses)
    if(result && Array.isArray(result)){
      expect(result.length).toEqual(1)
    }
  })
})
