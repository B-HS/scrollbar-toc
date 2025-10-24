import type { Translation } from './types'

export const en: Translation = {
    header: {
        docs: 'Docs',
        examples: 'Examples',
        liveDemo: 'Live Demo',
    },
    introduce: {
        title: 'scrollbar-toc',
        description:
            'A scrollbar-style fixed table of contents component for all JavaScript web frameworks and libraries. Automatically parse headings (h1~h6) in documents and create intuitive navigation buttons positioned proportionally to viewport height in the browser scrollbar area.',
        features: {
            zeroDependencies: {
                title: 'Zero Dependencies',
                description: 'No peer dependencies required. Works with pure DOM APIs for maximum compatibility.',
            },
            frameworkAgnostic: {
                title: 'Framework Agnostic',
                description: 'Works with React, Vue, Svelte, or vanilla JavaScript. Universal compatibility.',
            },
        },
        installation: 'Installation',
        quickStart: 'Quick Start',
        quickStartDescription: 'The simplest way to add a table of contents to your document:',
        frameworkIntegration: 'Framework Integration',
        react: 'React',
        reactDescription: 'Integration with React using useEffect and useRef:',
        keyFeatures: 'Key Features',
        automaticParsing: 'Automatic Heading Detection',
        automaticParsingDescription:
            'The library automatically detects all heading elements (h1-h6) in your document and creates navigation buttons positioned proportionally to the document height.',
        smartPositioning: 'Smart Positioning with Overlap Prevention',
        smartPositioningDescription:
            'Buttons are positioned using a sophisticated algorithm that maps document scroll positions to viewport coordinates. When buttons are too close together, they are automatically grouped and repositioned to prevent overlap, ensuring clear navigation with a minimum gap based on button height (default: 16px).',
        customization: 'Extensive Customization',
        customizationDescription:
            'Customize appearance with CSS classes, adjust positioning with offsets, and add custom click handlers for analytics or other functionality.',
        levelFiltering: 'Selective Heading Levels',
        levelFilteringDescription:
            'Choose which heading levels to include in the TOC using the exceptLevel option. For example, exceptLevel: [1] excludes h1 elements, exceptLevel: [1, 2] excludes both h1 and h2 elements.',
        browserSupport: 'Browser Support',
        bundleSize: 'Bundle Size',
        bundleSizeDescription: 'Lightweight and optimized for production:',
    },
    sample: {
        title: 'Examples',
        description:
            'Comprehensive examples showing how to integrate scrollbar-toc with different frameworks and customize its appearance and behavior.',
        vueIntegration: 'Vue 3 Integration',
        vueDescription: 'Using Vue 3 Composition API with reactive references:',
        svelteIntegration: 'Svelte Integration',
        svelteDescription: 'Integration with Svelte using onMount lifecycle and bind:this:',
        vanillaJs: 'Vanilla JavaScript',
        vanillaJsDescription: 'Pure JavaScript implementation without any framework dependencies:',
        advancedConfiguration: 'Advanced Configuration',
        advancedConfigurationDescription: 'Complete options interface with type definitions and usage examples:',
        customStyling: 'Custom Styling',
        customStylingDescription: 'Advanced CSS styling with gradients, animations, and responsive behavior:',
        performanceConsiderations: 'Performance Considerations',
        lazyInitialization: 'Lazy Initialization',
        lazyInitializationDescription:
            'The library only performs calculations when setScrollToc is called, not during import. This ensures minimal impact on initial page load.',
        domOptimization: 'DOM Optimization',
        domOptimizationDescription:
            'Heading detection uses a single querySelectorAll call, and position calculations are optimized for large documents with 1000+ headings.',
        memoryEfficiency: 'Memory Efficiency',
        memoryEfficiencyDescription:
            'Button elements are created efficiently and event listeners are properly managed to prevent memory leaks in single-page applications.',
        nextjsSupport: 'Next.js 16 Support',
        nextjsSupportDescription:
            'The library fully supports Next.js 16\'s cacheComponents feature. Navigation event listeners automatically perform cleanup on page transitions, preventing memory leaks even in cached component environments.',
        reactHookPattern: 'React Hook Pattern (Recommended)',
        reactHookPatternDescription:
            'For React environments (especially Next.js), we recommend using a custom hook pattern with useEffect. This pattern fully integrates with component lifecycle for safer cleanup:',
        troubleshooting: 'Troubleshooting',
        ssrCompatibility: 'SSR Compatibility',
        ssrCompatibilityDescription:
            'The library checks for document object existence, making it safe to use in server-side rendering environments.',
        dynamicContent: 'Dynamic Content',
        dynamicContentDescription:
            'If headings are added dynamically after initial render, call setScrollToc again to refresh the table of contents.',
        mobileConsiderations: 'Mobile Considerations',
        mobileConsiderationsDescription:
            'TOC buttons are automatically hidden on mobile devices (768px and below) to preserve screen real estate. This can be customized with CSS media queries.',
    },
    liveDemo: {
        title: 'Live Demo',
        description: 'See scrollbar-toc in action on real websites with complex content structure.',
        blogExample: 'Technical Blog Post',
        blogExampleDescription: 'A real blog article demonstrating scrollbar-toc with multiple nested headings and long-form content.',
        visitSite: 'Visit Blog',
    },
}