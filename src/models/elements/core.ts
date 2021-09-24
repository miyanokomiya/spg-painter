import type { IVec2 } from 'okageo'
import { useModuleMap } from '../../composables/moduleMap'
import type { ElementBase } from '../entities'

export interface ElementModule<T extends ElementBase> {
  name: string
  create(arg?: Partial<T>, getId?: () => string): T
  translate(target: T, vec: IVec2): T
  getAnchor(target: T): IVec2
}

export function createElementBase(
  arg: Partial<ElementBase> = {},
  getId?: () => string
): ElementBase {
  const id = getId?.() ?? arg.id ?? ''
  return {
    name: '',
    fill: '',
    stroke: 'rgb(0,0,0)',
    ...arg,
    id,
  }
}

export const elementModuleMap = useModuleMap<ElementModule<ElementBase>>()
