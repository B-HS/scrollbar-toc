import type { ButtonOptions, HeadingPosition } from '../types/position'

export const renderButtons = (positions: HeadingPosition[], options?: ButtonOptions): HTMLElement[] => {
    const buttonHeight = options?.buttonHeight || 16
    const minGap = buttonHeight
    const groups: { top: number; items: HeadingPosition[] }[] = []

    positions.forEach((pos) => {
        const existingGroup = groups.find((g) => Math.abs(g.top - pos.fixedTop) < minGap)
        if (existingGroup) {
            existingGroup.items.push(pos)
        } else {
            groups.push({ top: pos.fixedTop, items: [pos] })
        }
    })

    groups.sort((a, b) => a.top - b.top)

    for (let i = 1; i < groups.length; i++) {
        const prev = groups[i - 1]!
        const curr = groups[i]!
        const prevBottom = prev.top + prev.items.length * (buttonHeight + 4) - 4

        if (curr.top < prevBottom + minGap) {
            curr.top = prevBottom + minGap
        }
    }

    const containers: HTMLElement[] = []
    const offset = options?.rightOffset || 0

    groups.forEach((group) => {
        const container = document.createElement('div')
        container.setAttribute('data-bscroll-toc', 'true')
        container.style.position = 'fixed'
        container.style.top = `${group.top}px`
        container.style.right = `${offset}px`
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.alignItems = 'flex-end'
        container.style.gap = '4px'

        group.items.forEach((position) => {
            const button = createButton(position, options)

            button.addEventListener('click', () => {
                const scrollOffset = options?.scrollOffset || 0
                window.scrollTo({
                    top: position.scrollY + scrollOffset,
                    behavior: 'smooth',
                })

                if (options?.onClick) {
                    options.onClick(position)
                }
            })

            container.appendChild(button)
        })

        containers.push(container)
    })

    return containers
}

const createButton = (position: HeadingPosition, options?: ButtonOptions) => {
    const button = document.createElement('button')
    button.textContent = position.element.textContent || ''
    button.className = options?.className || ''

    return button
}
