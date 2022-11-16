import useWindowResize from '@App/hooks/useWindowResize'
import React from 'react'

interface Props {
  children: React.ReactNode
}

function ContextLoader(props: Props) {
  const { children } = props
  useWindowResize()
  return (
    <>
      {children}
    </>
  )
}

export default ContextLoader
