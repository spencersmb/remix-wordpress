import SimpleTabsProvider from "~/components/tabs/SimpleTabs/simpleTabs"
import PillBase from '~/components/buttons/pillBase'
import BarChartSvg from '~/components/svgs/barChartSvg'
import GridSvg from '~/components/svgs/gridSvg'
import SimpleTabsHeader from '~/components/tabs/SimpleTabs/simpleTabsHeader'
import TabContent from '~/components/tabs/SimpleTabs/tabContent'
import TabLabel from './tabLabel'
import Tab from "~/components/tabs/SimpleTabs/tab"

interface Props {
  catClick: (cat: string) => () => Promise<void>
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

function BlogCategoryTabs(props: Props) {
  const { catClick, category } = props

  return (
    <div className='grid grid-cols-mobile gap-x-5 mt-20 tablet:grid-cols-tablet tablet:gap-x-5 desktop:mt-32  desktop:grid-cols-desktop grid-flow-row row-auto'>

      <SimpleTabsProvider>

        <SimpleTabsHeader className="col-start-2 col-span-2 flex flex-row text-primary-400 mb-10 tablet:col-start-2 tablet:col-span-12 laptop:col-start-2 laptop:col-span-12">
          <Tab name={'topics'} className="flex-1 tablet:first:pr-7 tablet:flex-none">
            <TabLabel
              Svg={GridSvg}
              iconFillType={'stroke'}
              id="topics"
              text="Search blog by category" />
          </Tab>
          <Tab name={'difficulty'} className="flex-1  tablet:flex-none">
            <TabLabel
              Svg={BarChartSvg}
              id="difficulty"
              text="Search by difficulty" />
          </Tab>
        </SimpleTabsHeader>


        <div className="col-start-2 col-span-2 flex flex-row text-primary-400 mb-5 tablet:col-start-2 tablet:col-span-full desktop:col-start-2 desktop:col-span-8">
          <TabContent id={'topics'}>
            <div className="flex flex-row flex-wrap">
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
          <TabContent id={'difficulty'}>
            <div className="flex flex-row flex-wrap">
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
    </div>
  )
}

export default BlogCategoryTabs
