export const parseHeading = (htmlElement: HTMLElement, exceptLevel?: number[]) => {
    const levels = [1, 2, 3, 4, 5, 6].filter((level) => !exceptLevel?.includes(level))
    const selector = levels.map((level) => `h${level}`).join(', ')
    const headings = htmlElement.querySelectorAll(selector)
    return headings
}
