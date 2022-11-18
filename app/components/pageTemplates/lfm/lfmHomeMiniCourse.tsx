import LfmClosedPage from '@App/components/lfm/closedPage'
import useSite from '@App/hooks/useSite'
import { formatDate } from '@App/utils/posts'
import React, { useEffect } from 'react'

interface Props {
  data: any
}
function formatAMPM(date: Date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes: number = date.getMinutes();
  const minuteString = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minuteString + ' ' + ampm;
  return strTime;
}
function LfmHomeMiniCourse(props: Props) {
  const {
    data
  } = props

  const { state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()

  const testDate = lfmBanner.nextLaunchDate ? new Date(lfmBanner.nextLaunchDate) : new Date()
  useEffect(() => {
    if (isClassOpen && window) {
      window.open('https://courses.every-tuesday.com/p/learn-font-making', '_self')
    }
  }, [])

  // can compare dates
  // console.log('getTimeString', testDate.getTime());

  // foratted readble date July 14, 2022
  // console.log('getDate', formatDate(testDate.toDateString()));

  // can compare dates
  // console.log('getHours', formatAMPM(testDate));

  const nextLaunchDate = lfmBanner.nextLaunchDate ? formatDate(lfmBanner.nextLaunchDate) : ''
  const isClassOpen = lfmBanner.showBanner === "true"

  return (
    <>
      {isClassOpen && <div>Class is open</div>}
      {!isClassOpen &&
        <LfmClosedPage
          date={nextLaunchDate}
          gridItems={data.gridItems}
        />}
    </>
  )
}

export default LfmHomeMiniCourse
