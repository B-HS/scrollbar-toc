import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { LanguageProvider } from './i18n/context'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

hydrateRoot(
    rootElement,
    <LanguageProvider>
        <App />
    </LanguageProvider>
)
