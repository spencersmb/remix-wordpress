import { Link, useLocation } from "@remix-run/react"
import useSite from "@App/hooks/useSite"
import { getPrimaryMenu } from "@App/lib/wp/nav"
import TuesdayMakersPopOver from "./popOver/tuesdayMakersPrimary"
import AboutPopOver from "./popOver/aboutPopOver"

/**
 * @Component Primary Nav for the site
 * @tested - 6/2/2022
 * 
 *
 */
export const PrimaryNav = () => {
  const { state: { menu, user } } = useSite()
  const primaryMenu = getPrimaryMenu(menu)
  const location = useLocation()

  const selectedNav = 'bg-grey-100 text-grey-800'
  const unselectedNav = 'text-grey-700'

  return (
    <div aria-label="desktop navigation" className="transform translate-x-[-100%] left-0 top-[68px] h-[100vh] w-full bg-slate-500 text-center absolute laptop:items-center laptop:translate-x-0 laptop:relative laptop:top-auto laptop:h-full laptop:flex laptop:justify-center laptop:bg-inherit">
      <ul className="laptop:flex laptop:flex-row laptop:justify-center">
        {primaryMenu.map((menuItem) => {
          return (
            <li key={menuItem.id}
              data-testid="menu-item"
              className={`flex items-center justify-center rounded-lg text-base normal-links transition-all duration-300 mx-1 first:ml-0 last:mr-0 hover:bg-grey-100 laptop:font-semibold desktop:text-base ${location.pathname === menuItem.path ? selectedNav : unselectedNav}`}>
              <Link
                className="transition-opacity duration-300 p-[11px] desktop:p-[13px] text-sm desktop:text-base desktop:px-4"
                to={menuItem.path}
                prefetch="intent">{menuItem.label}</Link>
            </li>
          )
        })}


        {user?.wpAdmin && <li>

          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </li>}

      </ul>
      <AboutPopOver />
      <TuesdayMakersPopOver />

    </div>
  )
}