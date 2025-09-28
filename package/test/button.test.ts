import { describe, expect, test, mock } from 'bun:test'
import { renderButtons } from '../src/ui/button'
import type { HeadingPosition } from '../src/types/position'

describe('renderButtons', () => {
    test('should render buttons for each position', () => {
        const h1 = document.createElement('h1')
        h1.textContent = 'Test Heading'

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h1, scrollY: 200, fixedTop: 100 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBeGreaterThan(0)
    })

    test('should apply className when provided', () => {
        const h1 = document.createElement('h1')
        h1.textContent = 'Test'

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions, { className: 'my-button' })
        const button = containers.at(0)?.querySelector('button')

        expect(button).toBeTruthy()
        expect(button?.className).toBe('my-button')
    })

    test('should call onClick callback when button is clicked', () => {
        const h1 = document.createElement('h1')
        h1.textContent = 'Test'

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const mockCallback = mock(() => {})
        const containers = renderButtons(positions, { onClick: mockCallback })
        const button = containers.at(0)?.querySelector('button')

        button?.click()
        expect(mockCallback).toHaveBeenCalledTimes(1)
    })

    test('should apply offset to container position', () => {
        const h1 = document.createElement('h1')
        h1.textContent = 'Test'

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions, { rightOffset: 20 })
        expect(containers.at(0)?.style.right).toBe('20px')
    })

    test('should group buttons within threshold distance', () => {
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        h1.textContent = 'Heading 1'
        h2.textContent = 'Heading 2'

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h2, scrollY: 110, fixedTop: 55 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBe(1)
        expect(containers.at(0)?.children.length).toBe(2)
    })

    test('should handle threshold boundary (exactly 30px)', () => {
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        h1.textContent = 'First'
        h2.textContent = 'Second'

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h2, scrollY: 200, fixedTop: 79 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBe(1)
    })

    test('should handle threshold boundary (just over 30px)', () => {
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        h1.textContent = 'First'
        h2.textContent = 'Second'

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h2, scrollY: 200, fixedTop: 80.1 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBe(2)
    })

    test('should handle negative offset', () => {
        const h1 = document.createElement('h1')
        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions, { rightOffset: -20 })
        expect(containers.at(0)?.style.right).toBe('-20px')
    })

    test('should handle empty textContent in heading', () => {
        const h1 = document.createElement('h1')
        h1.textContent = ''

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions)
        const button = containers.at(0)?.querySelector('button')

        expect(button?.textContent).toBe('')
    })

    test('should handle very long heading text', () => {
        const h1 = document.createElement('h1')
        h1.textContent = 'A'.repeat(1000)

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions)
        const button = containers.at(0)?.querySelector('button')

        expect(button?.textContent?.length).toBe(1000)
    })

    test('should handle special characters in heading text', () => {
        const h1 = document.createElement('h1')
        h1.textContent = '<script>alert("xss")</script>'

        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const containers = renderButtons(positions)
        const button = containers.at(0)?.querySelector('button')

        expect(button?.textContent).toBe('<script>alert("xss")</script>')
    })

    test('should handle multiple onClick calls', () => {
        const h1 = document.createElement('h1')
        const positions: HeadingPosition[] = [{ element: h1, scrollY: 100, fixedTop: 50 }]

        const mockCallback = mock(() => {})
        const containers = renderButtons(positions, { onClick: mockCallback })
        const button = containers.at(0)?.querySelector('button')

        button?.click()
        button?.click()
        button?.click()

        expect(mockCallback).toHaveBeenCalledTimes(3)
    })

    test('should handle three headings all within threshold', () => {
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        const h3 = document.createElement('h3')

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h2, scrollY: 110, fixedTop: 55 },
            { element: h3, scrollY: 120, fixedTop: 60 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBe(1)
        expect(containers.at(0)?.children.length).toBe(3)
    })

    test('should handle alternating close and far headings', () => {
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        const h3 = document.createElement('h3')
        const h4 = document.createElement('h4')

        const positions: HeadingPosition[] = [
            { element: h1, scrollY: 100, fixedTop: 50 },
            { element: h2, scrollY: 200, fixedTop: 150 },
            { element: h3, scrollY: 210, fixedTop: 155 },
            { element: h4, scrollY: 400, fixedTop: 300 },
        ]

        const containers = renderButtons(positions)
        expect(containers.length).toBe(3)
    })

    test('should handle negative fixedTop values', () => {
        const h1 = document.createElement('h1')
        const positions: HeadingPosition[] = [{ element: h1, scrollY: -100, fixedTop: -50 }]

        const containers = renderButtons(positions)
        expect(containers.at(0)?.style.top).toBe('-50px')
    })
})
