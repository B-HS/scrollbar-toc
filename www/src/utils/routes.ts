import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { config } from '../config'
import { buildDevBundle } from './bundle'
import { createHMRStream } from './hmr'
import { generateHTML } from './html'

type RouteHandler = (req: Request) => Promise<Response | null> | Response | null

const specialRoutes: Record<string, RouteHandler> = {
    '/__hmr': () => {
        return new Response(createHMRStream(), {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        })
    },

    '/index.html': async () => {
        delete require.cache[require.resolve('../App.tsx')]
        const { App } = await import(`../App.tsx?t=${Date.now()}`)
        const html = await generateHTML(App)
        return new Response(html, {
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store',
            },
        })
    },

    '/client.js': async () => {
        const bundle = await buildDevBundle()
        return new Response(bundle, {
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'no-store',
            },
        })
    },
}

const getDevFiles = () => {
    const files: Record<string, string> = {}

    const scanDir = (dir: string, base = '') => {
        if (!existsSync(dir)) return

        const entries = readdirSync(dir)

        for (const entry of entries) {
            const fullPath = join(dir, entry)
            const routePath = join(base, entry)

            if (statSync(fullPath).isDirectory()) {
                scanDir(fullPath, routePath)
            } else {
                files[`/${routePath}`] = fullPath
            }
        }
    }

    scanDir('./src')
    scanDir('../package/dist')

    return files
}

const devFiles = config.isDev ? getDevFiles() : {}

export const handleDevRoute = async (pathname: string, req: Request): Promise<Response | null> => {
    if (!config.isDev) return null

    const specialHandler = specialRoutes[pathname]
    if (specialHandler) {
        return await specialHandler(req)
    }

    const filePath = devFiles[pathname]
    if (filePath) {
        const file = Bun.file(filePath)

        if (pathname.startsWith('/package/dist/') || pathname === '/lib.js') {
            return new Response(file, {
                headers: { 'Content-Type': 'application/javascript' },
            })
        }

        return new Response(file)
    }

    if (pathname === '/lib.js') {
        const libFile = Bun.file('../package/dist/index.js')
        return new Response(libFile, {
            headers: { 'Content-Type': 'application/javascript' },
        })
    }

    return null
}
