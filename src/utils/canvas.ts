import type { PointerAnchor } from '../modes/core'

export const CANVAS_ANCHOR_TYPE = {
  CANVAS: 'CANVAS',
  ANCHOR_SELECT: 'ANCHOR_SELECT',
  ANCHOR_TRANSLATE: 'ANCHOR_TRANSLATE',
} as const
export type CANVAS_ANCHOR_TYPE_KEY = keyof typeof CANVAS_ANCHOR_TYPE

export function getAnchor(target: HTMLElement): PointerAnchor | undefined {
  const anchorTarget = target.closest<HTMLElement>('[data-anchor-type]')
  return anchorTarget
    ? {
        type: anchorTarget.dataset.anchorType as CANVAS_ANCHOR_TYPE_KEY,
        id: anchorTarget.dataset.anchorId ?? '',
      }
    : undefined
}

export function createAnchor(
  type: CANVAS_ANCHOR_TYPE_KEY,
  id?: string
): { [name: string]: string } {
  return {
    'data-anchor-type': type,
    ...(id ? { 'data-anchor-id': id } : {}),
  }
}
