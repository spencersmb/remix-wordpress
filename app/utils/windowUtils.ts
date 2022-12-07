// green: #24e174
// magenta: #e0005a 
export const consoleColors = {
  yellow: '#ffd321',
  purple: '#7f21ff',
  magenta: '#e0005a',
  orange: '#ec9600',

}
export const consoleHelper = (data: string, obj: any = null, location?: String | null, color:{
  bg: string, text: string
} = {bg: "#21ff7f", text: "#000"}) => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') return;

  console.group(
			`%c${data}`,
			`background-color: ${color.bg} ; color: ${color.text} ; font-weight: bold ; padding: 4px ;`);

  obj
    ? console.log(data, obj)
    : console.log(data)

  location && console.log(`%cLocation: 👉 ${location}`, `color: #626262 ; font-weight: 300 ;`);

  console.groupEnd();
  console.log('', );
  
}



export function setWindowUrlParams(props: {
  setParams: { name: string, value: string }[],
  deleteParams?: string[],
  pageTitle: string,
  tabTitle: string
}) {
  let { setParams, deleteParams, pageTitle, tabTitle } = props
  const url = new URL(window.location.href);

  setParams.forEach(({ name, value }) => {
    url.searchParams.set(name, value)
  })

  if (deleteParams) {
    deleteParams.forEach(name => {
      url.searchParams.delete(name)
    })
  }

  window.history.replaceState(pageTitle, tabTitle, url.href);
}