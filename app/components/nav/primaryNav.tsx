import { Link, useLocation, useNavigate } from "@remix-run/react"
import useSite from "~/hooks/useSite"
import { getPrimaryMenu } from "~/lib/wp/nav"
import TuesdayMakersPopOver from "./tuesdayMakersPopOver"

const ResourceLibraryNavButton = () => {
  const { state: { menu, user } } = useSite()
  let navigate = useNavigate();


  const tuesdayMakersClick = (e: any) => {

    const targetId = e.target.getAttribute('id')
    if (targetId === 'makers-login-btn') {
      return
    }
    console.log('Makers Btn Lrg');

  }

  const login = () => {
    console.log('login');
    navigate("/tuesday-makers/", { replace: true });

  }



  return (
    <li className="flex flex-row items-center justify-center ml-3">
      <div onClick={tuesdayMakersClick} className={`flex items-center bg-primary-200 rounded-full h-[52px] ${!user?.resourceUser ? 'pl-6 py-2 pr-2.5' : 'pl-6 py-2 pr-6'}`}>
        <span className={`leading-none text-primary-600 font-sentinel__SemiBoldItal text-xl ${user?.resourceUser ? 'mr-4' : ''}`}>
          Tuesday Makers
        </span>
        {!user?.resourceUser &&
          <div id='makers-login-btn' onClick={login} className="px-5 py-2 ml-3 text-sm text-white rounded-full bg-primary-400">
            Login
          </div>
        }
      </div>
    </li>
  )
}
export const PrimaryNav = () => {
  const { state: { menu, user } } = useSite()
  const primaryMenu = getPrimaryMenu(menu)
  const location = useLocation()
  console.log('location', location);

  const selectedNav = 'underline underline-offset-4 underline-red-400 text-red-400'
  const unselectedNav = 'text-charcoal-900'

  return (
    <div aria-label="desktop navigation" className="transform translate-x-[-100%] left-0 top-[68px] h-[100vh] w-full bg-slate-500 text-center absolute laptop:translate-x-0 laptop:relative laptop:top-auto laptop:h-full laptop:flex laptop:justify-center laptop:items-center laptop:bg-inherit">
      <ul className="laptop:flex laptop:flex-row laptop:justify-center">
        {primaryMenu.map((menuItem) => {
          return (
            <li key={menuItem.id}
              className={`flex items-center justify-center m-2 mx-4 text-base normal-links  laptop:font-semibold desktop:text-base ${location.pathname === menuItem.path ? selectedNav : unselectedNav}`}>
              <Link to={menuItem.path} prefetch="intent">{menuItem.label}</Link>
            </li>
          )
          // return <NavMenuItem key={menuItem.id} dropDownClassNames={styles.navSubMenu} item={menuItem} />;
        })}

        <TuesdayMakersPopOver />

        {user?.wpAdmin && <li>

          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </li>}

      </ul>
    </div>
  )
}