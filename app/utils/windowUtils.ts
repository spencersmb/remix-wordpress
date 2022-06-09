// green: #24e174
// magenta: #e0005a 
export const consoleHelper = (data: string, obj: any = null, location?: String) => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') return;

  console.group(
			`%c${data}`,
			"background-color: #21ff7f ; color: #000 ; font-weight: bold ; padding: 4px ;");

  obj
    ? console.log(data, obj)
    : console.log(data)

  location && console.log(`Location: 👉 ${location}`);

  console.groupEnd();
  console.log('', );
  
}
