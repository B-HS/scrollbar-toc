import { config, getPackageInfo } from './config'
import { startFileWatcher } from './utils/hmr'
import { handleDevRoute } from './utils/routes'
import { serveStatic, handle404 } from './utils/static'

const { libraryName } = getPackageInfo()

startFileWatcher()

const serverConfig = {
    port: config.port,
    async fetch(req: Request) {
        const url = new URL(req.url)
        const pathname = url.pathname === '/' ? '/index.html' : url.pathname

        const devResponse = await handleDevRoute(pathname, req)
        if (devResponse) return devResponse

        const staticResponse = serveStatic(pathname)
        if (staticResponse) return staticResponse

        return handle404(pathname)
    },
}

export default {
    port: serverConfig.port,
    fetch: serverConfig.fetch,
    idleTimeout: 30,
}

console.log(`🚀 Server running at http://localhost:${serverConfig.port}`)
console.log(`   Mode: ${config.isDev ? 'development' : 'production'}`)
console.log(`   Library: ${libraryName || 'none'}`)
console.log(`   Serving from: ${config.distDir}/`)
console.log(`   Hot reload: ${config.isDev ? 'enabled' : 'disabled'}`)
