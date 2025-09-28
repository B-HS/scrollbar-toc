export type HeadingPosition = {
    element: Element
    scrollY: number
    fixedTop: number
}

export type ButtonClickCallback = (position: HeadingPosition) => void

export type ButtonOptions = {
    className?: string
    onClick?: ButtonClickCallback
    rightOffset?: number
    scrollOffset?: number
    buttonTopOffset?: number
}
