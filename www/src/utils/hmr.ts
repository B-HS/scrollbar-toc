import { watch } from 'fs'
import { config } from '../config'

const clients = new Set<ReadableStreamDefaultController>()

export const notifyClients = () => {
    for (const controller of clients) {
        try {
            controller.enqueue('data: reload\n\n')
        } catch {
            clients.delete(controller)
        }
    }
}

export const startFileWatcher = () => {
    if (!config.isDev) return

    watch('./src', { recursive: true }, (_eventType, filename) => {
        if (filename) {
            console.log(`📝 File changed: ${filename}`)
            notifyClients()
        }
    })

    watch('../package/dist', { recursive: true }, (_eventType, filename) => {
        if (filename) {
            console.log(`📦 Package changed: ${filename}`)
            notifyClients()
        }
    })
}

export const createHMRStream = () => {
    return new ReadableStream({
        start(controller) {
            clients.add(controller)
            controller.enqueue('data: connected\n\n')
        },
        cancel(controller) {
            clients.delete(controller as ReadableStreamDefaultController)
        },
    })
}
