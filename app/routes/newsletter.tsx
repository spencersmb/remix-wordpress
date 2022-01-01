import { ActionFunction, json, useActionData } from 'remix'

export let action: ActionFunction = () => {
  return json({
    value: process.env.CK_KEY
  })
}

const NewsLetter = () => {
  const data = useActionData()

  return (
    <div>
      Newsletter Route
      <p>data: {JSON.stringify(data)}</p>
    </div>
  )
}

export default NewsLetter
