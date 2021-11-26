
export function getPrimaryMenu(menus: IMenu[]): IMenuItem[]{
  const mainMenu = menus.find(menu => menu.slug === 'primary')

  if(!mainMenu) return []

  // filter out submenu items appearing as main level items
  return mainMenu.menuItems.filter(menuItem => {
    if(menuItem.parentId){
      return
    }
    return menuItem
  })
}
