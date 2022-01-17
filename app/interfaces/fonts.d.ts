interface IFontFile {
  type: string
  family: string
  url: string
}
interface IFontFamily {
  name: string
  files: IFontFile[]
}
interface IFontAsset {
  [id: string]: IFontFamily
}