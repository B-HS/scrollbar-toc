import { CodeBlock } from '../components/code-block'
import { basicUsageCode, installCode, reactExampleCode } from '../constant/codes'
import { useLanguage } from '../i18n/context'

export const Home = () => {
    const { t } = useLanguage()

    return (
        <>
            <h1 id='introduction'>{t.introduce.title}</h1>
            <p>{t.introduce.description}</p>

            <div className='features-grid'>
                <div className='feature-card'>
                    <div className='feature-icon'>🚀</div>
                    <div className='feature-title'>{t.introduce.features.zeroDependencies.title}</div>
                    <div className='feature-description'>{t.introduce.features.zeroDependencies.description}</div>
                </div>

                <div className='feature-card'>
                    <div className='feature-icon'>🎯</div>
                    <div className='feature-title'>{t.introduce.features.frameworkAgnostic.title}</div>
                    <div className='feature-description'>{t.introduce.features.frameworkAgnostic.description}</div>
                </div>
            </div>

            <h2 id='installation'>{t.introduce.installation}</h2>
            <div className='install-command'>
                <span className='install-text'>{installCode}</span>
                <button className='copy-button' onClick={() => navigator.clipboard.writeText(installCode)}>
                    Copy
                </button>
            </div>

            <h2 id='quick-start'>{t.introduce.quickStart}</h2>
            <p>{t.introduce.quickStartDescription}</p>

            <CodeBlock code={basicUsageCode} language='javascript' title='Basic Usage' />

            <h2 id='framework-integration'>{t.introduce.frameworkIntegration}</h2>

            <h3 id='react'>{t.introduce.react}</h3>
            <p>{t.introduce.reactDescription}</p>

            <CodeBlock code={reactExampleCode} language='typescript' title='React Integration' />

            <h2 id='features'>{t.introduce.keyFeatures}</h2>

            <h3 id='automatic-parsing'>{t.introduce.automaticParsing}</h3>
            <p>{t.introduce.automaticParsingDescription}</p>

            <h3 id='smart-positioning'>{t.introduce.smartPositioning}</h3>
            <p>{t.introduce.smartPositioningDescription}</p>

            <h3 id='customization'>{t.introduce.customization}</h3>
            <p>{t.introduce.customizationDescription}</p>

            <h3 id='level-filtering'>{t.introduce.levelFiltering}</h3>
            <p>{t.introduce.levelFilteringDescription}</p>

            <h2 id='browser-support'>{t.introduce.browserSupport}</h2>
            <p>
                <span className='badge badge-green'>✅ Chrome 60+</span>
                <span className='badge badge-green'>✅ Firefox 60+</span>
                <span className='badge badge-green'>✅ Safari 12+</span>
                <span className='badge badge-green'>✅ Edge 79+</span>
            </p>

            <h2 id='bundle-size'>{t.introduce.bundleSize}</h2>
            <p>{t.introduce.bundleSizeDescription}</p>
            <p>
                <span className='badge badge-blue'>ESM: ~2KB</span>
                <span className='badge badge-blue'>CJS: ~2.2KB</span>
                <span className='badge badge-gray'>Tree-shakeable</span>
            </p>
        </>
    )
}

export default Home
