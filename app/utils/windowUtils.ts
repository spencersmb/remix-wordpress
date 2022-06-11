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
