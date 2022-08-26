export function countVideoTime (time: string | undefined): any {
  console.log('time', time);
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

export function countSeconds(time: string | undefined): number {
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