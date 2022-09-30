import { consoleHelper } from "@App/utils/windowUtils";
import { useEffect } from "react"
import useSite from "./useSite"


/**
 * 
 * @param newUser 
 * @param status 
 * 
 * Hook that is used between route navigations after a user has logged in because the router doesn't carry the user over in Context, so we must update it manually if the user logs in on another page.
 * 
 * This is a bit of a hack, but it works.
 * 
 * Also setLocalStorage is run to trigger other open Tabs to refresh
 *
 */
const useTuesdayMakersClientSideLogin = (newUser: IResourceUser, status: number) => {
  function setMakersStorage() {
    localStorage.setItem('makers_login', 'login' + Math.random());
  }
  const { state: { user }, resourecLibraryLogin } = useSite()

  useEffect(() => {

    if (!user.resourceUser && status === 200) {
      consoleHelper('no user locally so manually add them');
      setMakersStorage()
      resourecLibraryLogin({ user: newUser })
    }

  }, [])
}

export default useTuesdayMakersClientSideLogin