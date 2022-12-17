import React from 'react'

interface Props {
  data: any
}

function CustomScripts(props: Props) {
  const { data } = props

  return (
    <>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          alt="facebook pixel"
          src="https://www.facebook.com/tr?id=1336949923022263&ev=PageView&noscript=1"
        />
      </noscript>
      {data && data.ENV && <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(
            data.ENV
            // {
            //   PUBLIC_WP_API_URL: 'https://etheadless.local/graphql/',
            //   APP_ROOT_URL: 'http://localhost:3000'
            // }
          )}`
        }}
      />}
      <script id='remix-gumroad-script'
        src="https://gumroad.every-tuesday.com/js/gumroad.js" />
      <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver" />
    </>
  )
}

export default CustomScripts
