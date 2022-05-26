import SimpleTabs from "@App/components/tabs/SimpleTabs/simpleTabs"
import type { ISiteContextState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react"

function TabsProviderRender(ui: any, { props, ...renderOptions }: any) {
  return render(
    <SimpleTabs customState={props}>{ui}</SimpleTabs>,
    renderOptions,
  )
}
interface IUseSiteRender {
  props: ISiteContextState,
  renderOptions?: Omit<RenderOptions, 'queries'>
}
function UseSiteProviderRender(ui: any, { props, renderOptions }: IUseSiteRender) {
  return render(
    <UseSiteProvider defaultState={props}>{ui}</UseSiteProvider>,
    renderOptions,
  )
}

export { TabsProviderRender, UseSiteProviderRender }