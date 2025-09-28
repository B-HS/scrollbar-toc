export const reactExampleCode = `import { useEffect, useRef } from 'react'
import { setScrollToc } from 'scrollbar-toc'

export const Article = () => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            setScrollToc(contentRef.current, {
                className: 'article-toc',
                scrollOffset: -64,
                onClick: (pos) => {
                    analytics.track('toc_clicked', {
                        heading: pos.element.textContent
                    })
                }
            })
        }
    }, [])

    return <div ref={contentRef}>{/* Content */}</div>
}`

export const installCode = `npm install scrollbar-toc`

export const basicUsageCode = `
import { setScrollToc } from 'scrollbar-toc'

const article = document.querySelector('article')
setScrollToc(article)

setScrollToc(article, {
    className: 'custom-toc',
    rightOffset: 20,
    scrollOffset: -80,
    onClick: (position) => {
        console.log('Navigated to:', position.element.textContent)
    }
})
`

export const vueExampleCode = `<template>
    <div ref="contentRef">
        <!-- Markdown content -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setScrollToc } from 'scrollbar-toc'

const contentRef = ref(null)

onMounted(() => {
    if (contentRef.value) {
        setScrollToc(contentRef.value, {
            className: 'vue-toc',
            rightOffset: 16
        })
    }
})
</script>`

export const svelteExampleCode = `<script>
    import { onMount } from 'svelte'
    import { setScrollToc } from 'scrollbar-toc'

    let contentEl

    onMount(() => {
        if (contentEl) {
            setScrollToc(contentEl, {
                className: 'svelte-toc',
                scrollOffset: -80
            })
        }
    })
</script>

<div bind:this={contentEl}>
    <!-- Content -->
</div>`

export const vanillaExampleCode = `import { setScrollToc } from 'scrollbar-toc'

document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('article')
    setScrollToc(article, {
        className: 'custom-toc',
        rightOffset: 20,
        scrollOffset: -100,
        onClick: (position) => {
            console.log('Navigated:', position.element.tagName)
        }
    })
})`

export const customStylingCode = `.scroll-toc-button {
    padding: 8px 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.scroll-toc-button:hover {
    transform: translateX(-4px) translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.scroll-toc-button:active {
    transform: translateX(-2px) translateY(-1px);
}

@media (max-width: 768px) {
    .scroll-toc-button {
        display: none;
    }
}`

export const optionsCode = `type ButtonOptions = {
    className?: string
    onClick?: ButtonClickCallback
    rightOffset?: number
    scrollOffset?: number
}

setScrollToc(element, {
    className: 'my-toc-button',
    rightOffset: 20,
    scrollOffset: -80,
    onClick: (position) => {
        gtag('event', 'toc_navigation', {
            heading_text: position.element.textContent,
            heading_level: position.element.tagName
        })
    }
})`
