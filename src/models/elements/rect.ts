import type { IVec2 } from 'okageo'
import type { ElementBase } from '../entities'
import type { ElementBoundingBox, ElementModule } from './core'
import { createElementBase } from './core'

const name = 'rect'

export interface ElementRect extends ElementBase {
  x: number
  y: number
  width: number
  height: number
  radian: number
}

function create(arg?: Partial<ElementRect>, getId?: () => string): ElementRect {
  return {
    x: 0,
    y: 0,
    width: 150,
    height: 100,
    radian: 0,
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

function getBoundBox(target: ElementRect): ElementBoundingBox {
  return {
    x: target.x,
    y: target.y,
    width: target.width,
    height: target.height,
    radian: target.radian,
  }
}

const moduleImpl: ElementModule<ElementRect> = {
  name,
  create,
  translate,
  getAnchor,
  getBoundBox,
}

export default moduleImpl
