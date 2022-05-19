import { useEffect } from "react"
import useSite from "./useSite"

const useTuesdayMakersClientSideLogin = (newUser: IResourceUser, status: number) => {
  function setMakersStorage() {
    localStorage.setItem('makers_login', 'login' + Math.random());
  }
  const { state: { user }, resourecLibraryLogin } = useSite()
  useEffect(() => {

    if (!user.resourceUser && status === 200) {
      console.log('no user locally so manually add them');
      setMakersStorage()
      resourecLibraryLogin({ user: newUser })
    }

    // Check if localstorage has a user in it already
    console.log('localStorage.getItem(makers_login)', localStorage.getItem('makers_login'));

    // Set storage to an arbitrary value so we can log user in on other open tabs.
  }, [])
}

export default useTuesdayMakersClientSideLogin