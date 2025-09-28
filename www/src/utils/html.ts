import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { config, getPackageInfo } from '../config'
import { LanguageProvider } from '../i18n/context'

export const generateHTML = async (App: () => JSX.Element) => {
    const template = await Bun.file(config.templatePath).text()
    const html = renderToString(createElement(LanguageProvider, null, createElement(App)))
    const { libraryName } = getPackageInfo()

    const importMap = libraryName
        ? `<script type="importmap">
    {
      "imports": {
        "${libraryName}": "/lib.js"
      }
    }
    </script>`
        : ''

    const hmrScript = config.isDev
        ? `<script>
      let evtSource
      const connectHMR = () => {
        evtSource = new EventSource('/__hmr')
        evtSource.onmessage = (event) => {
          if (event.data === 'reload') {
            console.log('🔄 Reloading...')
            location.reload()
          }
        }
        evtSource.onerror = () => {
          console.log('❌ HMR connection closed, reconnecting...')
          evtSource.close()
          setTimeout(connectHMR, 1000)
        }
      }
      connectHMR()
    </script>`
        : ''

    return template
        .replace('</head>', `${importMap}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root" data-prerendered>${html}</div>`)
        .replace('</body>', `<script type="module" src="/client.js"></script>\n    ${hmrScript}\n  </body>`)
}

export const getContentType = (pathname: string) => {
    if (pathname.endsWith('.html')) return 'text/html'
    if (pathname.endsWith('.js')) return 'application/javascript'
    if (pathname.endsWith('.css')) return 'text/css'
    if (pathname.endsWith('.json')) return 'application/json'
    if (pathname.endsWith('.map')) return 'application/json'
    return 'text/plain'
}
