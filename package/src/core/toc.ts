import { parseHeading } from '../utils/parse'
import { calculateHeadingPositions } from '../utils/calculate'
import { renderButtons } from '../ui/button'
import type { ButtonOptions } from '../types/position'

const containerMap = new WeakMap<HTMLElement, { containers: HTMLElement[]; rafId: number }>()

export const setScrollToc = (htmlElement?: HTMLElement, options?: ButtonOptions) => {
    if (!htmlElement) return () => {}
    if (typeof document === 'undefined') return () => {}

    const body = document.querySelector('body')
    if (!body) return () => {}

    const prev = containerMap.get(htmlElement)
    if (prev) {
        cancelAnimationFrame(prev.rafId)
        prev.containers.forEach((c) => c.remove())
    }

    const headings = parseHeading(htmlElement)
    const positions = calculateHeadingPositions(headings, options?.scrollOffset)
    const containers = renderButtons(positions, options)

    containers.forEach((container) => {
        body.appendChild(container)
    })

    let rafId: number

    const cleanup = () => {
        cancelAnimationFrame(rafId)
        containers.forEach((c) => c.remove())
        containerMap.delete(htmlElement)
    }

    const check = () => {
        if (!htmlElement.isConnected) {
            cleanup()
            return
        }
        rafId = requestAnimationFrame(check)
    }

    rafId = requestAnimationFrame(check)

    containerMap.set(htmlElement, { containers, rafId })

    return cleanup
}
