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

    test('should return cleanup function', () => {
        const cleanup = setScrollToc(testContainer)

        expect(typeof cleanup).toBe('function')
    })

    test('cleanup should remove TOC buttons from body', () => {
        const cleanup = setScrollToc(testContainer)
        const buttonsBeforeCleanup = document.body.querySelectorAll('button').length

        cleanup()

        const buttonsAfterCleanup = document.body.querySelectorAll('button').length
        expect(buttonsAfterCleanup).toBeLessThan(buttonsBeforeCleanup)
    })

    test('cleanup should cancel animation frame', () => {
        const cleanup = setScrollToc(testContainer)

        expect(() => cleanup()).not.toThrow()
    })

    test('should exclude specified heading levels with exceptLevel', () => {
        setScrollToc(testContainer, { exceptLevel: [1, 3] })

        const buttons = document.body.querySelectorAll('button')
        expect(buttons.length).toBe(1)

        const buttonText = Array.from(buttons).map((b) => b.textContent)
        expect(buttonText).toContain('Section 1')
        expect(buttonText).not.toContain('Title')
        expect(buttonText).not.toContain('Subsection')
    })

    test('should handle multiple calls with same element (WeakMap)', () => {
        setScrollToc(testContainer)
        const buttons1 = document.body.querySelectorAll('button').length

        const cleanup2 = setScrollToc(testContainer)
        const buttons2 = document.body.querySelectorAll('button').length

        expect(buttons1).toBe(buttons2)

        cleanup2()
        expect(document.body.querySelectorAll('button').length).toBe(0)
    })

    test('should auto cleanup when element is disconnected', async () => {
        setScrollToc(testContainer)
        const buttonsBeforeRemove = document.body.querySelectorAll('button').length
        expect(buttonsBeforeRemove).toBeGreaterThan(0)

        testContainer.remove()

        await new Promise((resolve) => setTimeout(resolve, 100))

        const buttonsAfterRemove = document.body.querySelectorAll('button').length
        expect(buttonsAfterRemove).toBe(0)
    })

    test('should apply scrollOffset option', () => {
        setScrollToc(testContainer, { scrollOffset: -100 })

        const buttons = document.body.querySelectorAll('button')
        expect(buttons.length).toBe(3)
    })
})
