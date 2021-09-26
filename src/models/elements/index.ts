import type { IVec2 } from 'okageo'
import type { ElementBase } from '../entities'
import type { ElementBoundingBox } from './core'
import { elementModuleMap } from './core'

import rectModule from './rect'
elementModuleMap.registModule(rectModule.name, rectModule)

export function createElement<T extends ElementBase>(
  name: string,
  arg?: Partial<T>,
  getId?: () => string
): ElementBase {
  return elementModuleMap.getModule(name).create(arg, getId)
}

export function translateElement(target: ElementBase, vec: IVec2): ElementBase {
  return elementModuleMap.getModule(target.name).translate(target, vec)
}

export function getElementAnchor(target: ElementBase): IVec2 {
  return elementModuleMap.getModule(target.name).getAnchor(target)
}

export function getElementBoundBox(target: ElementBase): ElementBoundingBox {
  return elementModuleMap.getModule(target.name).getBoundBox(target)
}
