import { CodeBlock } from '../components/code-block'
import { customStylingCode, optionsCode, reactHookExampleCode, svelteExampleCode, vanillaExampleCode, vueExampleCode } from '../constant/codes'
import { useLanguage } from '../i18n/context'

export const Sample = () => {
    const { t } = useLanguage()

    return (
        <>
            <h1 id='examples'>{t.sample.title}</h1>
            <p>{t.sample.description}</p>

            <h2 id='vue-integration'>{t.sample.vueIntegration}</h2>
            <p>{t.sample.vueDescription}</p>

            <CodeBlock code={vueExampleCode} language='vue' title='Vue 3 Example' />

            <h2 id='svelte-integration'>{t.sample.svelteIntegration}</h2>
            <p>{t.sample.svelteDescription}</p>

            <CodeBlock code={svelteExampleCode} language='svelte' title='Svelte Example' />

            <h2 id='vanilla-js'>{t.sample.vanillaJs}</h2>
            <p>{t.sample.vanillaJsDescription}</p>

            <CodeBlock code={vanillaExampleCode} language='javascript' title='Vanilla JavaScript' />

            <h2 id='advanced-configuration'>{t.sample.advancedConfiguration}</h2>
            <p>{t.sample.advancedConfigurationDescription}</p>

            <CodeBlock code={optionsCode} language='typescript' title='Configuration Options' />

            <h2 id='custom-styling'>{t.sample.customStyling}</h2>
            <p>{t.sample.customStylingDescription}</p>

            <CodeBlock code={customStylingCode} language='css' title='Custom Styles' />

            <h2 id='performance-considerations'>{t.sample.performanceConsiderations}</h2>

            <h3 id='lazy-initialization'>{t.sample.lazyInitialization}</h3>
            <p>
                {t.sample.lazyInitializationDescription.split('setScrollToc')[0]}
                <code className='inline-code'>setScrollToc</code>
                {t.sample.lazyInitializationDescription.split('setScrollToc')[1]}
            </p>

            <h3 id='dom-optimization'>{t.sample.domOptimization}</h3>
            <p>
                {t.sample.domOptimizationDescription.split('querySelectorAll')[0]}
                <code className='inline-code'>querySelectorAll</code>
                {t.sample.domOptimizationDescription.split('querySelectorAll')[1]}
            </p>

            <h3 id='memory-efficiency'>{t.sample.memoryEfficiency}</h3>
            <p>{t.sample.memoryEfficiencyDescription}</p>

            <h3 id='nextjs-support'>{t.sample.nextjsSupport}</h3>
            <p>{t.sample.nextjsSupportDescription}</p>

            <h3 id='react-hook-pattern'>{t.sample.reactHookPattern}</h3>
            <p>{t.sample.reactHookPatternDescription}</p>

            <CodeBlock code={reactHookExampleCode} language='typescript' title='useScrollToc Hook' />

            <h2 id='troubleshooting'>{t.sample.troubleshooting}</h2>

            <h3 id='ssr-compatibility'>{t.sample.ssrCompatibility}</h3>
            <p>
                {t.sample.ssrCompatibilityDescription.split('document')[0]}
                <code className='inline-code'>document</code>
                {t.sample.ssrCompatibilityDescription.split('document')[1]}
            </p>

            <h3 id='dynamic-content'>{t.sample.dynamicContent}</h3>
            <p>
                {t.sample.dynamicContentDescription.split('setScrollToc')[0]}
                <code className='inline-code'>setScrollToc</code>
                {t.sample.dynamicContentDescription.split('setScrollToc')[1]}
            </p>

            <h3 id='mobile-considerations'>{t.sample.mobileConsiderations}</h3>
            <p>{t.sample.mobileConsiderationsDescription}</p>
        </>
    )
}
