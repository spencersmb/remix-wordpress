import BlogCategoryTabs from '@App/components/blog/blogHomeTabs/blogCategoryTabs'
import BasicSubmitBtn from '@App/components/buttons/basicSubmitBtn'
import GumroadBtn from '@App/components/buttons/gumroadBtn'
import OutlinedButton from '@App/components/buttons/outlinedButton'
import PillBase from '@App/components/buttons/pillBase'
import SubmitBtn from '@App/components/buttons/submitBtn'
import InputBase from '@App/components/forms/input/inputBase'
import Layout from '@App/components/layoutTemplates/layout'
import { spinnerColors } from '@App/components/spinners/spinnerColors'
import { classNames } from '@App/utils/appUtils'
import { Link } from '@remix-run/react'
import React from 'react'

interface Props { }

function Design(props: Props) {
  const { } = props

  const mockClick = (cat: string) => () => {

  }

  const mockDownload = (index: number) => () => {

  }

  const mockLoad = () => { }

  return (
    <Layout >
      <div className='mb-16 et-grid-basic'>
        <div className='col-span-10 col-start-3 mb-6'>
          <h2 className='text-2xl'>BUTTONS</h2>
        </div>
        <div className='col-span-10 col-start-3 mb-16'>
          <h3 className='mb-8'>Solid</h3>
          <div className='flex flex-row items-end gap-3'>
            <GumroadBtn
              text={'Buy Now'}
              className=''
              url={'https://google.com'} />
            <GumroadBtn
              text={'Buy Now Price'}
              price={24}
              className=''
              url={'https://google.com'} />
            <a
              data-testid="gumroad-btn"
              href="https://everytuesday.gumroad.com/l/freebie-license" className="btn btn-lg btn-primary">
              <span className="flex-1 mr-9">
                Buy Now!
              </span>
              <span className="text-2xl leading-[1] font-sentinel__SemiBoldItal">$30</span>
            </a>
          </div>
        </div>
        <div className='col-span-10 col-start-3 mb-16'>
          <h3 className='mb-8'>Blog IndexTabs</h3>
          <div className='flex flex-row flex-wrap'>
            <PillBase
              selected={false}
              key={'Procreate-2'}
              clickHandler={mockClick('cat.slug')}>
              Procreate
            </PillBase>
            <PillBase
              selected={true}
              key={'Procreate'}
              clickHandler={mockClick('cat.slug')}>
              Procreate
            </PillBase>

          </div>
        </div>

        <div className='col-span-10 col-start-3 mb-16'>
          <h3 className='mb-8'>Locked Buttons</h3>
          <div className='flex flex-row flex-wrap gap-4'>
            <button data-testid='download-btn'
              disabled={true} className={classNames(true
                ? ``
                : ``,
                'btn btn-outlineFill btn-sm')}
              onClick={mockDownload(1)}>
              {true ? 'Locked' : 'Download'}
            </button>
            <button data-testid='download-btn' disabled={false} className={classNames(false
              ? ``
              : ``,
              'btn btn-outlineFill btn-sm')} onClick={mockDownload(1)}>
              {false ? 'Locked' : 'Download'}
            </button>

          </div>
        </div>

        <div className='flex flex-row col-span-10 col-start-3 mb-16'>
          <div className='mr-8'>
            <h3 className='mb-8'>Blog Categories</h3>
            <div className='flex flex-row flex-wrap gap-4'>
              <li data-testid="test-category" key={1} className='flex mb-5 mr-5 overflow-hidden '>
                <Link prefetch="intent" to={`/category/procreate`} className='btn btn-sm btn-outlineFill'>
                  Procreate
                </Link>
              </li>

            </div>
          </div>

          <div className='mr-8'>
            <h3 className='mb-8'>Contact License</h3>
            <div className='flex flex-row flex-wrap gap-4'>
              <Link
                className='btn btn-primary btn-lg'
                to={'/contact'}>
                Contact Us
              </Link>

            </div>
          </div>

          <div>
            <h3 className='mb-8'>Blog Author</h3>
            <div className='flex flex-row flex-wrap gap-4'>
              <div className='mt-2 flex-[1_1_100%] tablet:flex-[0_1_auto] items-center justify-center tablet:self-end pb-2 tablet:mt-0'>
                <Link to={'/about'} prefetch='intent' className='btn btn-outline' >About Me</Link>
              </div>
            </div>
          </div>

        </div>


        <div className='flex flex-row col-span-10 col-start-3 mb-16'>
          <div className='mr-8 w-[300px]'>
            <h3 className='mb-8'>Popover login</h3>
            <div className='flex flex-row flex-wrap gap-4 w-[300px]'>
              <Link
                to={'/tuesday-makers'}
                prefetch={'intent'}
                className="btn btn-primary btn-flex">
                Sign Up
              </Link>
              <Link
                prefetch={'intent'}
                to={'/tuesday-makers/login'}
                className="btn btn-outlineFill btn-flex">
                Login
              </Link>

            </div>
          </div>

          <div className='mr-8'>
            <h3 className='mb-8'>Popover logged in</h3>
            <div className='flex flex-row flex-wrap gap-4'>
              <Link
                prefetch={'intent'}
                className="btn btn-outline"
                to={'/tuesday-makers/members'}>
                Makers Dashboard
              </Link>

            </div>
          </div>


        </div>


        <div className='flex flex-row col-span-10 col-start-3 mb-16'>

          <div className='mr-8'>
            <h3 className='mb-8'>Tuesday Makers grid filter</h3>
            <div className='flex flex-row flex-wrap gap-2'>
              <ul data-testid="filterTags" className="items-center hidden w-full text-sm capitalize laptop:grid gap-x-2 text-neutral-900 laptop:grid-flow-col laptop:w-auto laptop:gap-x-1">

                <li
                  key={'procreate-3'}
                  className='inline-block'
                  onClick={mockClick('filter')}>
                  <span
                    title={'Procreate'}
                    className={classNames(false
                      ? 'selected-tag btn-outlineFill--sage'
                      : 'btn-outlineFill', 'btn btn-xs')}>
                    Procreate
                  </span>
                </li>
                <li
                  key={'procreate'}
                  className='inline-block'
                  onClick={mockClick('filter')}>
                  <span
                    title={'Procreate'}
                    className={classNames(true ? 'selected-tag btn-outlineFill--sage' : 'btn-outlineFill', 'btn btn-xs')}>
                    Procreate
                  </span>
                </li>
              </ul>

            </div>
          </div>

        </div>


        <div className='flex flex-row col-span-10 col-start-3 mb-16'>

          <div className='mr-8'>
            <h3 className='mb-8'>Load More BTN</h3>
            <div className='flex flex-row flex-wrap gap-6'>
              <OutlinedButton
                className='mx-auto btn btn-outline btn-lg'
                clickHandler={mockLoad}
                text={'Show More'} loading={false}
                loadingText={'Loading...'}
              />

              <OutlinedButton
                className='mx-auto btn btn-outline btn-lg'
                clickHandler={mockLoad}
                text={'Show More'}
                loading={true}
                loadingText={'Loading...'}
                spinnerColors={spinnerColors.sageOutline}
              />

            </div>
          </div>

        </div>


        <div className='flex flex-row col-span-10 col-start-3 mb-16'>

          <div className='mr-8'>
            <h3 className='mb-8'>Form Buttons</h3>
            <div className='flex flex-row flex-wrap gap-6'>
              <BasicSubmitBtn
                className='btn-primary-ring'
                loading={false}
                text={'Sign In'}
                spinnerColors={spinnerColors.sageSolid}
              />
              <BasicSubmitBtn
                className='btn-primary-ring'
                loading={true}
                text={'Sign In'}
                spinnerColors={spinnerColors.sageSolid}
              />

            </div>
          </div>

        </div>


        <div className='flex flex-row col-span-10 col-start-3 mb-16'>

          <div className='mr-8'>
            <h3 className='mb-8'>Footer Form Buttons</h3>
            <div className='flex flex-row flex-wrap gap-6 p-8 bg-sage-600 w-[600px]'>
              <SubmitBtn
                spinnerColors={spinnerColors.yellowSolid}
                className='btn btn-secondary btn-lg'
                transition={{
                  state: "idle",
                  type: "idle",
                  submission: undefined,
                  location: undefined
                }}
                btnText='Send the Goods!'
              />

              <SubmitBtn
                className='btn btn-secondary btn-lg'
                spinnerColors={spinnerColors.yellowSolid}
                // @ts-ignore
                transition={{
                  state: "submitting",
                  type: "actionSubmission",
                  submission: undefined,
                  location: undefined
                  // location: {
                  //   pathname: "/tuesday-makers/login",
                  //   search: "",
                  //   hash: "",
                  //   key: '',
                  //   state: {
                  //     key: '2'
                  //   }
                  // }
                }}
                btnText='Send the Goods!'
              />

              <SubmitBtn
                className='btn btn-secondary btn-lg btn-secondary-ring bg-secon'
                spinnerColors={spinnerColors.yellowSolid}
                // @ts-ignore
                transition={{
                  state: "submitting",
                  type: "actionSubmission",
                  submission: undefined,
                  location: undefined
                  // location: {
                  //   pathname: "/tuesday-makers/login",
                  //   search: "",
                  //   hash: "",
                  //   key: '',
                  //   state: {
                  //     key: '2'
                  //   }
                  // }
                }}
                btnText='Send the Goods!'
              />

              <button data-testid="subscribe-btn" type="button" className="btn btn-secondary btn-lg btn-secondary-ring">Subscribe</button>

            </div>
          </div>

        </div>


      </div>
      <div className='mb-16 et-grid-basic'>
        <div className='col-span-10 col-start-3'>
          <h2 className='text-2xl'>INPUTS</h2>
        </div>

        <div className='col-span-10 col-start-3 mb-16'>
          <h3 className='mb-8'>Login</h3>
          <div className='max-w-[400px]'>
            <InputBase
              label="Email"
              labelCss="text-sm text-grey-600 font-semibold"
              className="mt-2 mb-5 bg-grey-100"
              invalid={Boolean(
                false
              ) || undefined}
              id='email-input'
              name='email'
              type='email'
              required={true}
              placeholder='Enter your email'
              onChange={mockLoad}
            />

          </div>
        </div>

        <div className='col-span-10 col-start-3 mb-16'>
          <h3 className='mb-8'>Login</h3>
          <div className='max-w-[400px] bg-sage-600 p-8'>
            <InputBase
              type="email"
              name="email"
              className='input-onSage'
              placeholder='Enter Email'
              required={true}
              invalid={false}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Design
