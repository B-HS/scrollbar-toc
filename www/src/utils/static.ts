import { existsSync } from 'fs'
import { join } from 'path'
import { config } from '../config'
import { getContentType } from './html'

export const serveStatic = (pathname: string): Response | null => {
    const distPath = join(config.distDir, pathname)

    if (!existsSync(distPath)) {
        return null
    }

    const file = Bun.file(distPath)
    const contentType = getContentType(pathname)

    return new Response(file, {
        headers: { 'Content-Type': contentType },
    })
}

export const handle404 = (pathname: string): Response => {
    if (pathname === '/index.html') {
        return new Response('Please run "bun run build:www" first', {
            status: 404,
        })
    }

    return new Response('Not Found', { status: 404 })
}
