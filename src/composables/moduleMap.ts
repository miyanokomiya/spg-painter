export function useModuleMap<T>(): {
  getModule(name: string): T
  registModule(name: string, mod: T): void
} {
  const map: { [name: string]: T } = {}

  function getModule(name: string): T {
    if (!(name in map)) {
      throw new Error(`unknown module name: ${name}`)
    }
    return map[name]
  }

  function registModule(name: string, mod: T): void {
    map[name] = mod
  }

  return {
    getModule,
    registModule,
  }
}
