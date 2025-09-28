import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Language, Translation } from './types'
import { en } from './en'
import { kr } from './kr'

const translations: Record<Language, Translation> = {
    en,
    kr,
}

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
    t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en')

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}