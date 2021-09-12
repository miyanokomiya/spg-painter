import type { IVec2 } from 'okageo'
import type { ElementBase } from '../entities'
import { getElementModule, registModule } from './core'

import rectModule from './rect'
registModule(rectModule)

export function createElement<T extends ElementBase>(
  name: string,
  arg?: Partial<T>,
  getId?: () => string
): ElementBase {
  return getElementModule(name).create(arg, getId)
}

export function translateElement(target: ElementBase, vec: IVec2): ElementBase {
  return getElementModule(target.name).translate(target, vec)
}

export function getElementAnchor(target: ElementBase): IVec2 {
  return getElementModule(target.name).getAnchor(target)
}
