import type { IWPMenu, IWpMenuItem } from "./site"

export function getPrimaryMenu(menus: IWPMenu[]): IWpMenuItem[]{
  const mainMenu = menus.find(menu => menu.slug === 'primary')

  if(!mainMenu) return []

  // filter out submenu items appearing as main level items
  return mainMenu.menuItems.filter(menuItem => {
    if(menuItem.parentId){
      return false
    }
    return menuItem
  })
}
