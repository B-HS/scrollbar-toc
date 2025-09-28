import { useLanguage } from '../i18n/context'

export const Header = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
    const { language, setLanguage, t } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'kr' : 'en')
    }

    return (
        <header className='header'>
            <div className='header-content'>
                <a href='/' className='logo'>
                    <div className='logo-icon'>S</div>
                    scrollbar-toc
                </a>

                <nav>
                    <ul className='nav-links'>
                        <li>
                            <button onClick={() => setCurrentPage('docs')} className={`nav-link ${currentPage !== 'sample' ? 'active' : ''}`}>
                                {t.header.docs}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('sample')} className={`nav-link ${currentPage === 'sample' ? 'active' : ''}`}>
                                {t.header.examples}
                            </button>
                        </li>
                        <li>
                            <button onClick={toggleLanguage} className='nav-link language-switcher'>
                                {language === 'en' ? 'KR' : 'EN'}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
