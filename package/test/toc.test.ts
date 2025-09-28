import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { setScrollToc } from '../src/core/toc'

describe('setScrollToc', () => {
    let testContainer: HTMLDivElement

    beforeEach(() => {
        testContainer = document.createElement('div')
        testContainer.innerHTML = `
            <h1>Title</h1>
            <p>Content</p>
            <h2>Section 1</h2>
            <p>More content</p>
            <h3>Subsection</h3>
            <p>Even more content</p>
        `
        document.body.appendChild(testContainer)
    })

    afterEach(() => {
        document.body.innerHTML = ''
    })

    test('should add TOC buttons to body', () => {
        const initialChildCount = document.body.children.length
        setScrollToc(testContainer)

        expect(document.body.children.length).toBeGreaterThan(initialChildCount)
    })

    test('should create buttons for all headings', () => {
        setScrollToc(testContainer)

        const buttons = document.body.querySelectorAll('button')
        expect(buttons.length).toBe(3)
    })

    test('should apply custom className to buttons', () => {
        setScrollToc(testContainer, { className: 'custom-toc' })

        const buttons = document.body.querySelectorAll('button.custom-toc')
        expect(buttons.length).toBe(3)
    })

    test('should not throw when no headings exist', () => {
        const emptyDiv = document.createElement('div')
        emptyDiv.innerHTML = '<p>No headings</p>'
        document.body.appendChild(emptyDiv)

        expect(() => setScrollToc(emptyDiv)).not.toThrow()
    })

    test('should handle undefined htmlElement gracefully', () => {
        expect(() => setScrollToc(undefined)).not.toThrow()
    })

    test('should set button text content from heading', () => {
        setScrollToc(testContainer)

        const buttons = Array.from(document.body.querySelectorAll('button'))
        expect(buttons[0]?.textContent).toBe('Title')
        expect(buttons[1]?.textContent).toBe('Section 1')
        expect(buttons[2]?.textContent).toBe('Subsection')
    })
})
