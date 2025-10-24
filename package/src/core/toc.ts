import { parseHeading } from '../utils/parse'
import { calculateHeadingPositions } from '../utils/calculate'
import { renderButtons } from '../ui/button'
import type { ButtonOptions } from '../types/position'

const activeInstances = new Map<HTMLElement, {
    containers: HTMLElement[]
    rafId: number
    cleanup: () => void
}>()

let navigationHandlerInitialized = false

const initializeNavigationHandler = () => {
    if (navigationHandlerInitialized || typeof window === 'undefined' || typeof history === 'undefined') return
    navigationHandlerInitialized = true

    const cleanupDisconnectedInstances = () => {
        activeInstances.forEach((instance, element) => {
            if (!element.isConnected || !document.contains(element)) {
                instance.cleanup()
            }
        })
    }

    window.addEventListener('popstate', cleanupDisconnectedInstances)

    const wrapHistoryMethod = (method: 'pushState' | 'replaceState') => {
        const original = history[method]
        history[method] = function (...args: Parameters<typeof original>) {
            cleanupDisconnectedInstances()
            return original.apply(this, args)
        }
    }

    wrapHistoryMethod('pushState')
    wrapHistoryMethod('replaceState')
}

export const setScrollToc = (htmlElement?: HTMLElement, options?: ButtonOptions) => {
    if (!htmlElement) return () => {}
    if (typeof document === 'undefined') return () => {}

    const body = document.querySelector('body')
    if (!body) return () => {}

    initializeNavigationHandler()

    const prev = activeInstances.get(htmlElement)
    if (prev) {
        prev.cleanup()
    }

    const headings = parseHeading(htmlElement, options?.exceptLevel)
    const positions = calculateHeadingPositions(headings, options?.scrollOffset)
    const containers = renderButtons(positions, options)

    containers.forEach((container) => {
        body.appendChild(container)
    })

    let rafId: number

    const cleanup = () => {
        cancelAnimationFrame(rafId)
        containers.forEach((c) => c.remove())
        activeInstances.delete(htmlElement)
    }

    const check = () => {
        if (!htmlElement.isConnected || !document.contains(htmlElement)) {
            cleanup()
            return
        }
        rafId = requestAnimationFrame(check)
    }

    rafId = requestAnimationFrame(check)

    activeInstances.set(htmlElement, { containers, rafId, cleanup })

    return cleanup
}
