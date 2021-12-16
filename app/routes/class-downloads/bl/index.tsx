import { createCookie, json, LoaderFunction } from "remix"

export let loader: LoaderFunction = async () => {
  const customHeaders = new Headers()
  const userPrefs = createCookie("user-prefs", {
    maxAge: 604_800 // one week
  });
  customHeaders.append('Set-Cookie', await userPrefs.serialize({
    procreateBonus: 'spencer'
  }))
  return json({}, {
    headers: customHeaders,
  })
}


const ProcreateBonusesLogin = () => {
  return (
    <div>
      Login form
    </div>
  )
}

export default ProcreateBonusesLogin