# bscroll-toc
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/cf3bb89b-ddff-4ba7-89df-6a68fa1f0ab7" />

## Link
- https://b-hs.github.io/scrollbar-toc/

## Next.js 16 Cache Components Support

This library now supports Next.js 16's `cacheComponents` feature. The cleanup mechanism has been improved to handle cached component scenarios where elements remain in memory but are no longer visible.

### Changes in v1.1.0

**Improved Cleanup Mechanism:**
- Changed from `WeakMap` to `Map` for explicit cleanup management
- Added navigation event listeners (`pushState`, `replaceState`, `popstate`)
- Enhanced element disconnection detection with `document.contains()` check
- Automatic cleanup on page navigation to prevent memory leaks

### For React Users (Recommended Pattern)

If you're using React (especially with Next.js), create a custom hook for better lifecycle integration:

```typescript
// hooks/useScrollToc.ts
import { useEffect, type RefObject } from 'react'
import { setScrollToc } from 'scrollbar-toc'
import type { ButtonOptions } from 'scrollbar-toc'

export const useScrollToc = (
    elementRef: RefObject<HTMLElement>,
    options?: ButtonOptions
) => {
    useEffect(() => {
        if (!elementRef.current) return
        const cleanup = setScrollToc(elementRef.current, options)
        return cleanup
    }, [elementRef, options])
}
```

**Usage:**
```typescript
import { useRef } from 'react'
import { useScrollToc } from './hooks/useScrollToc'

export default function Page() {
    const contentRef = useRef<HTMLDivElement>(null)

    useScrollToc(contentRef, {
        className: 'custom-toc',
        scrollOffset: -100
    })

    return <div ref={contentRef}>...</div>
}
```

This pattern ensures proper cleanup when components unmount, even in Next.js 16's cached component environment.
