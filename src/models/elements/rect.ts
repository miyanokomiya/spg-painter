import type { IVec2 } from 'okageo'
import type { ElementModule, ElementBase } from './core'
import { createElementBase } from './core'

const name = 'rect'

export interface ElementRect extends ElementBase {
  x: number
  y: number
  width: number
  height: number
}

function create(arg?: Partial<ElementRect>, getId?: () => string): ElementRect {
  return {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    ...createElementBase(arg, getId),
    name,
  }
}

function translate(target: ElementRect, vec: IVec2): ElementRect {
  return {
    ...target,
    x: target.x + vec.x,
    y: target.y + vec.y,
  }
}

function getAnchor(target: ElementRect): IVec2 {
  return {
    x: target.x + target.width / 2,
    y: target.y + target.height / 2,
  }
}

const moduleImpl: ElementModule<ElementRect> = {
  name,
  create,
  translate,
  getAnchor,
}

export default moduleImpl
