import type { Translation } from './types'

export const kr: Translation = {
    header: {
        docs: '문서',
        examples: '예제',
        liveDemo: '실제 사용 예시',
    },
    introduce: {
        title: 'scrollbar-toc',
        description:
            '모든 JavaScript 웹 프레임워크 및 라이브러리를 위한 스크롤바 스타일 고정 목차 컴포넌트입니다. 문서의 제목(h1~h6)을 자동으로 파싱하고 브라우저 스크롤바 영역에 뷰포트 높이에 비례하여 배치된 직관적인 네비게이션 버튼을 생성합니다.',
        features: {
            zeroDependencies: {
                title: '제로 디펜던시',
                description: '피어 디펜던시가 필요하지 않습니다. 최대 호환성을 위해 순수 DOM API를 사용합니다.',
            },
            frameworkAgnostic: {
                title: '프레임워크 독립적',
                description: 'React, Vue, Svelte 또는 순수 JavaScript와 함께 작동합니다. 범용 호환성을 제공합니다.',
            },
        },
        installation: '설치',
        quickStart: '빠른 시작',
        quickStartDescription: '문서에 목차를 추가하는 가장 간단한 방법:',
        frameworkIntegration: '프레임워크 통합',
        react: 'React',
        reactDescription: 'useEffect와 useRef를 사용한 React 통합:',
        keyFeatures: '주요 기능',
        automaticParsing: '자동 제목 감지',
        automaticParsingDescription:
            '라이브러리는 문서의 모든 제목 요소(h1-h6)를 자동으로 감지하고 문서 높이에 비례하여 배치된 네비게이션 버튼을 생성합니다.',
        smartPositioning: '겹침 방지 스마트 포지셔닝',
        smartPositioningDescription:
            '버튼은 문서 스크롤 위치를 뷰포트 좌표에 매핑하는 정교한 알고리즘을 사용하여 배치됩니다. 버튼들이 너무 가까이 있을 경우 자동으로 그룹화하고 재배치하여 겹침을 방지하며, 버튼 높이 기반의 최소 간격(기본값: 16px)을 보장합니다.',
        customization: '광범위한 커스터마이징',
        customizationDescription:
            'CSS 클래스로 외관을 커스터마이즈하고, 오프셋으로 위치를 조정하며, 분석이나 기타 기능을 위한 커스텀 클릭 핸들러를 추가할 수 있습니다.',
        levelFiltering: '선택적 제목 레벨',
        levelFilteringDescription:
            'exceptLevel 옵션을 사용하여 TOC에 포함할 제목 레벨을 선택할 수 있습니다. 예를 들어, exceptLevel: [1]은 h1 요소를 제외하고, exceptLevel: [1, 2]는 h1과 h2 요소를 모두 제외합니다.',
        browserSupport: '브라우저 지원',
        bundleSize: '번들 크기',
        bundleSizeDescription: '프로덕션에 최적화된 경량 라이브러리:',
    },
    sample: {
        title: '예제',
        description: '다양한 프레임워크와 scrollbar-toc을 통합하고 외관과 동작을 커스터마이즈하는 방법을 보여주는 포괄적인 예제입니다.',
        vueIntegration: 'Vue 3 통합',
        vueDescription: 'Vue 3 Composition API와 반응형 참조를 사용한 예제:',
        svelteIntegration: 'Svelte 통합',
        svelteDescription: 'onMount 라이프사이클과 bind:this를 사용한 Svelte 통합:',
        vanillaJs: '순수 JavaScript',
        vanillaJsDescription: '프레임워크 디펜던시 없이 순수 JavaScript로 구현:',
        advancedConfiguration: '고급 설정',
        advancedConfigurationDescription: '타입 정의 및 사용 예제가 포함된 완전한 옵션 인터페이스:',
        customStyling: '커스텀 스타일링',
        customStylingDescription: '그라데이션, 애니메이션 및 반응형 동작을 포함한 고급 CSS 스타일링:',
        performanceConsiderations: '성능 고려사항',
        lazyInitialization: '지연 초기화',
        lazyInitializationDescription:
            '라이브러리는 임포트 시점이 아니라 setScrollToc이 호출될 때만 계산을 수행합니다. 이를 통해 초기 페이지 로드에 미치는 영향을 최소화합니다.',
        domOptimization: 'DOM 최적화',
        domOptimizationDescription:
            '제목 감지는 단일 querySelectorAll 호출을 사용하며, 위치 계산은 1000개 이상의 제목이 있는 대용량 문서에 최적화되어 있습니다.',
        memoryEfficiency: '메모리 효율성',
        memoryEfficiencyDescription:
            '버튼 요소는 효율적으로 생성되며 이벤트 리스너는 싱글 페이지 애플리케이션에서 메모리 누수를 방지하기 위해 적절히 관리됩니다.',
        troubleshooting: '문제 해결',
        ssrCompatibility: 'SSR 호환성',
        ssrCompatibilityDescription:
            '라이브러리는 document 객체의 존재를 확인하므로 서버 사이드 렌더링 환경에서 안전하게 사용할 수 있습니다.',
        dynamicContent: '동적 콘텐츠',
        dynamicContentDescription:
            '초기 렌더링 후 제목이 동적으로 추가되면 setScrollToc을 다시 호출하여 목차를 새로고침할 수 있습니다.',
        mobileConsiderations: '모바일 고려사항',
        mobileConsiderationsDescription:
            'TOC 버튼은 화면 공간을 보존하기 위해 모바일 기기(768px 이하)에서 자동으로 숨겨집니다. 이는 CSS 미디어 쿼리로 커스터마이즈할 수 있습니다.',
    },
    liveDemo: {
        title: '실제 사용 예시',
        description: '복잡한 콘텐츠 구조를 가진 실제 웹사이트에서 scrollbar-toc가 동작하는 모습을 확인하세요.',
        blogExample: '기술 블로그 포스트',
        blogExampleDescription: '여러 단계로 중첩된 제목과 긴 콘텐츠를 가진 실제 블로그 글에서 scrollbar-toc를 시연합니다.',
        visitSite: '블로그 방문하기',
    },
}