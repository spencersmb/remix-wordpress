import SimpleTabsProvider from "@App/components/tabs/SimpleTabs/simpleTabs"
import PillBase from '@App/components/buttons/pillBase'
import BarChartSvg from '@App/components/svgs/barChartSvg'
import GridSvg from '@App/components/svgs/gridSvg'
import SimpleTabsHeader from '@App/components/tabs/SimpleTabs/simpleTabsHeader'
import TabContent from '@App/components/tabs/SimpleTabs/tabContent'
import TabLabel from './tabLabel'
import Tab from "@App/components/tabs/SimpleTabs/tab"

interface Props {
  catClick: (cat: string) => () => void
  category: string
}

const categories = [
  {
    slug: 'all',
    name: 'View All',
  },
  {
    slug: 'procreate',
    name: 'Procreate',
  },
  {
    slug: 'hand-drawn',
    name: 'Hand Drawn',
  },
  {
    slug: 'photoshop-2',
    name: 'Photoshop',
  },
  {
    slug: 'hand-lettering-2',
    name: 'Hand Lettering',
  },
  {
    slug: 'illustration',
    name: 'Illustration',
  },
  {
    slug: 'fonts-2',
    name: 'Font Making',
  },
  {
    slug: 'freebies',
    name: 'Freebies',
  },
  {
    slug: 'resources',
    name: 'Tuesday Makers',
  },
  {
    slug: 'textures',
    name: 'Textures',
  },
  {
    slug: 'watercolor',
    name: 'Watercolor',
  },
]

const skillLevels = [
  {
    slug: 'beginner',
    name: 'Beginner',
  },
  {
    slug: 'intermediate',
    name: 'Intermediate',
  },
  {
    slug: 'advanced',
    name: 'Advanced',
  },
]

/**
 * Component not used in JEST tests
 * @param props 
 * @returns 
 */
function BlogCategoryTabs(props: Props) {
  const { catClick, category } = props

  return (
    <SimpleTabsProvider>

      <SimpleTabsHeader className="flex flex-row col-span-2 col-start-2 mb-8 tablet:col-start-2 tablet:col-span-12 laptop:col-start-2 laptop:col-span-12">
        <Tab
          name={'topics'} className="flex-1 first:pr-3 tablet:first:pr-7 tablet:flex-none">
          <TabLabel
            Svg={GridSvg}
            iconFillType={'stroke'}
            id="topics"
            text="Search by category" />
        </Tab>
        <Tab name={'difficulty'} className="flex-1 tablet:flex-none">
          <TabLabel
            Svg={BarChartSvg}
            id="difficulty"
            text="Search by difficulty" />
        </Tab>
      </SimpleTabsHeader>


      <div className="flex flex-row col-span-2 col-start-2 mb-5 text-primary-400 tablet:col-start-2 tablet:col-span-12 desktop:col-start-2 desktop:col-span-8">
        <TabContent id={'topics'} index={0}>
          <div className="flex flex-row flex-wrap gap-2">
            {categories.map(cat => (
              <PillBase
                selected={category === cat.slug}
                key={cat.name}
                clickHandler={catClick(cat.slug)}>
                {cat.name}
              </PillBase>
            ))}
          </div>
        </TabContent>
        <TabContent id={'difficulty'} index={1}>
          <div className="flex flex-row flex-wrap gap-2">
            {skillLevels.map(cat => (
              <PillBase
                selected={category === cat.slug}
                key={cat.name}
                clickHandler={catClick(cat.slug)}>
                {cat.name}
              </PillBase>
            ))}
          </div>
        </TabContent>
      </div>

    </SimpleTabsProvider>
  )
}

export default BlogCategoryTabs
