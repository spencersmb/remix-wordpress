/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { LicenseEnum } from '@App/enums/products'
import { getLicense } from '@App/utils/posts'
import { classNames } from '@App/utils/appUtils'

interface Props {
  handleSelected: any
  selected: LicenseEnum
  data: IProductDetails
}

/**
 * CURRENTLY NOT USED - so not tested
 * 
 * @param param0 
 * 
 * @returns 
 */
export default function SelectBox({ handleSelected, selected, data }: Props) {
  const { licences } = data
  // console.log('selectbox selected', data);
  const selectedLicense = getLicense(licences, selected)

  const licenseText = {
    [LicenseEnum.STANDARD]: 'Standard Licenses are for personal use in items not intended for sale.',
    [LicenseEnum.EXTENDED]: 'To be used in artwork intended to be sold, or used for any business-related purposes.',
    [LicenseEnum.SERVER]: 'Server Licenses are for personal use in items not intended for sale.',
  }

  if (!selectedLicense) return null;

  return (
    <Listbox value={selectedLicense} onChange={handleSelected}>
      {/* @ts-ignore */}
      {({ open }) => {
        if (selectedLicense.licenseType === '') {
          return null
        }

        return (
          <>
            <div className="relative">
              <Listbox.Button className={`relative w-full rounded-md pl-3 pr-10 py-[1.13rem] text-left cursor-default text-lg laptop:hover:bg-neutral-200 transform transition-all ${open ? 'bg-neutral-100' : 'bg-neutral-200'}`}>
                <span className="flex items-center">
                  <span className={`ml-2 block truncate capitalize ${open ? 'text-neutral-400' : 'text-neutral-700'}`}>{selectedLicense.licenseType} License</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-2 pointer-events-none">
                  <SelectorIcon className={`h-5 w-5 ${open ? 'text-neutral-400' : 'text-neutral-700'}`} type={'string'} aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full mt-2 overflow-auto text-lg bg-white rounded-md shadow-2xl ring-4 ring-black ring-opacity-5 focus:outline-none">
                  {licences.map((license: ILicense, index) => {
                    const isSelected = license.licenseType === selectedLicense.licenseType;
                    return (
                      <Listbox.Option
                        key={license.licenseType}
                        className={({ active }) =>
                          classNames(
                            (active && !isSelected)
                              ? 'text-white bg-primary-600'
                              : isSelected
                                ? 'text-white bg-primary-500'
                                : 'text-gray-900',
                            'flex flex-row cursor-default select-none relative py-5 px-6 justify-start transition-colors duration-300 ease-in-out'
                          )
                        }
                        value={{ license, index }}
                      >

                        {({ selected, active }) => {

                          return (
                            <>
                              <div className="flex flex-1">
                                <div
                                  className={classNames(isSelected ? 'font-semibold text-white ' : 'font-normal', 'text-lg flex flex-col')}
                                >
                                  <p className='capitalize'>{license.licenseType}</p>
                                  <p className={classNames(
                                    (active && !isSelected)
                                      ? 'text-white'
                                      : isSelected
                                        ? 'text-white'
                                        : 'text-gray-900',
                                    'text-sm font-normal mt-2 transition-all duration-300 ease-in-out laptop:max-w-[245px]'
                                  )}>
                                    {licenseText[license.licenseType]}
                                  </p>
                                </div>
                              </div>

                              {isSelected ? (
                                <span
                                  className={classNames(
                                    active
                                      ? 'text-white'
                                      : '',
                                    'relative inset-y-0 right-0 flex items-start transition-all'
                                  )}
                                >
                                  <CheckIcon className="w-5 h-5" aria-hidden="true" type={'string'} />
                                </span>
                              ) : null}
                            </>
                          )
                        }}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )
      }
      }
    </Listbox>
  )
}
