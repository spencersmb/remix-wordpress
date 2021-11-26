interface IMenu{
  menuItems: IMenuItem[]
  name: string
  slug: string
}

interface IMenuCourse {
  details: {
    url: string
    name: string
  }
}

interface IMenuItem {
  featured:{
    courses: IMenuCourse[]
  }
  childItems: {
    edges: {node: IMenuItem}[]
  }
  id: string
  label: string
  path: string
  target: string
  title: string
  parentId: string | null
}
