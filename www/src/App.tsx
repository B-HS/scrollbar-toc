import { useEffect, useRef, useState } from 'react'
import { setScrollToc } from 'scrollbar-toc'
import { Header } from './components/header'
import { Home } from './pages/introduce'
import { Sample } from './pages/sample'
import { LiveDemo } from './pages/live-demo'

export const App = () => {
    const [currentPage, setCurrentPage] = useState('')
    const description = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (description.current) {
            setScrollToc(description.current, {
                className: 'scroll-toc-button',
            })
        }
    }, [currentPage])

    return (
        <div className='docs-layout' ref={description}>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className='main-content'>
                <div className='content-wrapper'>
                    {currentPage === 'sample' ? <Sample /> : currentPage === 'live-demo' ? <LiveDemo /> : <Home />}
                </div>
            </main>
        </div>
    )
}
