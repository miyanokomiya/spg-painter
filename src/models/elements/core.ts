import type { IVec2 } from 'okageo'

export interface ElementBase {
  id: string
  name: string
  fill: string
  stroke: string
}

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

const elementModules: { [name: string]: ElementModule<ElementBase> } = {}

export function getElementModule(name: string): ElementModule<ElementBase> {
  if (!(name in elementModules)) {
    throw new Error(`unknown element name: ${name}`)
  }
  return elementModules[name]
}

export function registModule(mod: ElementModule<ElementBase>): void {
  elementModules[mod.name] = mod
}
