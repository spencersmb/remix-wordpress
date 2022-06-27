import { renderUseSimpleTabsProviderUi } from "@TestUtils/providerUtils"
import LicenseTabContent from "../licenseTabContent"

describe('LicenseTabContent Test and be unselected', () => {

  it('Should have correct license Type', () => {
    const { getByText } = renderUseSimpleTabsProviderUi(<LicenseTabContent type="standard" />, {
      providerProps: {
        selectedTab: "",
        tabs: []
      }
    })
    const standard = getByText('standard')
    const pill = standard.nextSibling
    expect(getByText('Type')).toBeVisible()
    expect(standard).toBeVisible()
    expect(pill).toBeVisible()

    expect(standard).toHaveClass('text-grey-500')
    expect(pill).toHaveClass('bg-grey-300')
  })

  it('Should be selected', () => {
    const { getByText } = renderUseSimpleTabsProviderUi(<LicenseTabContent type="standard" />, {
      providerProps: {
        selectedTab: "standard",
        tabs: []
      }
    })
    const standard = getByText('standard')
    const pill = standard.nextSibling

    expect(standard).toHaveClass('text-sage-800')
    expect(pill).toHaveClass('bg-success-500')
  })
})