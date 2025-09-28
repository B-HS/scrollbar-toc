import { describe, expect, test } from 'bun:test'
import { calculateHeadingPositions } from '../src/utils/calculate'

describe('calculateHeadingPositions', () => {
    test('should calculate positions for all headings', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
        `
        document.body.appendChild(div)

        const headings = div.querySelectorAll('h1, h2, h3')
        const positions = calculateHeadingPositions(headings)

        expect(positions.length).toBe(3)
        expect(positions.at(0)).toHaveProperty('element')
        expect(positions.at(0)).toHaveProperty('scrollY')
        expect(positions.at(0)).toHaveProperty('fixedTop')
        expect(typeof positions.at(0)?.scrollY).toBe('number')
        expect(typeof positions.at(0)?.fixedTop).toBe('number')

        document.body.removeChild(div)
    })

    test('should return empty array for no headings', () => {
        const emptyNodeList = document.querySelectorAll('h1.nonexistent')
        const positions = calculateHeadingPositions(emptyNodeList)

        expect(positions.length).toBe(0)
    })

    test('should have fixedTop within viewport bounds', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Test</h1>'
        document.body.appendChild(div)

        const headings = div.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings)

        expect(positions.at(0)?.fixedTop).toBeGreaterThanOrEqual(0)
        expect(positions.at(0)?.fixedTop).toBeLessThanOrEqual(window.innerHeight)

        document.body.removeChild(div)
    })

    test('should handle very short documents (scrollableHeight = 0)', () => {
        const container = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = 'Short document'
        container.appendChild(h1)
        document.body.appendChild(container)

        const headings = container.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings)

        expect(positions.length).toBe(1)
        expect(typeof positions.at(0)?.fixedTop).toBe('number')

        document.body.removeChild(container)
    })

    test('should handle negative scrollY values', () => {
        const container = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = 'Test'
        container.appendChild(h1)
        document.body.appendChild(container)

        Object.defineProperty(h1, 'offsetTop', {
            configurable: true,
            value: -100,
        })

        const headings = container.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings)

        expect(positions.at(0)?.scrollY).toBeLessThanOrEqual(0)

        document.body.removeChild(container)
    })

    test('should handle elements with null offsetParent', () => {
        const container = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = 'Detached'
        h1.style.position = 'fixed'
        container.appendChild(h1)
        document.body.appendChild(container)

        const headings = container.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings)

        expect(positions.length).toBe(1)
        expect(typeof positions.at(0)?.scrollY).toBe('number')

        document.body.removeChild(container)
    })

    test('should handle deeply nested heading structure', () => {
        const container = document.createElement('div')
        const level1 = document.createElement('div')
        const level2 = document.createElement('div')
        const level3 = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = 'Deep heading'

        container.appendChild(level1)
        level1.appendChild(level2)
        level2.appendChild(level3)
        level3.appendChild(h1)
        document.body.appendChild(container)

        const headings = container.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings)

        expect(positions.length).toBe(1)
        expect(positions.at(0)?.element).toBe(h1)

        document.body.removeChild(container)
    })

    test('should apply scrollOffset parameter', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Test</h1>'
        document.body.appendChild(div)

        const headings = div.querySelectorAll('h1')
        const positionsWithoutOffset = calculateHeadingPositions(headings, 0)
        const positionsWithOffset = calculateHeadingPositions(headings, 100)

        expect(positionsWithOffset.at(0)?.fixedTop).toBeGreaterThanOrEqual(positionsWithoutOffset.at(0)?.fixedTop ?? 0)

        document.body.removeChild(div)
    })

    test('should handle negative scrollOffset', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Test</h1>'
        document.body.appendChild(div)

        const headings = div.querySelectorAll('h1')
        const positionsWithNegativeOffset = calculateHeadingPositions(headings, -100)

        expect(typeof positionsWithNegativeOffset.at(0)?.fixedTop).toBe('number')
        expect(positionsWithNegativeOffset.at(0)?.fixedTop).toBeGreaterThanOrEqual(0)

        document.body.removeChild(div)
    })

    test('should handle large scrollOffset values', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Test</h1>'
        document.body.appendChild(div)

        const headings = div.querySelectorAll('h1')
        const positions = calculateHeadingPositions(headings, 10000)

        expect(positions.at(0)?.fixedTop).toBeLessThanOrEqual(window.innerHeight)

        document.body.removeChild(div)
    })
})
