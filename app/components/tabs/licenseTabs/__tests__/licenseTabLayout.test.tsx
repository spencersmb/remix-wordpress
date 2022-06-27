import CloseSvg from "@App/components/svgs/closeSvg";
import { LicenseEnum } from "@App/enums/products";
import { renderUi } from "@TestUtils/renderUtils"
import type { LicenseTabContentProps } from "../licenseTabLayout";
import LicenseTabLayout from "../licenseTabLayout"

describe('LicenseTabContent Test and be unselected', () => {
  const setup = (props: LicenseTabContentProps) => {
    return renderUi(<LicenseTabLayout  {...props} />)
  }
  const defaultSetup = {
    type: LicenseEnum.STANDARD,
    requirements: [
      {
        icon: <CloseSvg stroke={'#000000'} data-testid="icon" />,
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <CloseSvg stroke={'#000000'} />,
        title: 'Title 2',
        description: '2nd description'
      },
    ],
    description: 'Description test',
    usedFor: [
      'usedFor test',
      'usedFor test 2',
    ],
    cannotBeUsedFor: [
      'cannotBeUsedFor test',
      'cannotBeUsedFor test 2',
    ]
  }
  it('Should have 2 requirements with correct content', () => {
    const { getByTestId } = setup(defaultSetup)
    const requirements = getByTestId('requirements')
    const icon = getByTestId('icon')
    const firstReq = requirements.children[0]
    expect(requirements.children.length).toBe(2)

    // Title
    expect(firstReq).toHaveTextContent('One license per computer')

    // Description
    expect(firstReq).toHaveTextContent('If you have two computers, you need two licenses')

    // icon
    expect(icon).toBeInTheDocument()
  })

  it('Should have correct description', () => {
    const { getByTestId } = setup(defaultSetup)
    const description = getByTestId('description')
    expect(description).toHaveTextContent('Description test')
  })

  it('Should have correct usedFor Items lenght and content', () => {
    const { getByText } = setup(defaultSetup)
    const usedFor = getByText('Can be used for:')
    if (!usedFor) {
      throw new Error('usedFor not found')
    }
    const itemsContainer = usedFor.nextElementSibling
    expect(itemsContainer?.children.length).toBe(2)
    expect(itemsContainer).toHaveTextContent('usedFor test')
  })

  it('Should have correct CannotUsedFor Items lenght and content', () => {
    const { getByText } = setup(defaultSetup)
    const cannotusedFor = getByText('Cannot')
    if (!cannotusedFor) {
      throw new Error('cannotusedFor not found')
    }
    const itemsContainer = cannotusedFor.parentElement?.nextElementSibling

    expect(itemsContainer?.children.length).toBe(2)
    expect(itemsContainer).toHaveTextContent('cannotBeUsedFor test 2')
  })

})