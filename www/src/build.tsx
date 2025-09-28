import { renderToString } from 'react-dom/server'
import { App } from './App'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { config, getPackageInfo } from './config'
import { LanguageProvider } from './i18n/context'

const { libraryName } = getPackageInfo()

const buildClient = async () => {
    const result = await Bun.build({
        entrypoints: ['./src/client.tsx'],
        target: 'browser',
        format: 'esm',
        minify: true,
        sourcemap: 'external',
        outdir: config.distDir,
        external: libraryName ? [libraryName] : [],
        define: {
            'process.env.BASE_PATH': JSON.stringify(config.basePath),
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
    })

    if (!result.success) {
        throw new Error('Client build failed')
    }

    return result
}

const buildHTML = async () => {
    const template = await Bun.file(config.templatePath).text()
    const html = renderToString(
        <LanguageProvider>
            <App />
        </LanguageProvider>,
    )

    const { basePath } = config
    const importMap = libraryName
        ? `<script type="importmap">
    {
      "imports": {
        "${libraryName}": "${basePath}/lib.js"
      }
    }
    </script>`
        : ''

    const result = template
        .replace('</head>', `${importMap}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root" data-prerendered>${html}</div>`)
        .replace('</body>', `<script type="module" src="${basePath}/client.js"></script>\n  </body>`)
        .replace(/href="\/index.css"/g, `href="${basePath}/index.css"`)

    await writeFile(join(config.distDir, 'index.html'), result)
}

const copyAssets = async () => {
    const css = await Bun.file('./src/index.css').text()
    await writeFile(join(config.distDir, 'index.css'), css)

    const libFile = await Bun.file('../package/dist/index.js').text()
    await writeFile(join(config.distDir, 'lib.js'), libFile)
}

const build = async () => {
    console.log('🏗️  Building...')

    await mkdir(config.distDir, { recursive: true })

    await Promise.all([buildClient(), buildHTML(), copyAssets()])

    console.log('✅ Build complete!')
    console.log(`📦 Output: ${config.distDir}`)
}

build().catch((error) => {
    console.error('❌ Build failed:', error)
    process.exit(1)
})
