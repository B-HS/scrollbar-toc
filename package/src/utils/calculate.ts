import type { HeadingPosition } from '../types/position'

export const calculateHeadingPositions = (headings: NodeListOf<Element>, scrollOffset = 0): HeadingPosition[] => {
    const documentHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight
    const maxScroll = documentHeight - viewportHeight
    const scrollbarHeight = viewportHeight

    return Array.from(headings).map((heading) => {
        const element = heading as HTMLElement
        let offsetTop = 0
        let current: HTMLElement | null = element

        while (current) {
            offsetTop += current.offsetTop
            current = current.offsetParent as HTMLElement | null
        }

        const scrollRatio = maxScroll > 0 ? Math.min((offsetTop + scrollOffset) / documentHeight, 1) : 0
        const buttonTop = scrollRatio * scrollbarHeight

        return {
            element: heading,
            scrollY: offsetTop,
            fixedTop: buttonTop,
        }
    })
}
