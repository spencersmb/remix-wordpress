import { Link, Links } from "remix"
import useSite from "~/hooks/useSite"
import { getPrimaryMenu } from "~/lib/wp/nav"

const ResourceLibraryNavButton = () => {
  const { state: { menu, user } } = useSite()

  const tuesdayMakersClick = (e: any) => {

    const targetId = e.target.getAttribute('id')
    if (targetId === 'makers-login-btn') {
      return
    }
    console.log('Makers Btn Lrg');

  }

  const login = () => {
    console.log('login');

  }

  return (
    <li className="flex justify-center items-center flex-row ml-3">
      <div onClick={tuesdayMakersClick} className={`flex items-center bg-primary-200 rounded-full h-[52px] ${user?.resourceUser ? 'pl-6 py-2 pr-2.5' : 'pl-6 py-2 pr-6'}`}>
        <span className={`leading-none text-primary-600 font-sentinel__SemiBoldItal text-xl ${user?.resourceUser ? 'mr-4' : ''}`}>
          Tuesday Makers
        </span>
        {user?.resourceUser &&
          <div id='makers-login-btn' onClick={login} className="bg-primary-400 rounded-full px-5 py-2 text-white text-sm">
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

  return (
    <div aria-label="desktop navigation" className="left-0 top-[68px] h-[100vh] w-full bg-slate-500 text-center absolute laptop:relative laptop:top-auto laptop:h-full laptop:flex laptop:justify-center laptop:items-center laptop:bg-inherit">
      <ul className="laptop:flex laptop:flex-row laptop:justify-center">
        {primaryMenu.map((menuItem) => {
          return (
            <li key={menuItem.id} className="flex justify-center items-center text-sm m-2 mx-4 text-primary-600 uppercase laptop:font-medium desktop:text-base">
              <Link to={menuItem.path} prefetch="intent">{menuItem.label}</Link>
            </li>
          )
          // return <NavMenuItem key={menuItem.id} dropDownClassNames={styles.navSubMenu} item={menuItem} />;
        })}

        <ResourceLibraryNavButton />

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