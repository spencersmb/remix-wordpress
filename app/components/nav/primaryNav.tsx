import { Link, useLocation } from "@remix-run/react"
import useSite from "@App/hooks/useSite"
import { getPrimaryMenu } from "@App/lib/wp/nav"
import TuesdayMakersPopOver from "./popOver/tuesdayMakersPrimary"

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

  const selectedNav = 'underline underline-offset-4 underline-red-600 text-red-600'
  const unselectedNav = 'text-charcoal-900'

  return (
    <div aria-label="desktop navigation" className="transform translate-x-[-100%] left-0 top-[68px] h-[100vh] w-full bg-slate-500 text-center absolute laptop:translate-x-0 laptop:relative laptop:top-auto laptop:h-full laptop:flex laptop:justify-center laptop:bg-inherit">
      <ul className="laptop:flex laptop:flex-row laptop:justify-center">
        {primaryMenu.map((menuItem) => {
          return (
            <li key={menuItem.id}
              data-testid="menu-item"
              className={`flex items-center justify-center m-2 mx-4 text-base normal-links  laptop:font-semibold desktop:text-base ${location.pathname === menuItem.path ? selectedNav : unselectedNav}`}>
              <Link to={menuItem.path} prefetch="intent">{menuItem.label}</Link>
            </li>
          )
          // return <NavMenuItem key={menuItem.id} dropDownClassNames={styles.navSubMenu} item={menuItem} />;
        })}


        {user?.wpAdmin && <li>

          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </li>}

      </ul>
      <TuesdayMakersPopOver />

    </div>
  )
}