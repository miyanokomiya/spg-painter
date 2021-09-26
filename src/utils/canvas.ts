import type { PointerAnchor } from '../modes/core'

export const CANVAS_ANCHOR_TYPE = {
  CANVAS: 'CANVAS',
  ANCHOR_TRANSLATE: 'ANCHOR_TRANSLATE',
} as const
export type CANVAS_ANCHOR_TYPE_KEY = keyof typeof CANVAS_ANCHOR_TYPE

export function getAnchor(target: HTMLElement): PointerAnchor | undefined {
  const type = target.dataset.anchorType
  return type
    ? {
        type: type as CANVAS_ANCHOR_TYPE_KEY,
        id: target.dataset.anchorId ?? '',
      }
    : undefined
}
