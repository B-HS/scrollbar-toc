import { Window } from 'happy-dom'

const window = new Window()
const document = window.document

global.window = window as any
global.document = document as any
global.HTMLElement = window.HTMLElement as any
global.Element = window.Element as any
global.requestAnimationFrame = ((cb: FrameRequestCallback) => setTimeout(cb, 0)) as any
global.cancelAnimationFrame = ((id: number) => clearTimeout(id)) as any
