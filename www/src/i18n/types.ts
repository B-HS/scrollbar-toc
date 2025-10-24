export type Language = 'en' | 'kr'

export type Translation = {
    header: {
        docs: string
        examples: string
        liveDemo: string
    }
    introduce: {
        title: string
        description: string
        features: {
            zeroDependencies: {
                title: string
                description: string
            }
            frameworkAgnostic: {
                title: string
                description: string
            }
        }
        installation: string
        quickStart: string
        quickStartDescription: string
        frameworkIntegration: string
        react: string
        reactDescription: string
        keyFeatures: string
        automaticParsing: string
        automaticParsingDescription: string
        smartPositioning: string
        smartPositioningDescription: string
        customization: string
        customizationDescription: string
        levelFiltering: string
        levelFilteringDescription: string
        browserSupport: string
        bundleSize: string
        bundleSizeDescription: string
    }
    sample: {
        title: string
        description: string
        vueIntegration: string
        vueDescription: string
        svelteIntegration: string
        svelteDescription: string
        vanillaJs: string
        vanillaJsDescription: string
        advancedConfiguration: string
        advancedConfigurationDescription: string
        customStyling: string
        customStylingDescription: string
        performanceConsiderations: string
        lazyInitialization: string
        lazyInitializationDescription: string
        domOptimization: string
        domOptimizationDescription: string
        memoryEfficiency: string
        memoryEfficiencyDescription: string
        nextjsSupport: string
        nextjsSupportDescription: string
        reactHookPattern: string
        reactHookPatternDescription: string
        troubleshooting: string
        ssrCompatibility: string
        ssrCompatibilityDescription: string
        dynamicContent: string
        dynamicContentDescription: string
        mobileConsiderations: string
        mobileConsiderationsDescription: string
    }
    liveDemo: {
        title: string
        description: string
        blogExample: string
        blogExampleDescription: string
        visitSite: string
    }
}