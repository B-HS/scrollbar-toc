import { useLanguage } from '../i18n/context'

export const LiveDemo = () => {
    const { t } = useLanguage()

    return (
        <>
            <h1 id='live-demo'>{t.liveDemo.title}</h1>
            <p>{t.liveDemo.description}</p>

            <div className='features-grid'>
                <div className='feature-card'>
                    <div className='feature-icon'>📝</div>
                    <div className='feature-title'>{t.liveDemo.blogExample}</div>
                    <div className='feature-description'>{t.liveDemo.blogExampleDescription}</div>
                    <a
                        href='https://blog.gumyo.net/article/19'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='demo-link'
                    >
                        {t.liveDemo.visitSite} →
                    </a>
                </div>
            </div>
        </>
    )
}

export default LiveDemo