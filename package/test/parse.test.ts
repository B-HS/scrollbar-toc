import { describe, expect, test } from 'bun:test'
import { parseHeading } from '../src/utils/parse'

describe('parseHeading', () => {
    test('should extract all h1-h6 headings from HTML', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>Title</h1>
            <p>Content</p>
            <h2>Section</h2>
            <h3>Subsection</h3>
            <div>
                <h4>Deep heading</h4>
            </div>
            <h5>H5 heading</h5>
            <h6>H6 heading</h6>
        `

        const headings = parseHeading(div)
        expect(headings.length).toBe(6)
        expect(headings[0]?.tagName).toBe('H1')
        expect(headings[1]?.tagName).toBe('H2')
        expect(headings[5]?.tagName).toBe('H6')
    })

    test('should return empty NodeList when no headings exist', () => {
        const div = document.createElement('div')
        div.innerHTML = '<p>No headings here</p>'

        const headings = parseHeading(div)
        expect(headings.length).toBe(0)
    })

    test('should extract headings with text content', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>First Heading</h1>
            <h2>Second Heading</h2>
        `

        const headings = parseHeading(div)
        expect(headings[0]?.textContent).toBe('First Heading')
        expect(headings[1]?.textContent).toBe('Second Heading')
    })

    test('should handle headings with display:none', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1 style="display:none">Hidden</h1><h2>Visible</h2>'

        const headings = parseHeading(div)
        expect(headings.length).toBe(2)
    })

    test('should handle deeply nested headings', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div>
                <section>
                    <article>
                        <div>
                            <h1>Deep H1</h1>
                        </div>
                    </article>
                </section>
            </div>
        `

        const headings = parseHeading(div)
        expect(headings.length).toBe(1)
        expect(headings[0]?.textContent).toBe('Deep H1')
    })

    test('should handle very large number of headings', () => {
        const div = document.createElement('div')
        let html = ''
        for (let i = 1; i <= 1000; i++) {
            html += `<h${(i % 6) + 1}>Heading ${i}</h${(i % 6) + 1}>`
        }
        div.innerHTML = html

        const headings = parseHeading(div)
        expect(headings.length).toBe(1000)
    })

    test('should handle headings with unicode characters', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>日本語 제목 العربية 🚀</h1>'

        const headings = parseHeading(div)
        expect(headings.length).toBe(1)
        expect(headings[0]?.textContent).toBe('日本語 제목 العربية 🚀')
    })

    test('should maintain document order of headings', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h6>Sixth</h6>
            <h1>First</h1>
            <h3>Third</h3>
        `

        const headings = parseHeading(div)
        expect(headings[0]?.textContent).toBe('Sixth')
        expect(headings[1]?.textContent).toBe('First')
        expect(headings[2]?.textContent).toBe('Third')
    })

    test('should exclude specified levels with exceptLevel', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>Title</h1>
            <h2>Section</h2>
            <h3>Subsection</h3>
            <h4>Deep heading</h4>
        `

        const headings = parseHeading(div, [1, 3])
        expect(headings.length).toBe(2)
        expect(headings[0]?.tagName).toBe('H2')
        expect(headings[1]?.tagName).toBe('H4')
    })

    test('should exclude all levels if all are in exceptLevel', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Title</h1><h2>Section</h2>'

        expect(() => parseHeading(div, [1, 2, 3, 4, 5, 6])).toThrow()
    })

    test('should handle empty exceptLevel array', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>Title</h1><h2>Section</h2><h3>Subsection</h3>'

        const headings = parseHeading(div, [])
        expect(headings.length).toBe(3)
    })

    test('should handle single level exclusion', () => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>H1</h1>
            <h2>H2</h2>
            <h3>H3</h3>
            <h4>H4</h4>
            <h5>H5</h5>
            <h6>H6</h6>
        `

        const headings = parseHeading(div, [3])
        expect(headings.length).toBe(5)

        const tags = Array.from(headings).map((h) => h.tagName)
        expect(tags).toContain('H1')
        expect(tags).toContain('H2')
        expect(tags).not.toContain('H3')
        expect(tags).toContain('H4')
        expect(tags).toContain('H5')
        expect(tags).toContain('H6')
    })

    test('should handle multiple non-consecutive level exclusions', () => {
        const div = document.createElement('div')
        div.innerHTML = '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>'

        const headings = parseHeading(div, [1, 3, 5])
        expect(headings.length).toBe(3)

        const tags = Array.from(headings).map((h) => h.tagName)
        expect(tags).toEqual(['H2', 'H4', 'H6'])
    })
})
