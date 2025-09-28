export const getPackageInfo = () => {
    const wwwPkg = require('../package.json')
    const libraryName = Object.keys(wwwPkg.dependencies || {}).find((dep) => dep.startsWith('scrollbar-toc') || dep.startsWith('@'))
    return { libraryName }
}

export const config = {
    distDir: './dist',
    port: 3000,
    templatePath: './public/index.html',
    isDev: process.env.NODE_ENV !== 'production',
    basePath: process.env.BASE_PATH || '',
}
