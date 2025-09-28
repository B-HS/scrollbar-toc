export const parseHeading = (htmlElement: HTMLElement) => {
    const headings = htmlElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    return headings
}
