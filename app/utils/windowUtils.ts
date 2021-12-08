export const consoleHelper = (data: string, obj: any = null) => {
  if (process.env.NODE_ENV === 'production') return;

  obj
    ? console.log(data, obj)
    : console.log(data)
}
