/**
 * @function countVideoTime
 * @description - Converts time to PTMS format
 * @tested - 11/20/2022
 */
export function countVideoTime (time?: string): any {
  if(!time) return 'PT0M0S';
  const [mins, seconds] = time.split(':').map(parseFloat)
  let secondsLeft = (mins * 60) + seconds
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600
  const minutes = Math.floor(secondsLeft / 60)
  // secondsLeft = secondsLeft % 60
  // console.log(hours, minutes, secondsLeft)
  // console.log('percentLeft', percentLeft)

  // return `PT${hours}H${minutes}M${seconds}S`
  return `PT${minutes}M${seconds}S`
}

/**
 * @function countSeconds
 * @description - Converts time into seconds
 * @tested - 11/20/2022
 */
export function countSeconds(time?: string): number {
  if(!time) return 0;
  const [mins, seconds] = time.split(':').map(parseFloat)
  let secondsLeft = (mins * 60) + seconds
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600
  const minutes = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60
  // console.log(hours, minutes, secondsLeft)
  // console.log('percentLeft', percentLeft)
  return (hours * 3600) + (minutes * 60) + secondsLeft
}

export function whenAvailable(name: string, callback: any) {
  var interval = 10; // ms
  window.setTimeout(function () {
    // const el = document.getElementsByClassName('.gumroad-scroll-container')
    const el = document.getElementsByClassName(name)

    if (el.length > 0) {
      callback(el);
    } else {
      whenAvailable(name, callback);
    }
  }, interval);
}